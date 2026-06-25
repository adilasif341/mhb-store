import { NextResponse, type NextRequest } from "next/server";

const adminPath = "/mhbgher22";
const localUser = "mhb";
const localPassword = "mhbgher22";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(adminPath)) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const expectedUser =
    process.env.MERCHANT_ADMIN_USER ||
    (process.env.NODE_ENV === "development" ? localUser : "");
  const expectedPassword =
    process.env.MERCHANT_ADMIN_PASSWORD ||
    (process.env.NODE_ENV === "development" ? localPassword : "");

  if (expectedUser && expectedPassword && isAuthorized(authHeader, expectedUser, expectedPassword)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="MHB Merchant Backend"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/mhbgher22/:path*"],
};

function isAuthorized(authHeader: string | null, user: string, password: string) {
  if (!authHeader?.startsWith("Basic ")) return false;

  try {
    const encoded = authHeader.slice("Basic ".length);
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) return false;

    const providedUser = decoded.slice(0, separatorIndex);
    const providedPassword = decoded.slice(separatorIndex + 1);

    return providedUser === user && providedPassword === password;
  } catch {
    return false;
  }
}
