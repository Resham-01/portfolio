import nodemailer from "nodemailer";
import { getEnv } from "./config.js";

/**
 * Creates and returns a Nodemailer transporter based on environment variables.
 */
function createTransporter() {
	const host = getEnv("SMTP_HOST");
	const port = getEnv("SMTP_PORT");
	const user = getEnv("EMAIL_USER") || getEnv("SMTP_USER");
	const pass = getEnv("EMAIL_PASS") || getEnv("SMTP_PASS");

	if (!user || !pass) {
		return null;
	}

	// If custom SMTP host is specified
	if (host) {
		return nodemailer.createTransport({
			host,
			port: port ? Number(port) : 587,
			secure: port === "465",
			auth: { user, pass }
		});
	}

	// Default to Gmail service
	return nodemailer.createTransport({
		service: "gmail",
		auth: { user, pass },
		tls: {
			rejectUnauthorized: false
		}
	});
}

/**
 * Sends direct message notification to Resham's email.
 * @param {Object} data - { name, email, subject, message }
 */
export async function sendContactEmail({ name, email, subject, message }) {
	const receiverEmail = getEnv("RECEIVER_EMAIL", "reshamkumar4533@gmail.com");
	const transporter = createTransporter();

	if (!transporter) {
		console.warn(
			"[Mailer] EMAIL_USER or EMAIL_PASS is not configured in server/.env. " +
			"To enable real email delivery to " + receiverEmail + ", set EMAIL_USER and EMAIL_PASS (Google App Password) in server/.env."
		);
		return {
			sent: false,
			reason: "EMAIL_USER or EMAIL_PASS (Google App Password) is not configured in server/.env"
		};
	}

	const mailSubject = subject && subject.trim()
		? `[Portfolio Inquiry] ${subject} - from ${name}`
		: `[Portfolio Direct Message] New message from ${name}`;

	const htmlBody = `
		<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; color: #1e293b;">
			<div style="background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%); padding: 20px 24px; border-radius: 8px; margin-bottom: 24px; color: #ffffff;">
				<h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">🚀 New Direct Message Received!</h2>
				<p style="margin: 0; font-size: 13px; opacity: 0.9;">Someone reached out to you through your portfolio contact form.</p>
			</div>

			<div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 20px;">
				<table style="width: 100%; border-collapse: collapse;">
					<tr>
						<td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 120px; font-weight: 600;">Sender Name:</td>
						<td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(name)}</td>
					</tr>
					<tr>
						<td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Sender Email:</td>
						<td style="padding: 8px 0; color: #4f46e5; font-size: 14px;">
							<a href="mailto:${escapeHtml(email)}" style="color: #4f46e5; text-decoration: underline;">${escapeHtml(email)}</a>
						</td>
					</tr>
					${
						subject
							? `<tr>
								<td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Subject / Topic:</td>
								<td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(subject)}</td>
							</tr>`
							: ""
					}
					<tr>
						<td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Received Time:</td>
						<td style="padding: 8px 0; color: #64748b; font-size: 13px;">${new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })} (NPT)</td>
					</tr>
				</table>
			</div>

			<div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 24px;">
				<h3 style="margin: 0 0 12px 0; font-size: 14px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h3>
				<div style="background: #f1f5f9; padding: 16px; border-radius: 6px; border-left: 4px solid #4f46e5; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
			</div>

			<div style="text-align: center; padding-top: 8px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;">
				<p style="margin: 0;">💡 Tip: You can reply directly to this email to reply back to <strong>${escapeHtml(name)}</strong>.</p>
				<p style="margin: 4px 0 0 0;">Portfolio notification for Resham Kumar Thapa &bull; <a href="mailto:${receiverEmail}" style="color: #64748b;">${receiverEmail}</a></p>
			</div>
		</div>
	`;

	const textBody = `
New Direct Message from Portfolio:
Name: ${name}
Email: ${email}
Subject: ${subject || "N/A"}
Time: ${new Date().toISOString()}

Message:
${message}
	`.trim();

	const info = await transporter.sendMail({
		from: `"${name} (Portfolio)" <${getEnv("EMAIL_USER") || receiverEmail}>`,
		to: receiverEmail,
		replyTo: email,
		subject: mailSubject,
		text: textBody,
		html: htmlBody
	});

	return {
		sent: true,
		messageId: info.messageId
	};
}

function escapeHtml(str) {
	if (!str) return "";
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
