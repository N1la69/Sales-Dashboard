import { NextRequest } from "next/server";

export const verifyUser = async (request: NextRequest) => {
    const url = new URL("/api/user/auth/verify-user", request.nextUrl.origin);

    try {
        const res = await fetch(url.toString(), {
            method: "GET",
            headers: {
                cookie: request.headers.get("cookie") || "", // pass cookies to backend
            },
        });

        const data = await res.json();
        return { status: res.status, message: data.message || data.error, user: data.user };
    } catch (error: any) {
        console.error("verifyUser fetch failed:", error?.message || error);
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};
