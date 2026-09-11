import { useState } from "react";
import axios from "axios";
import {
	Mail,
	MapPin,
	Send,
	CheckCircle2,
	AlertCircle,
	Sparkles,
	MessageSquare,
	PhoneCall,
	Clock,
	Zap
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons.jsx";
import { TiltCard } from "./TiltCard.jsx";

export function Contact() {
	const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
	const [status, setStatus] = useState({ type: "", message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatus({ type: "loading", message: "Sending your message..." });

		try {
			const res = await axios.post("/api/contact", form);
			if (res.data && res.data.emailSent) {
				setStatus({
					type: "success",
					message: "Thank you! Your message has been sent directly to reshamkumar4533@gmail.com. I'll get back to you soon."
				});
			} else {
				setStatus({
					type: "success",
					message: "Thank you! Your message has been received and saved. I'll get back to you soon."
				});
			}
			setForm({ name: "", email: "", subject: "", message: "" });
		} catch (err) {
			const errorMsg =
				err.response?.data?.message ||
				"Could not send message automatically. Please email directly at reshamkumar4533@gmail.com";
			setStatus({
				type: "error",
				message: errorMsg
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="section contact-section" id="contact">
			<div className="container">
				{/* Header */}
				<div className="section-header text-center">
					<div className="section-badge">
						<MessageSquare size={14} />
						<span>Let's Build Something Together</span>
					</div>
					<h2 className="section-title">
						📫 Get In <span className="gradient-text">Touch</span>
					</h2>
					<p className="section-subtitle">
						Have a project in mind, looking for a full-stack / Flutter developer, or just want to discuss software engineering? Reach out anytime!
					</p>
				</div>

				<div className="contact-layout-grid">
					{/* Left Information Card with 3D Tilt */}
					<TiltCard className="contact-info-tilt" maxTilt={6} scale={1.015}>
						<div className="contact-info-card">
							<div className="contact-status-box">
								<div className="status-indicator-ring">
									<span className="pulsing-circle"></span>
								</div>
								<div>
									<h4 className="status-heading">Available for Opportunities</h4>
									<p className="status-text">
										Open to Full-Stack Web, Flutter Mobile, Java development roles, internships, and collaborative builds.
									</p>
								</div>
							</div>

							<div className="contact-channels-list">
								<a href="mailto:reshamkumar4533@gmail.com" className="contact-channel-item">
									<div className="channel-icon-wrap bg-blue-subtle">
										<Mail size={18} className="text-blue" />
									</div>
									<div>
										<span className="channel-label">Email Me</span>
										<span className="channel-value">reshamkumar4533@gmail.com</span>
									</div>
								</a>

								<div className="contact-channel-item">
									<div className="channel-icon-wrap bg-purple-subtle">
										<MapPin size={18} className="text-purple" />
									</div>
									<div>
										<span className="channel-label">Location</span>
										<span className="channel-value">Nepal (Open to Remote / Hybrid)</span>
									</div>
								</div>

								<div className="contact-channel-item">
									<div className="channel-icon-wrap bg-emerald-subtle">
										<Clock size={18} className="text-emerald" />
									</div>
									<div>
										<span className="channel-label">Response Time</span>
										<span className="channel-value">Within 24 Hours</span>
									</div>
								</div>
							</div>

							<div className="social-connect-block">
								<h5 className="social-block-title">Follow & Connect:</h5>
								<div className="social-buttons-grid">
									<a
										href="https://github.com/Resham-01"
										target="_blank"
										rel="noreferrer"
										className="social-card-btn"
									>
										<GithubIcon size={18} />
										<span>GitHub</span>
									</a>
									<a
										href="https://www.linkedin.com/in/resham-kumar-thapa-b747a7268/"
										target="_blank"
										rel="noreferrer"
										className="social-card-btn"
									>
										<LinkedinIcon size={18} />
										<span>LinkedIn</span>
									</a>
									<a
										href="https://x.com/resham_kumar_01"
										target="_blank"
										rel="noreferrer"
										className="social-card-btn"
									>
										<XIcon size={16} />
										<span>X (Twitter)</span>
									</a>
								</div>
							</div>
						</div>
					</TiltCard>

					{/* Right Form Card with 3D Tilt */}
					<TiltCard className="contact-form-tilt" maxTilt={6} scale={1.015}>
						<div className="contact-form-card">
							<div className="form-header-badge">
								<Zap size={14} className="text-cyan" />
								<span>Direct Inbox Delivery</span>
							</div>
							<h3 className="form-title">Send a Direct Message</h3>
							<p className="form-subtitle">Fill out the form below and I'll respond promptly.</p>

							<form onSubmit={handleSubmit} className="custom-contact-form">
								<div className="form-row-2">
									<div className="form-group">
										<label htmlFor="name" className="form-label">
											Your Name *
										</label>
										<input
											id="name"
											name="name"
											type="text"
											className="form-input"
											placeholder="e.g. Alex Sharma"
											value={form.name}
											onChange={handleChange}
											required
										/>
									</div>

									<div className="form-group">
										<label htmlFor="email" className="form-label">
											Your Email *
										</label>
										<input
											id="email"
											name="email"
											type="email"
											className="form-input"
											placeholder="alex@example.com"
											value={form.email}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<div className="form-group">
									<label htmlFor="subject" className="form-label">
										Subject / Project Type
									</label>
									<input
										id="subject"
										name="subject"
										type="text"
										className="form-input"
										placeholder="e.g. MERN Web App / Flutter Mobile Project / Opportunity"
										value={form.subject}
										onChange={handleChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="message" className="form-label">
										Message *
									</label>
									<textarea
										id="message"
										name="message"
										rows="5"
										className="form-input form-textarea"
										placeholder="Tell me about your project, ideas, or questions..."
										value={form.message}
										onChange={handleChange}
										required
									></textarea>
								</div>

								<button
									type="submit"
									className="btn btn-primary btn-block"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										<span>Sending Message...</span>
									) : (
										<>
											<span>Send Message</span>
											<Send size={16} />
										</>
									)}
								</button>

								{status.message && (
									<div
										className={`form-status-alert ${
											status.type === "success"
												? "status-success"
												: status.type === "loading"
												? "status-loading"
												: "status-error"
										}`}
									>
										{status.type === "success" && <CheckCircle2 size={18} />}
										{status.type === "error" && <AlertCircle size={18} />}
										<span>{status.message}</span>
									</div>
								)}
							</form>
						</div>
					</TiltCard>
				</div>
			</div>
		</section>
	);
}
