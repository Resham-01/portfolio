import {
	GraduationCap,
	Code2,
	Rocket,
	Smartphone,
	Cloud,
	Brain,
	ShieldCheck,
	Sprout,
	Sparkles,
	Terminal,
	Cpu,
	Globe2
} from "lucide-react";
import { TiltCard } from "./TiltCard.jsx";

export function About() {
	const aboutHighlights = [
		{
			icon: <GraduationCap className="about-icon text-indigo" size={24} />,
			glowClass: "indigo",
			title: "Bachelor of IT Student",
			subtitle: "Academics & Theory",
			description: "Pursuing Bachelor of Information Technology (BIT), gaining deep fundamentals in algorithms, computing architecture, and software principles.",
			badge: "Academic Foundation"
		},
		{
			icon: <Code2 className="about-icon text-cyan" size={24} />,
			glowClass: "cyan",
			title: "Full-Stack Web Focus",
			subtitle: "Frontend to Backend",
			description: "Specializing in end-to-end web engineering, translating complex business logic into intuitive user interfaces and performant APIs.",
			badge: "Web Architecture"
		},
		{
			icon: <Rocket className="about-icon text-emerald" size={24} />,
			glowClass: "emerald",
			title: "MERN Stack Development",
			subtitle: "MongoDB, Express, React, Node",
			description: "Crafting scalable single-page apps, RESTful backends, and multi-tenant architectures like digital billing & fee platforms.",
			badge: "Core Stack"
		},
		{
			icon: <Smartphone className="about-icon text-blue" size={24} />,
			glowClass: "blue",
			title: "Flutter & Mobile Apps",
			subtitle: "Cross-Platform iOS & Android",
			description: "Developing robust mobile applications featuring live Firebase backend, Google Maps integration, QR ticketing, and offline sync.",
			badge: "Mobile Ecosystem"
		},
		{
			icon: <Cloud className="about-icon text-sky" size={24} />,
			glowClass: "sky",
			title: "Cloud & Deployment",
			subtitle: "Hosting & Infrastructure",
			description: "Exploring cloud platforms including Firebase, MongoDB Atlas, Vercel, and Render for automated continuous deployments.",
			badge: "DevOps & Cloud"
		},
		{
			icon: <Brain className="about-icon text-purple" size={24} />,
			glowClass: "purple",
			title: "Advanced Java & System Design",
			subtitle: "Scalability & Clean Architecture",
			description: "Sharpening skills in Object-Oriented Java, multi-threading, clean design patterns, and scalable distributed system design.",
			badge: "Core Engineering"
		},
		{
			icon: <ShieldCheck className="about-icon text-amber" size={24} />,
			glowClass: "amber",
			title: "Cybersecurity & APIs",
			subtitle: "Data Security & Best Practices",
			description: "Deeply interested in securing authentication flows, guarding against common vulnerabilities, database optimizations, and API security.",
			badge: "Security & Quality"
		},
		{
			icon: <Sprout className="about-icon text-emerald" size={24} />,
			glowClass: "emerald",
			title: "Continuous Learner & Builder",
			subtitle: "Growth Mindset",
			description: "Constantly building real-world projects, experimenting with cutting-edge tools, and staying on top of modern technology advancements.",
			badge: "Always Learning"
		}
	];

	return (
		<section className="section about-section" id="about">
			<div className="container">
				{/* Section Header */}
				<div className="section-header text-center">
					<div className="section-badge">
						<Sparkles size={14} />
						<span>Get To Know Me</span>
					</div>
					<h2 className="section-title">
						👨‍💻 About <span className="gradient-text">Resham</span>
					</h2>
					<p className="section-subtitle">
						I'm a Full-Stack Developer and BIT student passionate about building practical, scalable, and user-friendly applications that solve real-world problems.
					</p>
				</div>

				{/* Quick Highlights / Philosophy Banner with 3D Tilt */}
				<TiltCard className="about-banner-tilt" maxTilt={6} scale={1.015}>
					<div className="about-banner-card">
						<div className="about-banner-left">
							<div className="terminal-badge">
								<Terminal size={16} />
								<span>developer.profile</span>
							</div>
							<h3 className="banner-heading">Driven by Code, Passionate about Craftsmanship</h3>
							<p className="banner-text">
								Whether engineering a multi-tenant payment platform or building an offline-ready Flutter event app, I focus on clean architecture, resilient database schemas, and smooth user interactions.
							</p>
						</div>
						<div className="about-banner-right">
							<div className="experience-tag">
								<Cpu size={20} className="text-cyan" />
								<div>
									<span className="exp-val">Full-Cycle</span>
									<span className="exp-sub">Design to Deployment</span>
								</div>
							</div>
							<div className="experience-tag">
								<Globe2 size={20} className="text-indigo" />
								<div>
									<span className="exp-val">Modern Stacks</span>
									<span className="exp-sub">MERN • Flutter • Java</span>
								</div>
							</div>
						</div>
					</div>
				</TiltCard>

				{/* 8 Highlight 3D Cards Grid */}
				<div className="about-grid">
					{aboutHighlights.map((item, index) => (
						<TiltCard
							key={index}
							className="about-card-tilt"
							maxTilt={10}
							scale={1.03}
						>
							<div className={`about-card border-glow-${item.glowClass}`}>
								<div className="about-card-header">
									<div className={`about-icon-wrapper bg-${item.glowClass}-subtle`}>
										{item.icon}
									</div>
									<span className="about-pill">{item.badge}</span>
								</div>
								<h3 className="about-card-title">{item.title}</h3>
								<h4 className="about-card-subtitle">{item.subtitle}</h4>
								<p className="about-card-desc">{item.description}</p>
							</div>
						</TiltCard>
					))}
				</div>
			</div>
		</section>
	);
}
