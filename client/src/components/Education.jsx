import {
	GraduationCap,
	BookOpen,
	Brain,
	ShieldCheck,
	Sprout,
	Calendar,
	Sparkles,
	Target,
	Award
} from "lucide-react";

export function Education() {
	const roadmapItems = [
		{
			title: "Bachelor of Information Technology (BIT)",
			type: "Formal Education",
			institution: "University Program",
			icon: <GraduationCap size={22} className="text-indigo" />,
			status: "In Progress",
			description:
				"Rigorous curriculum covering Data Structures & Algorithms, Database Management Systems (DBMS), Object-Oriented Programming, Computer Networks, and Software Engineering.",
			highlights: [
				"Core Foundations in Computer Science & Computing",
				"Advanced Database Design (Relational & NoSQL)",
				"Network Security & Operating Systems"
			]
		},
		{
			title: "Advanced Java & Scalable System Design",
			type: "Technical Specialization",
			institution: "Self-Driven Mastery & Projects",
			icon: <Brain size={22} className="text-purple" />,
			status: "Active Focus",
			description:
				"Deep-diving into concurrency, multi-threading, Spring principles, microservice architecture, message queues, and low-latency system design.",
			highlights: [
				"Object-Oriented Design & Clean Architecture",
				"API Gateway patterns & distributed state management",
				"System scalability and throughput optimization"
			]
		},
		{
			title: "Cybersecurity & API Hardening",
			type: "Domain Interest",
			institution: "Security Standards & Labs",
			icon: <ShieldCheck size={22} className="text-amber" />,
			status: "Continuous Exploration",
			description:
				"Studying token authentication vulnerabilities, OWASP Top 10 mitigation, encryption at rest and in transit, and database sanitization.",
			highlights: [
				"JWT best practices & refresh token rotation",
				"CORS, rate limiting, and input validation layers",
				"Secure cloud deployment configurations"
			]
		}
	];

	return (
		<section className="section education-section" id="education">
			<div className="container">
				{/* Section Header */}
				<div className="section-header text-center">
					<div className="section-badge">
						<Award size={14} />
						<span>Academics & Trajectory</span>
					</div>
					<h2 className="section-title">
						🎓 Education & <span className="gradient-text">Learning Focus</span>
					</h2>
					<p className="section-subtitle">
						Strong computer science foundations paired with practical industry-grade software engineering.
					</p>
				</div>

				{/* Timeline / Cards */}
				<div className="education-timeline-grid">
					{roadmapItems.map((item, idx) => (
						<div key={idx} className="education-card">
							<div className="education-card-top">
								<div className="edu-icon-badge">{item.icon}</div>
								<div className="edu-status-pill">{item.status}</div>
							</div>
							<div className="edu-type-label">{item.type}</div>
							<h3 className="edu-title">{item.title}</h3>
							<div className="edu-institution">
								<BookOpen size={14} />
								<span>{item.institution}</span>
							</div>
							<p className="edu-desc">{item.description}</p>
							<div className="edu-highlights">
								{item.highlights.map((hl, hIdx) => (
									<div key={hIdx} className="edu-hl-item">
										<Target size={13} className="text-cyan" />
										<span>{hl}</span>
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
