import { NextResponse } from "next/server";

// Next.js 15 NextResponse wrapper
export const createResponse = (body: any, init?: ResponseInit) => {
    return NextResponse.json(body, init);
};
