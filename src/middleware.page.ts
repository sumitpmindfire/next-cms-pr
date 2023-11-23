import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.url.includes("/auth") && request.cookies.has("user")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!request.url.includes("/auth") && !request.cookies.has("user")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
