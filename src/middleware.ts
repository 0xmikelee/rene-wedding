import { NextResponse, type NextRequest } from "next/server";
import { SITE_ACCESS_COOKIE, isValidSession, safeNextPath } from "@/lib/site-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/unlock" || pathname.startsWith("/unlock/")) {
    return NextResponse.next();
  }

  const password = process.env.SITE_PASSWORD?.trim() ?? "";
  const session = request.cookies.get(SITE_ACCESS_COOKIE)?.value;
  if (password && (await isValidSession(session, password))) {
    return NextResponse.next();
  }

  const unlockUrl = request.nextUrl.clone();
  unlockUrl.pathname = "/unlock";
  unlockUrl.search = "";
  const nextPath = safeNextPath(`${pathname}${request.nextUrl.search}`);
  if (nextPath !== "/") {
    unlockUrl.searchParams.set("next", nextPath);
  }
  return NextResponse.redirect(unlockUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images/|.*\\..*).*)"],
};
