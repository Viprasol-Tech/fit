import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // For hardcoded auth, we'll skip middleware authentication
  // Authentication is handled client-side via localStorage
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  // Allow all requests through - auth is checked client-side
  // This is acceptable for personal use with hardcoded credentials
  if (isAuthPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
