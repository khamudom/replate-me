/**
 * Middleware for handling dynamic recipe routes in static export.
 * Validates recipe IDs to ensure they match the UUID format.
 * Redirects to 404 page for invalid recipe IDs.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware handles dynamic routes in static export
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Check if the path is a dynamic recipe route with an invalid ID format
  if (pathname.startsWith("/recipes/") && pathname.length > 9) {
    const id = pathname.slice(9).replace(/\/$/, "");
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id)) {
      // Redirect to 404 page for invalid recipe IDs
      url.pathname = "/not-found";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

// Only run middleware on recipe detail pages
export const config = {
  matcher: "/recipes/:id*",
};
