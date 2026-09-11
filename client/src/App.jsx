import { useEffect, useState } from "react";
import axios from "axios";
import { Background3D } from "./components/Background3D.jsx";
import { SmokeTrail3D } from "./components/SmokeTrail3D.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { About } from "./components/About.jsx";
import { Skills } from "./components/Skills.jsx";
import { Projects } from "./components/Projects.jsx";
import { Education } from "./components/Education.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("portfolio_theme") || "dark";
	});

	useEffect(() => {
		localStorage.setItem("portfolio_theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "bright" : "dark"));
	};

	return (
		<div className="portfolio-app-root">
			{/* Global 3D Interactive Particle Background */}
			<Background3D theme={theme} />

			{/* Interactive 3D Airplane Smoke / Contrail Effect following Cursor */}
			<SmokeTrail3D theme={theme} />

			{/* Ambient global backdrop light */}
			<div className="global-mesh-glow"></div>

			<Header theme={theme} onToggleTheme={toggleTheme} />

			<main>
				<Hero theme={theme} />
				<About />
				<Skills />
				<Projects />
				<Education />
				<Contact />
			</main>

			<Footer />
		</div>
	);
}
