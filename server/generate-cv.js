import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createCV(outputPath) {
	return new Promise((resolve, reject) => {
		const dir = path.dirname(outputPath);
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const doc = new PDFDocument({
			size: "A4",
			margins: { top: 36, bottom: 36, left: 40, right: 40 },
			info: {
				Title: "Resham Kumar Thapa - CV",
				Author: "Resham Kumar Thapa",
				Subject: "Full-Stack Developer Resume",
				Keywords: "Full-Stack Developer, MERN, Flutter, Java, Cloud, BIT"
			}
		});

		const stream = fs.createWriteStream(outputPath);
		doc.pipe(stream);

		const primaryColor = "#1e293b";
		const accentColor = "#4f46e5";
		const secondaryColor = "#0284c7";
		const textColor = "#334155";
		const mutedColor = "#64748b";

		// Header Section
		doc.fontSize(22).font("Helvetica-Bold").fillColor(primaryColor).text("Resham Kumar Thapa", { align: "left" });
		doc.moveDown(0.2);
		doc.fontSize(11).font("Helvetica-Bold").fillColor(accentColor).text("Full-Stack Developer | MERN • Flutter • Java • Cloud");
		doc.moveDown(0.3);

		doc.fontSize(9).font("Helvetica").fillColor(textColor).text(
			"Email: resham4533@gmail.com  •  Location: Nepal (Open to Remote / Hybrid)  •  GitHub: github.com/Resham-01  •  LinkedIn: linkedin.com/in/resham-kumar-thapa-b747a7268"
		);
		doc.moveDown(0.6);

		// Horizontal Divider
		doc.strokeColor("#e2e8f0").lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
		doc.moveDown(0.6);

		// Helper to render section headings
		function renderSectionHeading(title) {
			doc.moveDown(0.4);
			doc.fontSize(11).font("Helvetica-Bold").fillColor(primaryColor).text(title.toUpperCase());
			doc.moveDown(0.15);
			doc.strokeColor(accentColor).lineWidth(1.5).moveTo(40, doc.y).lineTo(100, doc.y).stroke();
			doc.moveDown(0.4);
		}

		// Professional Summary
		renderSectionHeading("Professional Summary");
		doc.fontSize(9.5).font("Helvetica").fillColor(textColor).text(
			"Proactive Full-Stack Developer and Bachelor of Information Technology (BIT) student passionate about building scalable, secure, and user-friendly web and mobile applications. Experienced in architecting end-to-end MERN stack solutions and cross-platform Flutter applications integrated with cloud services, digital payment gateways, and real-time databases.",
			{ lineGap: 2.5 }
		);

		// Technical Skills
		renderSectionHeading("Technical Skills");
		const skills = [
			{ category: "Frontend", items: "React, JavaScript (ES6+), HTML5, CSS3, SCSS, Tailwind CSS, Responsive Web Design" },
			{ category: "Backend", items: "Node.js, Express.js, RESTful APIs, JWT Authentication, Middleware, API Security" },
			{ category: "Mobile", items: "Flutter, Dart, Firebase Mobile Auth, Cloud Firestore, Google Maps SDK, QR Scanner" },
			{ category: "Databases", items: "MongoDB, MySQL, Cloud Firestore, Mongoose ODM" },
			{ category: "Languages", items: "Java (Core & Advanced OOP), JavaScript, Dart, Python" },
			{ category: "Cloud & DevOps", items: "Firebase, MongoDB Atlas, Vercel, Render, Postman, Git & GitHub" }
		];

		skills.forEach((s) => {
			doc.fontSize(9).font("Helvetica-Bold").fillColor(primaryColor).text(`•  ${s.category}: `, { continued: true });
			doc.font("Helvetica").fillColor(textColor).text(s.items, { lineGap: 1.5 });
		});

		// Featured Projects
		renderSectionHeading("Featured Projects");

		// Project 1: Shulka Suvidha
		doc.fontSize(10).font("Helvetica-Bold").fillColor(primaryColor).text("Shulka Suvidha", { continued: true });
		doc.font("Helvetica").fillColor(mutedColor).text("  |  Digital Fee Management System with Online Payment Integration");
		doc.fontSize(8.5).font("Helvetica-Oblique").fillColor(accentColor).text("Tech Stack: React, Node.js, Express.js, MongoDB, Tailwind CSS, eSewa, Khalti");
		doc.moveDown(0.2);

		const p1Points = [
			"Architected a scalable multi-tenant platform tailored for educational institutions to automate student billing and fee structures.",
			"Integrated national payment gateways (eSewa & Khalti) with automated instant invoice and digital receipt generation.",
			"Implemented comprehensive dues tracking, late penalty automation, and an administrative revenue analytics dashboard."
		];
		p1Points.forEach((pt) => {
			doc.fontSize(9).font("Helvetica").fillColor(textColor).text(`-  ${pt}`, { indent: 10, lineGap: 1.5 });
		});
		doc.moveDown(0.5);

		// Project 2: Majestic Nexus
		doc.fontSize(10).font("Helvetica-Bold").fillColor(primaryColor).text("Majestic Nexus", { continued: true });
		doc.font("Helvetica").fillColor(mutedColor).text("  |  Flutter Event Management System");
		doc.fontSize(8.5).font("Helvetica-Oblique").fillColor(accentColor).text("Tech Stack: Flutter, Dart, Firebase Auth, Cloud Firestore, Google Maps, QR Code Scanner");
		doc.moveDown(0.2);

		const p2Points = [
			"Developed a feature-rich cross-platform mobile app featuring secure multi-factor Firebase authentication and real-time database synchronization.",
			"Integrated dynamic QR code ticketing and high-speed camera scanner for frictionless event check-ins.",
			"Built interactive venue discovery powered by Google Maps API, automated event waitlists, promo code discounts, and multilingual UI support."
		];
		p2Points.forEach((pt) => {
			doc.fontSize(9).font("Helvetica").fillColor(textColor).text(`-  ${pt}`, { indent: 10, lineGap: 1.5 });
		});

		// Education
		renderSectionHeading("Education");
		doc.fontSize(10).font("Helvetica-Bold").fillColor(primaryColor).text("Bachelor of Information Technology (BIT)", { continued: true });
		doc.font("Helvetica").fillColor(mutedColor).text("  |  Student");
		doc.fontSize(9).font("Helvetica").fillColor(textColor).text("Focus: Data Structures & Algorithms, Database Systems, Object-Oriented Software Engineering, Computer Networks & Cybersecurity.");

		// Core Interests & Focus
		renderSectionHeading("Core Focus & Interests");
		doc.fontSize(9).font("Helvetica").fillColor(textColor).text(
			"Advanced Java & System Design  •  Cybersecurity & API Hardening  •  Scalable Distributed Systems  •  Clean Architecture",
			{ lineGap: 2 }
		);

		doc.end();

		stream.on("finish", () => resolve(outputPath));
		stream.on("error", (err) => reject(err));
	});
}

async function run() {
	const outPaths = [
		path.join(__dirname, "../client/public/Resham_Kumar_Thapa_CV.pdf"),
		path.join(__dirname, "public/cv/Resham_Kumar_Thapa_CV.pdf"),
		path.join(__dirname, "../server/public/cv/Resham_Kumar_Thapa_CV.pdf")
	];

	for (const p of outPaths) {
		await createCV(p);
		console.log("Generated CV at:", p);
	}
}

run().catch(console.error);
