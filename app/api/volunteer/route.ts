import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, areas, availability } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send confirmation email
    const emailResponse = await fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "volunteer-application",
        data: { firstName, lastName, email, areas, availability },
      }),
    })

    if (!emailResponse.ok) {
      throw new Error("Failed to send confirmation email")
    }

    // In a real application, you would save the volunteer application to database
    console.log("[v0] Volunteer application submitted:", { firstName, lastName, email, areas })

    return NextResponse.json({
      success: true,
      message: "Thank you for your volunteer application! We will contact you soon.",
    })
  } catch (error) {
    console.error("[v0] Volunteer application error:", error)
    return NextResponse.json(
      {
        error: "Failed to submit application. Please try again.",
      },
      { status: 500 },
    )
  }
}
