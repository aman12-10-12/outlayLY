const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const getTransporter = () => {
  const { SUPPORT_EMAIL, SUPPORT_EMAIL_APP_PASSWORD } = process.env;

  if (!SUPPORT_EMAIL || !SUPPORT_EMAIL_APP_PASSWORD) {
    throw new Error("Support email is not configured");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SUPPORT_EMAIL,
      pass: SUPPORT_EMAIL_APP_PASSWORD,
    },
  });
};

exports.submitSupportReport = async (req, res) => {
  const { name, email, issue } = req.body;

  if (!name?.trim() || !email?.trim() || !issue?.trim()) {
    return res.status(400).json({ message: "Name, email, and issue are required" });
  }

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `OutlayLY Support <${process.env.SUPPORT_EMAIL}>`,
      to: `${process.env.SUPPORT_EMAIL}`,
      replyTo: email.trim(),
      subject: `OutlayLY support report from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nIssue:\n${issue.trim()}`,
    });

    return res.status(201).json({ message: "Support report sent successfully" });
  } catch (error) {
    console.error("Support report error:", error.message);
    return res.status(500).json({ message: "Unable to send support report" });
  }
};
