import { ArrowUp, Heart, Mail, Code } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "./Icons.jsx";
import profilePhoto from "../assets/profile.jpg";

export function Footer() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="site-footer">
			<div className="container footer-inner">
				<div className="footer-top-row">
					<div className="footer-brand-col">
						<div className="footer-brand">
							<img src={profilePhoto} alt="Resham Kumar Thapa" className="footer-avatar" />
							<div>
								<span className="footer-name">Resham Kumar Thapa</span>
								<span className="footer-role">Full-Stack & Flutter Developer</span>
							</div>
						</div>
						<p className="footer-tagline">
							Building modern, scalable web and mobile applications with MERN Stack, Flutter, and Java.
						</p>
					</div>

					<div className="footer-links-col">
						<span className="footer-col-title">Navigation</span>
						<div className="footer-links-list">
							<a href="#about">About Me</a>
							<a href="#skills">Tech Stack</a>
							<a href="#projects">Featured Projects</a>
							<a href="#education">Education</a>
							<a href="#contact">Contact</a>
						</div>
					</div>

					<div className="footer-social-col">
						<span className="footer-col-title">Connect</span>
						<div className="footer-social-icons">
							<a href="https://github.com/Resham-01" target="_blank" rel="noreferrer" title="GitHub (Resham-01)" className="footer-icon-link">
								<GithubIcon size={18} />
							</a>
							<a href="https://www.linkedin.com/in/resham-kumar-thapa-b747a7268/" target="_blank" rel="noreferrer" title="LinkedIn" className="footer-icon-link">
								<LinkedinIcon size={18} />
							</a>
							<a href="https://x.com/resham_kumar_01" target="_blank" rel="noreferrer" title="X (Twitter)" className="footer-icon-link">
								<XIcon size={16} />
							</a>
							<a href="mailto:resham4533@gmail.com" title="Email (resham4533@gmail.com)" className="footer-icon-link">
								<Mail size={18} />
							</a>
						</div>
						<button onClick={scrollToTop} className="back-to-top-btn" title="Back to top">
							<span>Back to top</span>
							<ArrowUp size={15} />
						</button>
					</div>
				</div>

				<div className="footer-bottom-bar">
					<p className="copyright-text">
						© {new Date().getFullYear()} Resham Kumar Thapa. All rights reserved.
					</p>
					<p className="tech-crafted-text">
						Crafted with <span className="heart-pulse">❤️</span> using React, Three.js & SCSS
					</p>
				</div>
			</div>
		</footer>
	);
}
