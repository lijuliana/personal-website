import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { personalInfo } from "@/data/personal";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the site administrator." },
        { status: 500 }
      );
    }
    
    console.log("Resend API key is configured (length:", process.env.RESEND_API_KEY?.length || 0, ")");

    // Send email using Resend
    try {
      // Resend test mode only allows sending to the account owner's email
      // To send to other addresses, verify a domain in Resend and update the from/to addresses
      const recipientEmail = process.env.RESEND_TEST_EMAIL || "25julianal@gmail.com";
      
      const result = await resend.emails.send({
        from: "onboarding@resend.dev", // You'll need to verify a domain in Resend to use a custom email
        to: recipientEmail,
        subject: `Contact Form: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
        replyTo: email,
      });
      
      console.log("Resend email sent successfully:", result);
    } catch (emailError: any) {
      console.error("Resend email error:", emailError);
      // Provide more detailed error message
      const errorMessage = emailError?.message || "Unknown error";
      const errorDetails = emailError?.response?.body || emailError;
      console.error("Resend error details:", JSON.stringify(errorDetails, null, 2));
      
      return NextResponse.json(
        { 
          error: `Failed to send email: ${errorMessage}. Please check your Resend configuration.` 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

