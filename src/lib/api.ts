import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const createAxiosInstance = (withInterceptors: boolean = true) => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
    withCredentials: true,
  });

  if (withInterceptors) {
    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = Cookies.get("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    let isRefreshing = false;
    let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

    const processQueue = (error: any, token: string | null = null) => {
      failedQueue.forEach(prom => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });

      failedQueue = [];
    };

    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise(function(resolve, reject) {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
              }
              return instance(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          const refreshToken = Cookies.get("refreshToken");
          if (!refreshToken) {
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            Cookies.remove("id");
            Cookies.remove("email");
            Cookies.remove("name");
            if (typeof window !== 'undefined') {
              window.location.href = '/admin/signin';
            }
            return Promise.reject(error);
          }

          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
              { refreshToken },
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                },
                withCredentials: true,
              }
            );

            const { accessToken } = response.data.data;
            Cookies.set("token", accessToken, { expires: 0.125 });
            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            processQueue(null, accessToken);
            return instance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            Cookies.remove("id");
            Cookies.remove("email");
            Cookies.remove("name");
            if (typeof window !== 'undefined') {
              window.location.href = '/admin/signin';
            }
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  return instance;
};

const AxiosInstance = createAxiosInstance(true);
export const AxiosPublicInstance = createAxiosInstance(false);

export default AxiosInstance;
