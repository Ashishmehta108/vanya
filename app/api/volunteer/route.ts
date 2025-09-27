import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import { Volunteer } from "@/lib/volunteers";

export async function GET() {
  await connectToDatabase();
  const volunteers = await Volunteer.find().sort({ createdAt: -1 });
  return NextResponse.json({ volunteers });
}

export async function POST(req: Request) {
  await connectToDatabase()
  const data = await req.json();
  const volunteer = await Volunteer.create(data);
  return NextResponse.json({ message: "Volunteer registered successfully!", volunteer });
}
