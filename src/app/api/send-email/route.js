import nodemailer from "nodemailer";

// ✅ Credentials loaded from environment variables (never hardcode these)
const EMAIL_USER = process.env.EMAIL_USER || process.env.GMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS || process.env.GMAIL_PASSWORD;

function getTransporter() {
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    greetingTimeout: 30000,
    connectionTimeout: 30000,
  });
}

export async function POST(request) {
  try {
    const { user_name, user_email, message } = await request.json();

    if (!user_name || !user_email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return Response.json({ error: "Invalid email format" }, { status: 400 });
    }

    const transporter = getTransporter();

    if (!transporter) {
      return Response.json(
        {
          success: false,
          warning: "Email service is unavailable. Please check environment variables.",
        },
        { status: 503 }
      );
    }

    const adminMailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER, // Send to yourself
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

    try {
      await transporter.sendMail(adminMailOptions);
    } catch (error) {
      console.error("Email send error:", error);
      return Response.json(
        {
          success: false,
          error: "Failed to send email. Please try again later.",
        },
        { status: 502 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Thank you! Your message has been received. I'll get back to you soon.",
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
