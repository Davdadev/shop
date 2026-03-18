import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE = "admin_session";
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow the login page through
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret || secret.length < 32) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    await jwtVerify(token, new TextEncoder().encode(secret), {
      subject: "admin",
    });
    return NextResponse.next();
  } catch {
    // Invalid or expired token — clear cookie and redirect
    const response = NextResponse.redirect(new URL("/admin/login", req.url));
    response.cookies.delete(ADMIN_COOKIE);
    return response;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
