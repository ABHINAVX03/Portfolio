import nodemailer from "nodemailer";

// Create transporter outside the function for connection pooling
const transporter = nodemailer.createTransport({
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

    // Email to admin
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: "guptaabhinav697@gmail.com",
      subject: `New Contact Form Submission from ${user_name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send admin email in background (don't await)
    transporter.sendMail(adminMailOptions).catch((error) => {
      console.error("Admin email error:", error.message);
    });

    // Respond immediately to user
    return Response.json(
      { success: true, message: "Email received successfully" },
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
