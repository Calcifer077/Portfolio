import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({ html }: { html: string }) {
  try {
    const isVerified = await transporter.verify();

    if (!isVerified) {
      throw new Error("SMTP Server verification failed");
    }
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error,
    );
    throw new Error("Failed to send mail");
  }
  const info = await transporter.sendMail({
    from: SMTP_SERVER_USERNAME,
    to: SITE_MAIL_RECIEVER,
    subject: "Mail from portfolio contact form",
    html: html,
  });
  console.log("Message Sent", info.messageId);
  console.log("Mail sent to", SITE_MAIL_RECIEVER);
  return info;
}
