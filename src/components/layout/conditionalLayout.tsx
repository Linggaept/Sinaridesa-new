"use client";

import Navbar from "@/app/components/partials/Navbar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const ConditionalLayout = ({ children, token }: { children: ReactNode, token?: string }) => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  if (pathname.startsWith("/chat")) return <>{children}</>;
  if (pathname.startsWith("/signin")) return <>{children}</>;
  if (pathname.startsWith("/signup")) return <>{children}</>;
  return (
    <>
      <Navbar token={token} />
      {children}
    </>
  );
};

export default ConditionalLayout;