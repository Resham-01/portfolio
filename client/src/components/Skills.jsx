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
	Layers
} from "lucide-react";

export function Skills() {
	const [activeCategory, setActiveCategory] = useState("all");

	const skillCategories = [
		{
			id: "frontend",
			title: "Frontend",
			icon: <Code2 size={18} />,
			description: "Crafting responsive, accessible, and high-performance user interfaces.",
			skills: [
				{ name: "React", level: "Advanced", icon: "⚛️", highlight: true },
				{ name: "JavaScript (ES6+)", level: "Advanced", icon: "📜", highlight: true },
				{ name: "Tailwind CSS", level: "Advanced", icon: "🎨", highlight: true },
				{ name: "HTML5", level: "Expert", icon: "🌐", highlight: false },
				{ name: "CSS3 / SCSS", level: "Advanced", icon: "✨", highlight: false },
				{ name: "Three.js / 3D Canvas", level: "Intermediate", icon: "🧊", highlight: false }
			]
		},
		{
			id: "backend",
			title: "Backend",
			icon: <Server size={18} />,
			description: "Architecting secure RESTful endpoints, auth services, and controllers.",
			skills: [
				{ name: "Node.js", level: "Advanced", icon: "🟢", highlight: true },
				{ name: "Express.js", level: "Advanced", icon: "⚡", highlight: true },
				{ name: "REST APIs", level: "Advanced", icon: "🔌", highlight: true },
				{ name: "JWT Auth & Middleware", level: "Intermediate", icon: "🔒", highlight: false },
				{ name: "Payment Integrations (eSewa, Khalti)", level: "Intermediate", icon: "💳", highlight: true }
			]
		},
		{
			id: "mobile",
			title: "Mobile Development",
			icon: <Smartphone size={18} />,
			description: "Building cross-platform iOS and Android apps with native performance.",
			skills: [
				{ name: "Flutter", level: "Advanced", icon: "💙", highlight: true },
				{ name: "Dart", level: "Advanced", icon: "🎯", highlight: true },
				{ name: "Firebase Mobile Auth", level: "Advanced", icon: "🔥", highlight: false },
				{ name: "Google Maps SDK", level: "Intermediate", icon: "🗺️", highlight: false },
				{ name: "QR Code Scanning & Tickets", level: "Intermediate", icon: "📱", highlight: false }
			]
		},
		{
			id: "database",
			title: "Database",
			icon: <Database size={18} />,
			description: "Structuring scalable schemas, indexes, real-time sync, and relational models.",
			skills: [
				{ name: "MongoDB", level: "Advanced", icon: "🍃", highlight: true },
				{ name: "MySQL", level: "Intermediate", icon: "🐬", highlight: false },
				{ name: "Cloud Firestore", level: "Advanced", icon: "🔥", highlight: true },
				{ name: "Mongoose ODM", level: "Advanced", icon: "📦", highlight: false }
			]
		},
		{
			id: "programming",
			title: "Programming Languages",
			icon: <FileCode size={18} />,
			description: "Core computer science fundamentals, OOP paradigms, and problem solving.",
			skills: [
				{ name: "Java (Core & Advanced)", level: "Advanced", icon: "☕", highlight: true },
				{ name: "JavaScript", level: "Advanced", icon: "💛", highlight: true },
				{ name: "Dart", level: "Advanced", icon: "💙", highlight: false },
				{ name: "Python", level: "Intermediate", icon: "🐍", highlight: false }
			]
		},
		{
			id: "tools",
			title: "Tools & Workflow",
			icon: <Wrench size={18} />,
			description: "Industry-standard developer tooling and collaboration workflows.",
			skills: [
				{ name: "Git", level: "Advanced", icon: "🌿", highlight: true },
				{ name: "GitHub", level: "Advanced", icon: "🐙", highlight: true },
				{ name: "Postman", level: "Advanced", icon: "🚀", highlight: false },
				{ name: "VS Code", level: "Advanced", icon: "💻", highlight: false }
			]
		},
		{
			id: "cloud",
			title: "Cloud & Deployment",
			icon: <Cloud size={18} />,
			description: "Continuous integration, cloud database hosting, and edge deployment.",
			skills: [
				{ name: "Firebase", level: "Advanced", icon: "🔥", highlight: true },
				{ name: "MongoDB Atlas", level: "Advanced", icon: "☁️", highlight: true },
				{ name: "Vercel", level: "Advanced", icon: "▲", highlight: false },
				{ name: "Render", level: "Advanced", icon: "🖥️", highlight: false }
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

				{/* Categories Matrix */}
				<div className="skills-categories-grid">
					{filteredCategories.map((category) => (
						<div key={category.id} className="skill-category-card">
							<div className="category-card-header">
								<div className="category-icon-box">{category.icon}</div>
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
										<span className="skill-chip-icon">{skill.icon}</span>
										<span className="skill-chip-name">{skill.name}</span>
										<span className="skill-chip-level">{skill.level}</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
