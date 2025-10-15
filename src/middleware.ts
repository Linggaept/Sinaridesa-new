import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const role = request.cookies.get("role");
  const { pathname } = request.nextUrl;

  // Allow access to the root path without authentication
  if (
    pathname === "/" ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/courses")
  ) {
    return NextResponse.next();
  }

  // If the user is authenticated, prevent access to signin and signup
  if (token && (pathname === "/signin" || pathname === "/signup")) {
    if (role?.value === "ADMIN") {
      return NextResponse.redirect(
        new URL("/admin/dashboard/overview", request.url)
      );
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect all routes under /admin
  if (pathname.startsWith("/admin")) {
    // If there's no token or the role is not ADMIN, redirect to the main sign-in page
    if (!token || role?.value !== "ADMIN") {
      // Allow access to the admin sign-in page itself to avoid a redirect loop
      if (pathname === "/admin/signin") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    // If the user is an authenticated ADMIN and tries to access the admin sign-in page, redirect them to the dashboard
    if (token && role?.value === "ADMIN" && pathname === "/admin/signin") {
      return NextResponse.redirect(
        new URL("/admin/dashboard/overview", request.url)
      );
    }
  }

  // Redirect to signin if not authenticated and trying to access a protected route
  if (!token && pathname !== "/signin" && pathname !== "/signup") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|img/|favicon.ico).*)"],
};
