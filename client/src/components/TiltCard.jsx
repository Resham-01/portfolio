import { useRef, useState } from "react";

/**
 * 3D Tilt Card Component
 * Provides smooth 3D perspective tilt following the cursor with a dynamic specular shine overlay.
 */
export function TiltCard({
	children,
	className = "",
	maxTilt = 12,
	scale = 1.02,
	perspective = 1000,
	speed = 400,
	glare = true,
	...props
}) {
	const cardRef = useRef(null);
	const [tiltStyle, setTiltStyle] = useState({});
	const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

	const handleMouseMove = (e) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -maxTilt;
		const rotateY = ((x - centerX) / centerX) * maxTilt;

		setTiltStyle({
			transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
			transition: "transform 100ms ease-out"
		});

		if (glare) {
			const glareX = (x / rect.width) * 100;
			const glareY = (y / rect.height) * 100;
			setGlareStyle({
				opacity: 0.35,
				background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 75%)`,
				transition: "opacity 200ms ease-out"
			});
		}
	};

	const handleMouseLeave = () => {
		setTiltStyle({
			transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
			transition: `transform ${speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`
		});
		if (glare) {
			setGlareStyle({
				opacity: 0,
				transition: `opacity ${speed}ms cubic-bezier(0.2, 0.8, 0.2, 1)`
			});
		}
	};

	return (
		<div
			ref={cardRef}
			className={`tilt-card-wrapper ${className}`}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={tiltStyle}
			{...props}
		>
			{children}
			{glare && <div className="tilt-card-glare" style={glareStyle} />}
		</div>
	);
}
