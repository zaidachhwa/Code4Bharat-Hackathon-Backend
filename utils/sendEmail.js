import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // your gmail
        pass: process.env.EMAIL_PASS,  // app password
      },
    });

    await transporter.sendMail({
      from: `"InnovateX Team" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("📧 Email sent successfully!");
    return true;
  } catch (error) {
    console.log("❌ Email send error:", error);
    return false;
  }
};

export default sendEmail;
