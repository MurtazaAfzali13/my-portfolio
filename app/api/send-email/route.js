import nodemailer from "nodemailer";

// 🧩 در حافظه سرور (برای Rate Limit ساده)
const rateLimitMap = new Map();

// 🧹 پاکسازی داده‌ها
function sanitizeInput(input, maxLength = 500) {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // حذف تگ‌های HTML
    .replace(/[\r\n]{2,}/g, "\n") // حذف خطوط اضافی
    .trim()
    .substring(0, maxLength);
}

// 🧠 تابع Rate Limiting ساده (هر IP فقط هر 60 ثانیه یکبار)
function isRateLimited(ip, limitMs = 60_000) {
  const lastTime = rateLimitMap.get(ip);
  const now = Date.now();

  if (lastTime && now - lastTime < limitMs) {
    return true; // هنوز 60 ثانیه نگذشته
  }

  rateLimitMap.set(ip, now);
  return false;
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // 🚫 جلوگیری از اسپم
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const data = await req.json();
    const name = sanitizeInput(data.name, 100);
    const email = sanitizeInput(data.email, 100);
    const subject = sanitizeInput(data.subject, 150);
    const message = sanitizeInput(data.message, 2000);

    // ✅ بررسی مقدارهای ضروری
    if (!name || !email || !subject || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    // ✅ بررسی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ✅ جلوگیری از کلمات یا کد خطرناک
    const bannedWords = ["http://", "https://", "<script", "onerror", "onload", "eval("];
    if (bannedWords.some((w) => message.toLowerCase().includes(w))) {
      return Response.json({ error: "Malicious content detected." }, { status: 400 });
    }

    // ✉️ تنظیم ارسال ایمیل
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // جلوگیری از spoofing
      replyTo: email,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `[Portfolio Contact] ${subject}`,
      text: `
📩 New message from your portfolio contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }
}
