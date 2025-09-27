import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/lib/donations/donation";

export async function GET(req: Request) {
    await connectToDatabase();

    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const limit = parseInt(url.searchParams.get("limit") || "5");
        const skip = (page - 1) * limit;

        const total = await Donation.countDocuments();
        const donations = await Donation.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(total / limit);

        const formatted = donations.map(d => ({
            id: d._id,
            donor: d.name,
            email: d.email,
            amount: d.amount,
            type: d.type,
            purpose: d.purpose,
            status: d.status || "Pending",
            date: d.createdAt,
        }));

        return NextResponse.json({ donations: formatted, pagination: { total, page, limit, totalPages } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
    }
}
