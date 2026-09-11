import { Router } from "express";
import mongoose from "mongoose";
import { sendContactEmail } from "../utils/mailer.js";

const router = Router();

const ContactMessageSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		subject: { type: String, default: "" },
		message: { type: String, required: true }
	},
	{ timestamps: true }
);

const ContactMessage =
	mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);

router.post("/", async (req, res) => {
	const { name, email, subject, message } = req.body || {};
	if (!name || !email || !message) {
		return res.status(400).json({ message: "Name, email, and message are required" });
	}

	try {
		let savedId = null;
		// 1. Save to Database if connected
		if (mongoose.connection.readyState === 1) {
			const saved = await ContactMessage.create({
				name: name.trim(),
				email: email.trim(),
				subject: (subject || "").trim(),
				message: message.trim()
			});
			savedId = saved._id;
		}

		// 2. Dispatch email to Resham's inbox
		let emailResult = { sent: false };
		try {
			emailResult = await sendContactEmail({
				name: name.trim(),
				email: email.trim(),
				subject: (subject || "").trim(),
				message: message.trim()
			});
		} catch (mailErr) {
			console.error("[Contact API] Error delivering email:", mailErr);
			emailResult = { sent: false, reason: mailErr.message };
		}

		const isSent = emailResult.sent === true;

		return res.status(200).json({
			success: true,
			id: savedId,
			emailSent: isSent,
			reason: emailResult.reason || null,
			message: isSent
				? "Thank you! Your message has been sent directly to Resham's email (resham4533@gmail.com)."
				: "Thank you! Your message has been recorded. (Note: Email dispatch pending configuration)."
		});
	} catch (err) {
		console.error("[Contact API] Error processing message:", err);
		return res.status(500).json({ message: "Failed to process contact message", error: err.message });
	}
});

export default router;
