import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import nodemailer from "nodemailer";

export const createContactRouter = ({ createTransport = nodemailer.createTransport, env = process.env } = {}) => {
  const router = Router();
  let transporter;
  router.post("/", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message: "Too many enquiries. Please try again later." },
  }), async (req, res) => {
    const fields = {};
    const limits = { name: 100, company: 200, email: 254, phone: 30, service: 200, message: 4000 };
    for (const [key, max] of Object.entries(limits)) {
      const value = req.body?.[key] ?? "";
      if (typeof value !== "string" || value.length > max) {
        return res.status(400).json({ message: `Invalid ${key}. Maximum length is ${max} characters.` });
      }
      fields[key] = value.trim();
    }
    if (!fields.name || !fields.message || !/^[^\s@<> ,;]+@[^\s@<> ,;]+\.[^\s@<> ,;]+$/.test(fields.email)
      || /[\r\n]/.test(fields.name)) {
      return res.status(400).json({ message: "Please provide a valid name, email address, and project description." });
    }

    const port = Number(env.SMTP_PORT || 587);
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS || !Number.isInteger(port) || port < 1 || port > 65535) {
      return res.status(503).json({ message: "Email sending is not configured. Please contact info@smartfixautomation.com." });
    }
    try {
      transporter ??= createTransport({
        host: env.SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: port !== 465,
        auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      const result = await transporter.sendMail({
        from: env.SMTP_FROM || env.SMTP_USER,
        to: env.CONTACT_EMAIL || "info@smartfixautomation.com",
        replyTo: { name: fields.name, address: fields.email },
        subject: `New website enquiry from ${fields.name}`,
        text: Object.entries(fields).map(([key, value]) => `${key}: ${value || "Not provided"}`).join("\n\n"),
      });
      if (!result.accepted?.length) throw new Error("Recipient not accepted");
      return res.json({ success: true, message: "Your enquiry has been sent." });
    } catch (error) {
      console.error("Contact email failed:", error.code || "SEND_FAILED");
      return res.status(502).json({ message: "Could not send your enquiry. Please try again or contact info@smartfixautomation.com." });
    }
  });
  return router;
};

export default createContactRouter();
