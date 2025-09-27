import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Donation from "@/lib/donations/donation";

export async function GET() {
    await connectToDatabase();
    try {
        const donations = await Donation.find().sort({ createdAt: -1 });
        return NextResponse.json(donations.map(d => ({
            id: d._id,
            donor: d.name,
            email: d.email,
            amount: d.amount,
            type: d.type,
            purpose: d.purpose,
            status: d.status || "Pending",
            date: d.createdAt,
        })));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 });
    }
}
