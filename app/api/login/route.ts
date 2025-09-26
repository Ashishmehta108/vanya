import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/admin";
import { compareKey, signJwt } from "@/lib/auth";

export async function POST(req: Request) {
    await connectToDatabase();
    const { name, secretKey } = await req.json();

    const user = await User.findOne({ name });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const valid = await compareKey(secretKey, user.secretKey);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = signJwt({ id: user._id, name: user.name });

    return NextResponse.json({ user: { id: user._id, name: user.name }, token });
}
