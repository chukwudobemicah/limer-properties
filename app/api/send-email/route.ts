import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, message, fromEmail, fromName } = body;

    // Validate required fields
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, message" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Limer Properties <onboarding@resend.dev>", // You'll need to verify your domain with Resend
      to: [to],
      replyTo: fromEmail || undefined,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Inquiry from Limer Properties Website
          </h2>
          ${fromName ? `<p><strong>From:</strong> ${fromName}</p>` : ""}
          ${fromEmail ? `<p><strong>Email:</strong> ${fromEmail}</p>` : ""}
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            ${message
              .split("\n")
              .map((line: string) => `<p style="margin: 5px 0;">${line}</p>`)
              .join("")}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This email was sent from the Limer Properties website contact form.
          </p>
        </div>
      `,
      text: message,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
