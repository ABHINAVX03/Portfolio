import nodemailer from "nodemailer";

const EMAIL_USER = (process.env.EMAIL_USER || process.env.GMAIL_USER || "").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || process.env.GMAIL_PASSWORD || "").replace(/\s/g, "");
const EMAIL_TO = (process.env.EMAIL_TO || EMAIL_USER).trim();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

const rateLimitStore = globalThis.__portfolioEmailRateLimit || new Map();
globalThis.__portfolioEmailRateLimit = rateLimitStore;

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanText(value = "", maxLength) {
  return String(value).trim().slice(0, maxLength);
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const existing = rateLimitStore.get(ip) || [];
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recent);
    return true;
  }

  rateLimitStore.set(ip, [...recent, now]);
  return false;
}

function getTransporter() {
  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    console.error("Missing EMAIL_USER, EMAIL_PASS, or EMAIL_TO environment variables.");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    greetingTimeout: 30000,
    connectionTimeout: 30000,
  });
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    if (isRateLimited(clientIp)) {
      return Response.json(
        { error: "Too many messages. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    if (body.website) {
      return Response.json({ success: true }, { status: 200 });
    }

    const user_name = cleanText(body.user_name, MAX_NAME_LENGTH);
    const user_email = cleanText(body.user_email, MAX_EMAIL_LENGTH).toLowerCase();
    const message = cleanText(body.message, MAX_MESSAGE_LENGTH);

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

    const safeName = escapeHtml(user_name);
    const safeEmail = escapeHtml(user_email);
    const safeMessage = escapeHtml(message);

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
      from: `"Abhinav Gupta Portfolio" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: user_email,
      subject: `New portfolio inquiry from ${user_name}`,
      text: [
        "New Portfolio Inquiry",
        "",
        `Name: ${user_name}`,
        `Email: ${user_email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f8ef7; padding-bottom: 10px;">
            New Portfolio Inquiry
          </h2>
          <div style="margin: 20px 0; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            <p><strong style="color: #333;">Name:</strong> <span style="color: #666;">${safeName}</span></p>
            <p><strong style="color: #333;">Email:</strong> <span style="color: #666;"><a href="mailto:${safeEmail}">${safeEmail}</a></span></p>
            <p><strong style="color: #333;">Message:</strong></p>
            <p style="color: #666; white-space: pre-wrap; background-color: #fff; padding: 10px; border-left: 4px solid #4f8ef7;">
              ${safeMessage}
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
      const errorCode =
        error?.code === "EAUTH" || error?.responseCode === 535
          ? "EMAIL_AUTH_FAILED"
          : error?.code === "ETIMEDOUT" || error?.code === "ECONNECTION"
            ? "EMAIL_CONNECTION_FAILED"
            : "EMAIL_SEND_FAILED";

      return Response.json(
        {
          success: false,
          error: "Failed to send email. Please try again later.",
          code: errorCode,
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
      { error: "Failed to process email" },
      { status: 500 }
    );
  }
}
