import { Router } from "express";

const router = Router();

const profile = {
	name: "Resham Kumar Thapa",
	title: "Full-Stack Developer | MERN • Flutter • Java • Cloud",
	location: "Nepal",
	avatar: "/public/profile.jpg",
	summary: "Full-Stack Developer and BIT student passionate about building practical, scalable, and user-friendly applications across web, mobile, and cloud environments.",
	education: {
		degree: "Bachelor of Information Technology (BIT)",
		status: "Student & Active Builder"
	},
	socials: {
		github: "https://github.com/Resham-01",
		linkedin: "https://www.linkedin.com/in/resham-kumar-thapa-b747a7268/",
		twitter: "https://x.com/resham_kumar_01",
		x: "https://x.com/resham_kumar_01",
		email: "reshamkumar4533@gmail.com"
	},
	aboutPoints: [
		{ icon: "GraduationCap", text: "Bachelor of Information Technology (BIT) student" },
		{ icon: "Code2", text: "Focused on Full-Stack Web Development" },
		{ icon: "Rocket", text: "Building applications with the MERN Stack" },
		{ icon: "Smartphone", text: "Developing mobile applications with Flutter & Firebase" },
		{ icon: "Cloud", text: "Exploring Cloud Technologies & Deployment" },
		{ icon: "Brain", text: "Currently improving my skills in Advanced Java, React, Node.js & System Design" },
		{ icon: "ShieldCheck", text: "Interested in Cybersecurity, APIs, Databases & Software Engineering" },
		{ icon: "Sprout", text: "Always learning, building, and experimenting with new technologies" }
	],
	skillsByCategory: {
		"Frontend": ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
		"Backend": ["Node.js", "Express.js", "REST APIs"],
		"Database": ["MongoDB", "MySQL", "Firebase"],
		"Mobile": ["Flutter", "Dart"],
		"Programming": ["Java", "JavaScript", "Python"],
		"Tools": ["Git", "GitHub", "Postman", "VS Code"],
		"Cloud & DevOps": ["Firebase", "MongoDB Atlas", "Vercel", "Render"]
	},
	projects: [
		{
			id: "shulka-suvidha",
			title: "Shulka Suvidha",
			subtitle: "Digital Fee Management System with Online Payment Integration",
			description: "A multi-tenant MERN-based fee management platform designed to simplify school fee collection, student invoicing, and automated administrative operations.",
			featured: true,
			tags: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "eSewa", "Khalti"],
			category: "MERN Stack / FinTech",
			stats: { type: "Multi-tenant", payment: "eSewa & Khalti" },
			highlights: [
				"Multi-tenant architecture for individual school isolation",
				"Integrated seamless digital wallets (eSewa & Khalti)",
				"Automated student fee ledgers and downloadable invoices",
				"Comprehensive dashboard with payment analytics and audit logs"
			]
		},
		{
			id: "majestic-nexus",
			title: "Majestic Nexus",
			subtitle: "Flutter Event Management System",
			description: "A complete cross-platform event management application with authentication, event discovery, digital tickets, QR-based check-in, waitlists, promo codes, and interactive maps.",
			featured: true,
			tags: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Google Maps", "QR Code"],
			category: "Mobile Application",
			stats: { platform: "iOS & Android", realtime: "Cloud Firestore" },
			highlights: [
				"Real-time event discovery with Google Maps geo-location",
				"Instant QR code ticket generation and scanner for gate entry",
				"Dynamic waitlist management and promo code discount engine",
				"Multilingual localization support & secure Firebase Auth"
			]
		}
	]
};

router.get("/", (req, res) => {
	res.json(profile);
});

export default router;


