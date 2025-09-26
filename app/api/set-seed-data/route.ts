import { NextRequest, NextResponse } from "next/server";
import { HomePageContentModel } from "@/lib/home/home";
import { connectToDatabase } from "@/lib/mongodb";
import { HomePageContentPlain, PartialHomePageContent } from "@/lib/home/types";

import { seedData } from "@/lib/home/seed";
import { logger, runMiddleware } from "@/lib/morgan";

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    await runMiddleware(req, res, logger);

    await connectToDatabase();
    const body: PartialHomePageContent | HomePageContentPlain =
      await req.json();

    const updated = await HomePageContentModel.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true }
    ).lean();

    return NextResponse.json(
      {
        message: "Homepage content updated successfully",
        updated,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error updating homepage content:", error);
    return NextResponse.json(
      {
        message: "Failed to update homepage content",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await runMiddleware(req, res, logger);

    await connectToDatabase();
    const updated = await HomePageContentModel.findOne().lean();

    return NextResponse.json(
      {
        message: "Homepage content fetched successfully",
        updated,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch homepage content",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
