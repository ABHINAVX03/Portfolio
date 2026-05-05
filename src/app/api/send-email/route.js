import nodemailer from "nodemailer";

// Create transporter with error handling
let transporter;

function getTransporter() {
  if (!transporter) {
    // Check if Gmail credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.warn(
        "Warning: Gmail credentials not configured. Email functionality disabled."
      );
      return null;
    }

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
      pool: true,
      maxConnections: 1,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 3,
    });

    // Verify connection
    transporter.verify((error, success) => {
      if (error) {
        console.error("Gmail transporter verification failed:", error.message);
      } else if (success) {
        console.log("Gmail transporter ready");
      }
    });
  }
  return transporter;
}

export async function POST(request) {
  try {
    const { user_name, user_email, message } = await request.json();

    // Validate input
    if (!user_name || !user_email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const transporter = getTransporter();

    if (!transporter) {
      console.warn("Email service unavailable, but form data received:", {
        user_name,
        user_email,
      });
      return Response.json(
        {
          success: false,
          warning:
            "Email service not configured, but message was received. Please configure Gmail credentials in Vercel.",
        },
        { status: 503 }
      );
    }

    // Email to admin with detailed HTML
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: "guptaabhinav697@gmail.com",
      replyTo: user_email,
      subject: `New Contact Form Submission from ${user_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f8ef7; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            <p><strong style="color: #333;">Name:</strong> <span style="color: #666;">${user_name}</span></p>
            <p><strong style="color: #333;">Email:</strong> <span style="color: #666;"><a href="mailto:${user_email}">${user_email}</a></span></p>
            <p><strong style="color: #333;">Message:</strong></p>
            <p style="color: #666; white-space: pre-wrap; background-color: #fff; padding: 10px; border-left: 4px solid #4f8ef7;">
              ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </p>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
    };

    // Send admin email in background (don't await)
    transporter.sendMail(adminMailOptions).catch((error) => {
      console.error("Admin email error:", error.message);
      // Don't fail the response if email fails
    });

    // Respond immediately to user
    return Response.json(
      {
        success: true,
        message:
          "Thank you! Your message has been received. I'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email processing error:", error);
    return Response.json(
      { error: "Failed to process email", details: error.message },
      { status: 500 }
    );
  }
}
