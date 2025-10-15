import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useCredentials() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userName = Cookies.get("name");
    const userEmail = Cookies.get("email");
    const userToken = Cookies.get("token");
    if (userName && userEmail && userToken) {
      setName(userName);
      setEmail(userEmail);
      setToken(userToken);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("id");
    Cookies.remove("name");
    Cookies.remove("email");
    router.push("/signin");
  };

  return { name, email, handleLogout, token };
}

