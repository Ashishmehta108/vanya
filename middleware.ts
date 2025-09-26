import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth";

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api/secure")) {
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const decoded = verifyJwt(token);
        if (!decoded) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-user", JSON.stringify(decoded));

        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/api/secure/:path*"], // only secure these routes
};
