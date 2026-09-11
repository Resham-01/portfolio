import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import { HeroModel } from "./HeroModel.jsx";
import profilePhoto from "../assets/profile.jpg";
import {
	Eye,
	Users,
	Star,
	ArrowUpRight,
	Download,
	Mail,
	Code2,
	Sparkles,
	Layers,
	Smartphone,
	Database,
	Cloud,
	CheckCircle2
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons.jsx";

export function Hero({ theme }) {
	const [starsCount, setStarsCount] = useState(18);
	const [viewsCount, setViewsCount] = useState(1420);
	const [followersCount, setFollowersCount] = useState(64);
	const [hasStarred, setHasStarred] = useState(false);

	const handleStar = () => {
		if (!hasStarred) {
			setStarsCount((prev) => prev + 1);
			setHasStarred(true);
		} else {
			setStarsCount((prev) => prev - 1);
			setHasStarred(false);
		}
	};

	return (
		<section className="hero-section" id="hero">
			{/* Ambient background glow elements */}
			<div className="hero-glow hero-glow-1"></div>
			<div className="hero-glow hero-glow-2"></div>

			<div className="container hero-grid">
				{/* Left content */}
				<div className="hero-content">
					{/* Status pill */}
					<div className="hero-status-badge">
						<span className="pulsing-dot"></span>
						<span>Available for Full-Stack & Mobile Roles</span>
					</div>

					{/* Role highlight */}
					<div className="hero-role-pill">
						<span className="rocket-icon">🚀</span>
						<span className="role-text">Full-Stack Developer | MERN • Flutter • Java • Cloud</span>
					</div>

					{/* Main Title */}
					<h1 className="hero-title">
						Hi <span className="wave-emoji">👋</span>, I'm{" "}
						<span className="gradient-text-name">Resham Kumar Thapa</span>
					</h1>

					{/* Bio summary */}
					<p className="hero-subtitle">
						Full-Stack Developer and <strong>Bachelor of Information Technology (BIT)</strong> student passionate about building practical, scalable, and user-friendly applications across web, mobile, and cloud environments.
					</p>

					{/* Interactive GitHub Badges & Metrics */}
					<div className="github-metrics-bar">
						<div className="metric-badge" title="Profile views count">
							<Eye size={16} className="metric-icon metric-icon-blue" />
							<div className="metric-text">
								<span className="metric-label">Profile Views</span>
								<span className="metric-value">{viewsCount.toLocaleString()}+</span>
							</div>
						</div>

						<a
							href="https://github.com/Resham-01"
							target="_blank"
							rel="noreferrer"
							className="metric-badge metric-badge-interactive"
							title="View GitHub Followers"
						>
							<Users size={16} className="metric-icon metric-icon-purple" />
							<div className="metric-text">
								<span className="metric-label">GitHub Followers</span>
								<span className="metric-value">{followersCount}</span>
							</div>
						</a>

						<button
							onClick={handleStar}
							className={`metric-badge metric-badge-interactive star-btn ${hasStarred ? "starred" : ""}`}
							title="Click to Star GitHub Portfolio"
						>
							<Star size={16} className={`metric-icon ${hasStarred ? "metric-icon-gold fill-gold" : "metric-icon-gold"}`} />
							<div className="metric-text">
								<span className="metric-label">{hasStarred ? "Starred!" : "GitHub Stars"}</span>
								<span className="metric-value">{starsCount}</span>
							</div>
						</button>
					</div>

					{/* Action Buttons */}
					<div className="hero-cta-group">
						<a href="#projects" className="btn btn-primary btn-lg">
							<span>Featured Projects</span>
							<ArrowUpRight size={18} />
						</a>
						<a
							href="/Resham_Kumar_Thapa_CV.pdf"
							className="btn btn-outline btn-lg"
							download="Resham_Kumar_Thapa_CV.pdf"
							target="_blank"
							rel="noreferrer"
						>
							<Download size={18} />
							<span>Download CV</span>
						</a>
						<a href="#contact" className="btn btn-ghost btn-lg">
							<Mail size={18} />
							<span>Contact Me</span>
						</a>
					</div>

					{/* Social Quick Links */}
					<div className="hero-social-row">
						<span className="social-label">Connect:</span>
						<a href="https://github.com/Resham-01" target="_blank" rel="noreferrer" className="social-icon-btn" title="GitHub (Resham-01)">
							<GithubIcon size={18} />
						</a>
						<a href="https://www.linkedin.com/in/resham-kumar-thapa-b747a7268/" target="_blank" rel="noreferrer" className="social-icon-btn" title="LinkedIn (Resham Kumar Thapa)">
							<LinkedinIcon size={18} />
						</a>
						<a href="https://x.com/resham_kumar_01" target="_blank" rel="noreferrer" className="social-icon-btn" title="X / Twitter (@resham_kumar_01)">
							<XIcon size={16} />
						</a>
						<a href="mailto:resham4533@gmail.com" className="social-icon-btn" title="Email Resham (resham4533@gmail.com)">
							<Mail size={18} />
						</a>
					</div>
				</div>

				{/* Right Side: Photo Card + 3D Canvas Showcase */}
				<div className="hero-visual-wrapper">
					<div className="profile-glass-card">
						{/* Background 3D Canvas overlay */}
						<div className="profile-canvas-layer">
							<Suspense fallback={<div className="canvas-loader">Loading 3D...</div>}>
								<Canvas camera={{ position: [2.4, 1.6, 3.2], fov: 48 }}>
									<ambientLight intensity={theme === "dark" ? 0.9 : 0.6} />
									<directionalLight position={[4, 5, 4]} intensity={theme === "dark" ? 1.6 : 1.2} />
									<Environment preset="city" />
									<PresentationControls speed={1.5} global zoom={0.9} polar={[-0.2, 0.2]} azimuth={[-0.4, 0.4]}>
										<Float floatIntensity={1.4} rotationIntensity={0.5}>
											<HeroModel theme={theme} />
										</Float>
									</PresentationControls>
									<ContactShadows frames={1} position={[0, -0.9, 0]} scale={8} blur={1.8} opacity={0.4} />
									<OrbitControls enableZoom={false} enablePan={false} />
								</Canvas>
							</Suspense>
						</div>

						{/* Foreground Profile Photo Frame */}
						<div className="profile-photo-container">
							<div className="photo-ring-glow"></div>
							<div className="photo-frame">
								<img
									src={profilePhoto}
									alt="Resham Kumar Thapa - Full-Stack Developer"
									className="profile-img"
								/>
							</div>

							{/* Floating Tech Badges */}
							<div className="floating-badge badge-mern" title="MERN Stack Expert">
								<Layers size={15} />
								<span>MERN Stack</span>
							</div>

							<div className="floating-badge badge-flutter" title="Flutter Mobile Apps">
								<Smartphone size={15} />
								<span>Flutter</span>
							</div>

							<div className="floating-badge badge-java" title="Java & System Design">
								<Code2 size={15} />
								<span>Java</span>
							</div>

							<div className="floating-badge badge-cloud" title="Cloud & Firebase">
								<Cloud size={15} />
								<span>Firebase & Cloud</span>
							</div>
						</div>

						{/* Mini summary card bottom */}
						<div className="profile-card-footer">
							<div className="dev-identity">
								<span className="dev-name">Resham Kumar Thapa</span>
								<span className="dev-role">BIT Student & Full-Stack Engineer</span>
							</div>
							<div className="dev-status-tag">
								<CheckCircle2 size={14} className="check-icon" />
								<span>Open to Work</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Highlight Stats Bar below Hero */}
			<div className="container hero-stats-container">
				<div className="stats-glass-grid">
					<div className="stat-item">
						<div className="stat-number">BIT</div>
						<div className="stat-title">Bachelor of IT Student</div>
						<div className="stat-desc">Computing & System Design</div>
					</div>
					<div className="stat-divider"></div>

					<div className="stat-item">
						<div className="stat-number">MERN</div>
						<div className="stat-title">Full-Stack Web Stack</div>
						<div className="stat-desc">React, Node, Express, MongoDB</div>
					</div>
					<div className="stat-divider"></div>

					<div className="stat-item">
						<div className="stat-number">Flutter</div>
						<div className="stat-title">Cross-Platform Mobile</div>
						<div className="stat-desc">Dart, Firebase, QR & Maps</div>
					</div>
					<div className="stat-divider"></div>

					<div className="stat-item">
						<div className="stat-number">15+</div>
						<div className="stat-title">Technologies Mastered</div>
						<div className="stat-desc">Web, Cloud & Database</div>
					</div>
				</div>
			</div>
		</section>
	);
}
