import { NextResponse } from "next/server";

// --- Admin credentials (from your environment variables) ---
const ADMIN_USER = process.env.ADMIN_USERNAME || "";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";

// --- Define which routes to protect ---
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

// --- Middleware function ---
export function middleware(req: Request) {
  if (!ADMIN_USER || !ADMIN_PASS) {
    return NextResponse.json(
      { error: "Admin credentials not configured" },
      { status: 500 }
    );
  }

  const auth = req.headers.get("authorization") || "";

  // If no credentials sent, ask the browser to show the login popup
  if (!auth.startsWith("Basic ")) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="SONCAR Admin"' },
    });
  }

  // Decode the Base64 username:password
  const [, b64] = auth.split(" ");
  const [user, pass] = Buffer.from(b64, "base64").toString().split(":");

  // If wrong credentials
  if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // ✅ Success — allow access
  return NextResponse.next();
}
