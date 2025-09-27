import { aboutModel } from "@/lib/about/about";
import { aboutSeedData } from "@/lib/about/seed";
import { verifyToken } from "@/lib/jwt/jwt";
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

export async function PATCH(req: Request) {
  const token = req.headers.get("x-user-token");
  const decoded = await verifyToken(token!);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connectToDatabase();
  const body = await req.json();
  console.log(body.storySection.storyImage);
  const aboutData = await aboutModel.updateOne(body);
  return new Response(JSON.stringify(aboutData));
}
