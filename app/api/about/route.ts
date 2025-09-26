import { aboutModel } from "@/lib/about/about";
import { aboutSeedData } from "@/lib/about/seed";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const aboutData = await aboutModel.findOne().lean();
  return NextResponse.json({
    message: "About data fetched successfully",
    aboutData,
  });
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const aboutData = await aboutModel.create(aboutSeedData);
  return new Response(JSON.stringify(aboutData));
}

export async function PATCH(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const aboutData = await aboutModel.updateOne(body);
  return new Response(JSON.stringify(aboutData));
}
