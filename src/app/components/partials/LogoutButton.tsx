"use client";

import { logoutService } from "@/app/services/authService";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    logoutService();
    router.push("/signin");
  };

  return (
    <button
      onClick={handleLogout}
      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:pointer-events-none disabled:opacity-50"
    >
      Logout
    </button>
  );
}
