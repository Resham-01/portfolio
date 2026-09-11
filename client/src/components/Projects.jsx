import { useState } from "react";
import {
	ExternalLink,
	Layers,
	Smartphone,
	CreditCard,
	QrCode,
	MapPin,
	Shield,
	Users,
	Sparkles,
	CheckCircle2,
	ChevronRight,
	Calendar,
	ArrowRight,
	FileText,
	Code2,
	Compass,
	Zap
} from "lucide-react";
import { GithubIcon } from "./Icons.jsx";
import { TiltCard } from "./TiltCard.jsx";

export function Projects() {
	const [activeProjectModal, setActiveProjectModal] = useState(null);
	const [activeFilter, setActiveFilter] = useState("all");

	const projects = [
		{
			id: "shulka-suvidha",
			title: "Shulka Suvidha",
			subtitle: "Digital Fee Management System with Online Payment Integration",
			tagline: "Multi-tenant MERN-based digital fee collection & accounting infrastructure",
			icon: "💰",
			badge: "Featured MERN FinTech",
			category: "web",
			description:
				"A comprehensive multi-tenant MERN-based fee management platform engineered to simplify school fee collection, invoice automation, parent payment portals, and administrative bookkeeping.",
			techStack: [
				"React",
				"Node.js",
				"Express.js",
				"MongoDB",
				"Tailwind CSS",
				"eSewa",
				"Khalti"
			],
			highlights: [
				{
					title: "Multi-Tenant Architecture",
					desc: "Isolated data partitions allowing multiple institutions and schools to securely manage their distinct student bodies, classes, and fee structures."
				},
				{
					title: "eSewa & Khalti Online Payment Gateways",
					desc: "Direct integration with major Nepali digital wallets enabling parents to pay fees online with instant automated digital receipt generation."
				},
				{
					title: "Student Ledger & Dues Tracking",
					desc: "Automated due date calculation, late penalty triggers, customized fee heads, and downloadable statement reports."
				},
				{
					title: "Analytics & Admin Dashboard",
					desc: "Comprehensive visual graphs for revenue collection, outstanding balances, class-wise payment percentages, and audit trails."
				}
			],
			previewDetails: {
				role: "Lead Full-Stack Developer",
				timeline: "Production Ready",
				architecture: "React SPA + Node RESTful API + MongoDB Cluster"
			}
		},
		{
			id: "majestic-nexus",
			title: "Majestic Nexus",
			subtitle: "Flutter Event Management System",
			tagline: "Cross-platform mobile event discovery, ticketing & live QR entry ecosystem",
			icon: "🎫",
			badge: "Featured Mobile App",
			category: "mobile",
			description:
				"A complete cross-platform event management application with authentication, event management, digital tickets, QR-based joining/scanning, waitlists, promo codes, maps, and multilingual support.",
			techStack: [
				"Flutter",
				"Dart",
				"Firebase Auth",
				"Cloud Firestore",
				"Google Maps SDK",
				"QR Code Scanner"
			],
			highlights: [
				{
					title: "Digital Tickets & Instant QR Verification",
					desc: "Dynamic cryptographic QR ticket generation with real-time camera scanner support for fast, foolproof gate check-ins."
				},
				{
					title: "Interactive Google Maps Discovery",
					desc: "Geo-location powered event explorer pinpointing nearby venue locations, routes, and venue capacity indicators."
				},
				{
					title: "Real-time Waitlists & Promo Discount Engine",
					desc: "Automated slot reallocation for sold-out events and dynamic coupon code validation with percentage or flat discounts."
				},
				{
					title: "Multilingual Support & Firebase Auth",
					desc: "Seamless multi-language UI localization paired with multi-factor Firebase authentication (Email, Google, Phone)."
				}
			],
			previewDetails: {
				role: "Mobile App Engineer",
				timeline: "Mobile Production",
				architecture: "Flutter Cross-Platform (iOS & Android) + Cloud Firestore"
			}
		}
	];

	const filteredProjects = activeFilter === "all"
		? projects
		: projects.filter(p => p.category === activeFilter);

	return (
		<section className="section projects-section" id="projects">
			<div className="container">
				{/* Section Header */}
				<div className="section-header text-center">
					<div className="section-badge">
						<Sparkles size={14} />
						<span>Proven Engineering</span>
					</div>
					<h2 className="section-title">
						🚀 Featured <span className="gradient-text">Projects</span>
					</h2>
					<p className="section-subtitle">
						Real-world applications built with modern architectural patterns, robust security, and seamless user experiences.
					</p>

					{/* Category Filter Tabs */}
					<div className="projects-filter-bar">
						<button
							className={`filter-tab-btn ${activeFilter === "all" ? "active" : ""}`}
							onClick={() => setActiveFilter("all")}
						>
							<Zap size={14} />
							<span>All Projects ({projects.length})</span>
						</button>
						<button
							className={`filter-tab-btn ${activeFilter === "web" ? "active" : ""}`}
							onClick={() => setActiveFilter("web")}
						>
							<Layers size={14} />
							<span>Full-Stack Web</span>
						</button>
						<button
							className={`filter-tab-btn ${activeFilter === "mobile" ? "active" : ""}`}
							onClick={() => setActiveFilter("mobile")}
						>
							<Smartphone size={14} />
							<span>Flutter Mobile</span>
						</button>
					</div>
				</div>

				{/* Projects Grid */}
				<div className="projects-showcase-grid">
					{filteredProjects.map((project, index) => (
						<TiltCard
							key={project.id}
							className="project-tilt-container"
							maxTilt={8}
							scale={1.02}
						>
							<article className="project-feature-card">
								{/* Card Top Banner */}
								<div className="project-card-header">
									<div className="project-header-left">
										<div className="project-icon-badge">{project.icon}</div>
										<div>
											<span className="project-category-tag">{project.badge}</span>
											<h3 className="project-title">{project.title}</h3>
										</div>
									</div>
									<span className="project-number">0{index + 1}</span>
								</div>

								{/* Subtitle & Tagline */}
								<div className="project-subtitle-box">
									<p className="project-subtitle">{project.subtitle}</p>
									<p className="project-description">{project.description}</p>
								</div>

								{/* Key Architecture Highlights */}
								<div className="project-highlights-grid">
									{project.highlights.slice(0, 3).map((hl, hIdx) => (
										<div key={hIdx} className="highlight-pill">
											<CheckCircle2 size={16} className="highlight-check" />
											<div className="highlight-body">
												<strong>{hl.title}: </strong>
												<span>{hl.desc}</span>
											</div>
										</div>
									))}
								</div>

								{/* Tech Stack Chips */}
								<div className="project-tech-wrapper">
									<span className="tech-label">Tech Stack:</span>
									<div className="tech-chips-list">
										{project.techStack.map((tech) => (
											<span key={tech} className="tech-pill">
												{tech}
											</span>
										))}
									</div>
								</div>

								{/* Card Actions */}
								<div className="project-card-actions">
									<button
										className="btn btn-primary btn-sm"
										onClick={() => setActiveProjectModal(project)}
									>
										<span>View Full Architecture</span>
										<ChevronRight size={16} />
									</button>
									<a
										href="https://github.com/Resham-01"
										target="_blank"
										rel="noreferrer"
										className="btn btn-outline btn-sm"
									>
										<GithubIcon size={15} />
										<span>Source Code</span>
									</a>
								</div>
							</article>
						</TiltCard>
					))}
				</div>

				{/* Project Detail Modal */}
				{activeProjectModal && (
					<div
						className="project-modal-backdrop"
						onClick={() => setActiveProjectModal(null)}
					>
						<div
							className="project-modal-content"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="modal-header">
								<div className="modal-title-group">
									<span className="modal-icon">{activeProjectModal.icon}</span>
									<div>
										<span className="modal-badge">{activeProjectModal.badge}</span>
										<h3 className="modal-title">{activeProjectModal.title}</h3>
										<p className="modal-subtitle">{activeProjectModal.subtitle}</p>
									</div>
								</div>
								<button
									className="modal-close-btn"
									onClick={() => setActiveProjectModal(null)}
								>
									✕
								</button>
							</div>

							<div className="modal-body">
								<div className="modal-info-bar">
									<div className="modal-info-item">
										<span className="info-label">Role</span>
										<span className="info-val">{activeProjectModal.previewDetails.role}</span>
									</div>
									<div className="modal-info-item">
										<span className="info-label">Status</span>
										<span className="info-val">{activeProjectModal.previewDetails.timeline}</span>
									</div>
									<div className="modal-info-item">
										<span className="info-label">Stack</span>
										<span className="info-val">{activeProjectModal.techStack.slice(0, 3).join(", ")}...</span>
									</div>
								</div>

								<h4 className="modal-section-title">Deep Dive & Architectural Highlights</h4>
								<div className="modal-highlights-list">
									{activeProjectModal.highlights.map((hl, idx) => (
										<div key={idx} className="modal-highlight-item">
											<div className="modal-hl-icon">
												<CheckCircle2 size={18} className="text-emerald" />
											</div>
											<div>
												<h5 className="modal-hl-title">{hl.title}</h5>
												<p className="modal-hl-desc">{hl.desc}</p>
											</div>
										</div>
									))}
								</div>

								<h4 className="modal-section-title">Full Technology Stack</h4>
								<div className="modal-tech-pills">
									{activeProjectModal.techStack.map((tech) => (
										<span key={tech} className="tech-pill large">
											{tech}
										</span>
									))}
								</div>
							</div>

							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={() => setActiveProjectModal(null)}
								>
									Close
								</button>
								<a
									href="#contact"
									className="btn btn-primary"
									onClick={() => setActiveProjectModal(null)}
								>
									Discuss This Project
								</a>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
