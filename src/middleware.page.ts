import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.url.includes("/auth") && request.cookies.has("user")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!request.cookies.has("user") && !request.url.includes("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
