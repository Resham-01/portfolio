import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, PresentationControls, Environment, ContactShadows } from "@react-three/drei";
import { HeroModel } from "./HeroModel.jsx";
import { TiltCard } from "./TiltCard.jsx";
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
	CheckCircle2,
	Compass
} from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons.jsx";

export function Hero({ theme }) {
	const [starsCount, setStarsCount] = useState(24);
	const [viewsCount, setViewsCount] = useState(1850);
	const [followersCount, setFollowersCount] = useState(72);
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
			<div className="hero-glow hero-glow-3"></div>

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
						Full-Stack Developer and <strong>Bachelor of Information Technology (BIT)</strong> student passionate about building high-performance, immersive, and scalable applications across web, mobile, and cloud environments.
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
						<a href="mailto:reshamkumar4533@gmail.com" className="social-icon-btn" title="Email Resham (reshamkumar4533@gmail.com)">
							<Mail size={18} />
						</a>
					</div>
				</div>

				{/* Right Side: 3D Interactive Showcase with Holographic Canvas & Photo Frame */}
				<div className="hero-visual-wrapper">
					<TiltCard className="profile-glass-card-tilt" maxTilt={8} scale={1.03}>
						<div className="profile-glass-card">
							{/* Background 3D Canvas Layer */}
							<div className="profile-canvas-layer">
								<Suspense fallback={<div className="canvas-loader">Generating 3D Galaxy...</div>}>
									<Canvas camera={{ position: [2.6, 1.8, 3.4], fov: 46 }}>
										<ambientLight intensity={theme === "dark" ? 1.0 : 0.7} />
										<directionalLight position={[4, 6, 4]} intensity={theme === "dark" ? 2.0 : 1.4} />
										<pointLight position={[-4, -2, -3]} color="#06b6d4" intensity={1.5} />
										<pointLight position={[3, 3, 2]} color="#ec4899" intensity={1.5} />
										<Environment preset="city" />
										<PresentationControls speed={1.8} global zoom={0.92} polar={[-0.25, 0.25]} azimuth={[-0.45, 0.45]}>
											<Float floatIntensity={1.8} rotationIntensity={0.6}>
												<HeroModel theme={theme} />
											</Float>
										</PresentationControls>
										<ContactShadows frames={1} position={[0, -1.05, 0]} scale={8} blur={2.0} opacity={0.45} />
										<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
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

								{/* 3D Floating Tech Badges with Depth */}
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
									<span>Java Core</span>
								</div>

								<div className="floating-badge badge-cloud" title="Cloud & Firebase">
									<Cloud size={15} />
									<span>Cloud & Atlas</span>
								</div>
							</div>

							{/* Card footer details */}
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
					</TiltCard>
				</div>
			</div>

			{/* 3D Stat Bar */}
			<div className="container hero-stats-container">
				<div className="stats-glass-grid">
					<TiltCard className="stat-tilt-wrapper" maxTilt={10}>
						<div className="stat-item">
							<div className="stat-number gradient-text-indigo">BIT</div>
							<div className="stat-title">Bachelor of IT Student</div>
							<div className="stat-desc">Computing & System Design</div>
						</div>
					</TiltCard>

					<div className="stat-divider"></div>

					<TiltCard className="stat-tilt-wrapper" maxTilt={10}>
						<div className="stat-item">
							<div className="stat-number gradient-text-cyan">MERN</div>
							<div className="stat-title">Full-Stack Web Stack</div>
							<div className="stat-desc">React, Node, Express, MongoDB</div>
						</div>
					</TiltCard>

					<div className="stat-divider"></div>

					<TiltCard className="stat-tilt-wrapper" maxTilt={10}>
						<div className="stat-item">
							<div className="stat-number gradient-text-blue">Flutter</div>
							<div className="stat-title">Cross-Platform Mobile</div>
							<div className="stat-desc">Dart, Firebase, QR & Maps</div>
						</div>
					</TiltCard>

					<div className="stat-divider"></div>

					<TiltCard className="stat-tilt-wrapper" maxTilt={10}>
						<div className="stat-item">
							<div className="stat-number gradient-text-pink">15+</div>
							<div className="stat-title">Technologies Mastered</div>
							<div className="stat-desc">Web, Cloud & Database</div>
						</div>
					</TiltCard>
				</div>
			</div>
		</section>
	);
}
