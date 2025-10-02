import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "mysecretkey"
);

// Helper to verify JWT token
async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    console.warn("JWT verification failed:", error.message);
    return null;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // USER ROUTES PROTECTION
  if (pathname.startsWith("/user")) {
    const token = request.cookies.get("token")?.value;
    if (!token || !(await verifyJWT(token))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // ADMIN ROUTES PROTECTION
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admintoken")?.value;
    if (!token || !(await verifyJWT(token))) {
      return NextResponse.redirect(new URL("/adminlogin", request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to these routes only
export const config = {
  matcher: ["/user/:path*", "/admin/:path*"],
};
