import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

   
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER, 
      subject: `${subject} - از ${name}`,
      text: `
نام: ${name}
ایمیل: ${email}
موضوع: ${subject}
پیام:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
