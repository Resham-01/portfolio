import axios from "axios";
import { useEffect, useState } from "react";

export function Sections() {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		axios.get("/api/profile").then((res) => setProfile(res.data)).catch(() => setProfile(null));
	}, []);

	return (
		<main>
			<section id="about" className="section">
				<h2>About</h2>
				<p>
					{profile?.summary ||
						"I am a developer focused on building immersive 3D web experiences and high-quality MERN stack applications."}
				</p>
				<ul className="skills">
					{(profile?.skills || ["React", "Node.js", "MongoDB", "Three.js"]).map((s) => (
						<li key={s}>{s}</li>
					))}
				</ul>
			</section>
			<section id="projects" className="section">
				<h2>Projects</h2>
				<div className="projects-grid">
					<div className="card">
						<h3>3D Portfolio</h3>
						<p>Interactive 3D hero built with Three.js and @react-three/fiber.</p>
					</div>
					<div className="card">
						<h3>MERN App</h3>
						<p>Full-stack CRUD app with Express and MongoDB.</p>
					</div>
				</div>
			</section>
			<section id="contact" className="section">
				<h2>Contact</h2>
				<ContactForm />
			</section>
		</main>
	);
}

function ContactForm() {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [status, setStatus] = useState(null);

	async function submit(e) {
		e.preventDefault();
		setStatus("Sending...");
		try {
			await axios.post("/api/contact", form);
			setStatus("Message sent! Thank you.");
			setForm({ name: "", email: "", message: "" });
		} catch (e) {
			setStatus("Failed to send. Please try again.");
		}
	}

	return (
		<form className="contact-form" onSubmit={submit}>
			<input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
			<input placeholder="Your email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
			<textarea placeholder="Your message" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
			<button className="btn primary" type="submit">Send</button>
			{status && <div className="status">{status}</div>}
		</form>
	);
}


