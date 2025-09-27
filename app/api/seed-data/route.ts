import { MakeSeed } from "@/scripts/seed";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await MakeSeed()
    return NextResponse.json({ message: "Seed data created successfully" })
}