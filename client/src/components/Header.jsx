import { useState, useEffect } from "react";
import { Sun, Moon, Send, Sparkles, Menu, X } from "lucide-react";
import profilePhoto from "../assets/profile.jpg";

export function Header({ theme, onToggleTheme }) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ name: "About", href: "#about" },
		{ name: "Tech Stack", href: "#skills" },
		{ name: "Projects", href: "#projects" },
		{ name: "Education", href: "#education" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<header className={`site-header ${scrolled ? "scrolled" : ""}`}>
			<div className="header-inner container">
				<a href="#" className="brand">
					<div className="brand-avatar-wrap">
						<img src={profilePhoto} alt="Resham Kumar Thapa" className="brand-avatar" />
						<span className="online-indicator" title="Available for opportunities"></span>
					</div>
					<div className="brand-text">
						<span className="brand-name">Resham K. Thapa</span>
						<span className="brand-badge">Full-Stack & Flutter</span>
					</div>
				</a>

				{/* Desktop Navigation */}
				<nav className="desktop-nav">
					{navItems.map((item) => (
						<a key={item.name} href={item.href} className="nav-link">
							{item.name}
						</a>
					))}
				</nav>

				<div className="header-actions">
					<button
						className="theme-toggle-btn"
						onClick={onToggleTheme}
						title={`Switch to ${theme === "dark" ? "bright" : "dark"} mode`}
						aria-label="Toggle Theme"
					>
						{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
					</button>

					<a href="#contact" className="btn btn-primary btn-sm header-cta">
						<Send size={15} />
						<span>Let's Connect</span>
					</a>

					<button
						className="mobile-menu-btn"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle Menu"
					>
						{mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>

			{/* Mobile Dropdown */}
			{mobileMenuOpen && (
				<div className="mobile-nav-dropdown">
					{navItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="mobile-nav-link"
							onClick={() => setMobileMenuOpen(false)}
						>
							{item.name}
						</a>
					))}
					<a
						href="#contact"
						className="btn btn-primary btn-sm mobile-cta"
						onClick={() => setMobileMenuOpen(false)}
					>
						<Send size={15} />
						<span>Let's Connect</span>
					</a>
				</div>
			)}
		</header>
	);
}
