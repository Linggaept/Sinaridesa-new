import AxiosInstance from "@/lib/api";
import Cookies from "js-cookie";

export async function loginService(email: string, password: string) {
  try {
    const response = await AxiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { accessToken, user } = response.data.data;

    Cookies.set("token", accessToken, { expires: 0.125 });
    Cookies.set("refreshToken", user.refreshToken, { expires: 7 });
    Cookies.set("id", user.id, { expires: 1 });
    Cookies.set("email", user.email, { expires: 1 });
    Cookies.set("name", user.name, { expires: 1 });
    Cookies.set("role", user.role, { expires: 1 });

    return response.data.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function registerService(
  email: string,
  password: string,
  name: string
) {
  try {
    const response = await AxiosInstance.post("/auth/register", {
      name,
      email,
      password,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export function logoutService() {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  Cookies.remove("id");
  Cookies.remove("email");
  Cookies.remove("name");
  Cookies.remove("role");

  if (typeof window !== "undefined") {
    window.location.href = "/signin";
  }
}
