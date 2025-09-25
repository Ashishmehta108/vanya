import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send email
    const emailResponse = await fetch(`${request.nextUrl.origin}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "contact-form",
        data: { firstName, lastName, email, phone, subject, message },
      }),
    })

    if (!emailResponse.ok) {
      throw new Error("Failed to send email")
    }

    // In a real application, you might also save to database here
    console.log("[v0] Contact form submitted:", { firstName, lastName, email, subject })

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We will get back to you soon!",
    })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json(
      {
        error: "Failed to submit contact form. Please try again.",
      },
      { status: 500 },
    )
  }
}
