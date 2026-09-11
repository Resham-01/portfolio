import { useState } from "react";
import {
	Code2,
	Server,
	Database,
	Smartphone,
	FileCode,
	Wrench,
	Cloud,
	CheckCircle,
	Sparkles,
	Layers,
	Cpu
} from "lucide-react";
import { TiltCard } from "./TiltCard.jsx";

export function Skills() {
	const [activeCategory, setActiveCategory] = useState("all");

	const skillCategories = [
		{
			id: "frontend",
			title: "Frontend Engineering",
			icon: <Code2 size={20} className="text-cyan" />,
			glowColor: "cyan",
			description: "Crafting responsive, accessible, and high-performance user interfaces.",
			skills: [
				{ name: "React", level: "Advanced", icon: "⚛️", percent: 92, highlight: true },
				{ name: "JavaScript (ES6+)", level: "Advanced", icon: "📜", percent: 90, highlight: true },
				{ name: "Tailwind CSS", level: "Advanced", icon: "🎨", percent: 92, highlight: true },
				{ name: "HTML5", level: "Expert", icon: "🌐", percent: 95, highlight: false },
				{ name: "CSS3 / SCSS", level: "Advanced", icon: "✨", percent: 88, highlight: false },
				{ name: "Three.js / 3D Canvas", level: "Intermediate", icon: "🧊", percent: 80, highlight: false }
			]
		},
		{
			id: "backend",
			title: "Backend & Systems",
			icon: <Server size={20} className="text-indigo" />,
			glowColor: "indigo",
			description: "Architecting secure RESTful endpoints, auth services, and controllers.",
			skills: [
				{ name: "Node.js", level: "Advanced", icon: "🟢", percent: 90, highlight: true },
				{ name: "Express.js", level: "Advanced", icon: "⚡", percent: 92, highlight: true },
				{ name: "REST APIs", level: "Advanced", icon: "🔌", percent: 94, highlight: true },
				{ name: "JWT Auth & Middleware", level: "Advanced", icon: "🔒", percent: 86, highlight: false },
				{ name: "Payment Integrations (eSewa, Khalti)", level: "Advanced", icon: "💳", percent: 88, highlight: true }
			]
		},
		{
			id: "mobile",
			title: "Mobile Development",
			icon: <Smartphone size={20} className="text-blue" />,
			glowColor: "blue",
			description: "Building cross-platform iOS and Android apps with native performance.",
			skills: [
				{ name: "Flutter", level: "Advanced", icon: "💙", percent: 92, highlight: true },
				{ name: "Dart", level: "Advanced", icon: "🎯", percent: 90, highlight: true },
				{ name: "Firebase Mobile Auth", level: "Advanced", icon: "🔥", percent: 88, highlight: false },
				{ name: "Google Maps SDK", level: "Intermediate", icon: "🗺️", percent: 85, highlight: false },
				{ name: "QR Code Scanning & Tickets", level: "Intermediate", icon: "📱", percent: 86, highlight: false }
			]
		},
		{
			id: "database",
			title: "Database Architecture",
			icon: <Database size={20} className="text-emerald" />,
			glowColor: "emerald",
			description: "Structuring scalable schemas, indexes, real-time sync, and relational models.",
			skills: [
				{ name: "MongoDB", level: "Advanced", icon: "🍃", percent: 92, highlight: true },
				{ name: "MySQL", level: "Intermediate", icon: "🐬", percent: 82, highlight: false },
				{ name: "Cloud Firestore", level: "Advanced", icon: "🔥", percent: 88, highlight: true },
				{ name: "Mongoose ODM", level: "Advanced", icon: "📦", percent: 90, highlight: false }
			]
		},
		{
			id: "programming",
			title: "Programming Languages",
			icon: <FileCode size={20} className="text-pink" />,
			glowColor: "pink",
			description: "Core computer science fundamentals, OOP paradigms, and problem solving.",
			skills: [
				{ name: "Java (Core & Advanced)", level: "Advanced", icon: "☕", percent: 90, highlight: true },
				{ name: "JavaScript", level: "Advanced", icon: "💛", percent: 92, highlight: true },
				{ name: "Dart", level: "Advanced", icon: "💙", percent: 88, highlight: false },
				{ name: "Python", level: "Intermediate", icon: "🐍", percent: 78, highlight: false }
			]
		},
		{
			id: "tools",
			title: "Tools & DevOps",
			icon: <Wrench size={20} className="text-amber" />,
			glowColor: "amber",
			description: "Industry-standard developer tooling, cloud hosting, and CI/CD pipelines.",
			skills: [
				{ name: "Git & GitHub", level: "Advanced", icon: "🐙", percent: 94, highlight: true },
				{ name: "Postman", level: "Advanced", icon: "🚀", percent: 90, highlight: false },
				{ name: "VS Code", level: "Advanced", icon: "💻", percent: 95, highlight: false },
				{ name: "Vercel & Render", level: "Advanced", icon: "▲", percent: 90, highlight: true },
				{ name: "Firebase & Atlas", level: "Advanced", icon: "☁️", percent: 88, highlight: false }
			]
		}
	];

	const filteredCategories =
		activeCategory === "all"
			? skillCategories
			: skillCategories.filter((cat) => cat.id === activeCategory);

	return (
		<section className="section skills-section" id="skills">
			<div className="container">
				{/* Header */}
				<div className="section-header text-center">
					<div className="section-badge">
						<Layers size={14} />
						<span>Technical Arsenal</span>
					</div>
					<h2 className="section-title">
						💡 What I <span className="gradient-text">Work With</span>
					</h2>
					<p className="section-subtitle">
						A curated stack of modern web, mobile, database, and cloud technologies I leverage to build production-grade digital solutions.
					</p>
				</div>

				{/* Filter Tabs */}
				<div className="skills-filter-nav">
					<button
						className={`skill-tab-btn ${activeCategory === "all" ? "active" : ""}`}
						onClick={() => setActiveCategory("all")}
					>
						<Cpu size={14} />
						<span>All Categories</span>
					</button>
					{skillCategories.map((cat) => (
						<button
							key={cat.id}
							className={`skill-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
							onClick={() => setActiveCategory(cat.id)}
						>
							{cat.icon}
							<span>{cat.title}</span>
						</button>
					))}
				</div>

				{/* Categories 3D Matrix */}
				<div className="skills-categories-grid">
					{filteredCategories.map((category) => (
						<TiltCard
							key={category.id}
							className="skill-category-tilt"
							maxTilt={8}
							scale={1.02}
						>
							<div className={`skill-category-card border-glow-${category.glowColor}`}>
								<div className="category-card-header">
									<div className={`category-icon-box bg-${category.glowColor}-subtle`}>
										{category.icon}
									</div>
									<div>
										<h3 className="category-title">{category.title}</h3>
										<p className="category-desc">{category.description}</p>
									</div>
								</div>

								<div className="skills-tags-wrapper">
									{category.skills.map((skill, sIdx) => (
										<div
											key={sIdx}
											className={`skill-tag-chip ${skill.highlight ? "highlighted" : ""}`}
										>
											<div className="skill-chip-top">
												<span className="skill-chip-icon">{skill.icon}</span>
												<span className="skill-chip-name">{skill.name}</span>
												<span className="skill-chip-level">{skill.level}</span>
											</div>
											<div className="skill-mini-bar">
												<div
													className={`skill-mini-fill bg-${category.glowColor}`}
													style={{ width: `${skill.percent}%` }}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</TiltCard>
					))}
				</div>
			</div>
		</section>
	);
}
