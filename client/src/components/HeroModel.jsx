import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function HeroModel({ theme }) {
	const mainGroupRef = useRef();
	const coreRef = useRef();
	const innerCoreRef = useRef();
	const ring1Ref = useRef();
	const ring2Ref = useRef();
	const ring3Ref = useRef();
	const orbitMernRef = useRef();
	const orbitFlutterRef = useRef();
	const orbitJavaRef = useRef();
	const orbitCloudRef = useRef();
	const particlesRef = useRef();

	const isDark = theme === "dark";
	const primaryColor = isDark ? "#6366f1" : "#4f46e5"; // Indigo
	const cyanColor = isDark ? "#06b6d4" : "#0284c7";    // Cyan
	const pinkColor = isDark ? "#ec4899" : "#db2777";    // Pink / Violet
	const emeraldColor = isDark ? "#10b981" : "#059669"; // Emerald
	const amberColor = isDark ? "#f59e0b" : "#d97706";   // Amber

	// Geometries
	const coreGeo = useMemo(() => new THREE.IcosahedronGeometry(0.85, 1), []);
	const innerCoreGeo = useMemo(() => new THREE.OctahedronGeometry(0.45, 0), []);
	const ringGeo1 = useMemo(() => new THREE.TorusGeometry(1.45, 0.022, 16, 100), []);
	const ringGeo2 = useMemo(() => new THREE.TorusGeometry(1.85, 0.018, 16, 100), []);
	const ringGeo3 = useMemo(() => new THREE.TorusGeometry(2.2, 0.015, 16, 100), []);
	const planetGeo = useMemo(() => new THREE.SphereGeometry(0.18, 24, 24), []);
	const miniPlanetGeo = useMemo(() => new THREE.SphereGeometry(0.12, 16, 16), []);

	// Particles
	const particlePositions = useMemo(() => {
		const positions = [];
		for (let i = 0; i < 50; i++) {
			const r = 1.2 + Math.random() * 2.2;
			const theta = Math.random() * Math.PI * 2;
			const phi = (Math.random() - 0.5) * Math.PI;
			positions.push([
				r * Math.cos(phi) * Math.sin(theta),
				r * Math.sin(phi),
				r * Math.cos(phi) * Math.cos(theta),
			]);
		}
		return positions;
	}, []);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();

		// Main Group Gentle Float & Mouse Parallax
		if (mainGroupRef.current) {
			mainGroupRef.current.position.y = Math.sin(t * 1.2) * 0.1;
			mainGroupRef.current.rotation.y = t * 0.15;
		}

		// Core Rotations
		if (coreRef.current) {
			coreRef.current.rotation.x = t * 0.35;
			coreRef.current.rotation.y = t * 0.45;
		}
		if (innerCoreRef.current) {
			innerCoreRef.current.rotation.x = -t * 0.6;
			innerCoreRef.current.rotation.z = t * 0.5;
			const pulse = 1 + Math.sin(t * 3) * 0.12;
			innerCoreRef.current.scale.set(pulse, pulse, pulse);
		}

		// Gimbal Rings
		if (ring1Ref.current) {
			ring1Ref.current.rotation.x = t * 0.3;
			ring1Ref.current.rotation.y = t * 0.2;
		}
		if (ring2Ref.current) {
			ring2Ref.current.rotation.y = -t * 0.25;
			ring2Ref.current.rotation.z = t * 0.15;
		}
		if (ring3Ref.current) {
			ring3Ref.current.rotation.x = Math.sin(t * 0.2) * 0.5;
			ring3Ref.current.rotation.z = -t * 0.2;
		}

		// Orbiting Tech Planets (MERN, Flutter, Java, Cloud)
		if (orbitMernRef.current) {
			const angle = t * 0.8;
			const r = 1.45;
			orbitMernRef.current.position.x = Math.cos(angle) * r;
			orbitMernRef.current.position.z = Math.sin(angle) * r;
			orbitMernRef.current.position.y = Math.sin(angle * 2) * 0.3;
		}
		if (orbitFlutterRef.current) {
			const angle = -t * 0.65 + 1.5;
			const r = 1.85;
			orbitFlutterRef.current.position.x = Math.cos(angle) * r;
			orbitFlutterRef.current.position.z = Math.sin(angle) * r;
			orbitFlutterRef.current.position.y = Math.cos(angle) * 0.4;
		}
		if (orbitJavaRef.current) {
			const angle = t * 0.5 + 3.14;
			const r = 2.1;
			orbitJavaRef.current.position.x = Math.cos(angle) * r;
			orbitJavaRef.current.position.z = Math.sin(angle) * r;
			orbitJavaRef.current.position.y = Math.sin(angle * 1.5) * 0.35;
		}
		if (orbitCloudRef.current) {
			const angle = -t * 0.7 + 4.5;
			const r = 1.6;
			orbitCloudRef.current.position.x = Math.sin(angle) * r;
			orbitCloudRef.current.position.z = Math.cos(angle) * r;
			orbitCloudRef.current.position.y = Math.sin(angle) * 0.5;
		}

		// Particle Vortex
		if (particlesRef.current) {
			particlesRef.current.rotation.y = -t * 0.1;
		}
	});

	return (
		<group ref={mainGroupRef} position={[0, 0, 0]}>
			{/* Central Futuristic Crystal Polyhedron */}
			<mesh ref={coreRef} geometry={coreGeo}>
				<meshStandardMaterial
					color={primaryColor}
					wireframe={true}
					roughness={0.1}
					metalness={0.9}
					emissive={primaryColor}
					emissiveIntensity={0.4}
				/>
			</mesh>

			{/* Glowing Inner Energy Core */}
			<mesh ref={innerCoreRef} geometry={innerCoreGeo}>
				<meshStandardMaterial
					color={cyanColor}
					emissive={cyanColor}
					emissiveIntensity={1.2}
					roughness={0.1}
				/>
			</mesh>

			{/* Multi-Axial Cyber Rings */}
			<mesh ref={ring1Ref} geometry={ringGeo1}>
				<meshStandardMaterial
					color={cyanColor}
					emissive={cyanColor}
					emissiveIntensity={0.6}
					roughness={0.2}
				/>
			</mesh>
			<mesh ref={ring2Ref} geometry={ringGeo2}>
				<meshStandardMaterial
					color={pinkColor}
					emissive={pinkColor}
					emissiveIntensity={0.5}
					roughness={0.2}
				/>
			</mesh>
			<mesh ref={ring3Ref} geometry={ringGeo3}>
				<meshStandardMaterial
					color={emeraldColor}
					emissive={emeraldColor}
					emissiveIntensity={0.4}
					roughness={0.2}
				/>
			</mesh>

			{/* Satellite Tech Planet 1: MERN (Cyan Glow) */}
			<group ref={orbitMernRef}>
				<mesh geometry={planetGeo}>
					<meshStandardMaterial
						color={cyanColor}
						emissive={cyanColor}
						emissiveIntensity={0.8}
						roughness={0.1}
					/>
				</mesh>
				<mesh geometry={miniPlanetGeo} position={[0.26, 0.1, 0]}>
					<meshStandardMaterial
						color="#38bdf8"
						emissive="#38bdf8"
						emissiveIntensity={0.6}
					/>
				</mesh>
			</group>

			{/* Satellite Tech Planet 2: Flutter (Blue & Cyan) */}
			<group ref={orbitFlutterRef}>
				<mesh geometry={planetGeo}>
					<meshStandardMaterial
						color="#3b82f6"
						emissive="#3b82f6"
						emissiveIntensity={0.9}
						roughness={0.1}
					/>
				</mesh>
			</group>

			{/* Satellite Tech Planet 3: Java (Amber / Orange) */}
			<group ref={orbitJavaRef}>
				<mesh geometry={planetGeo}>
					<meshStandardMaterial
						color={amberColor}
						emissive={amberColor}
						emissiveIntensity={0.9}
						roughness={0.1}
					/>
				</mesh>
			</group>

			{/* Satellite Tech Planet 4: Cloud / AI (Emerald) */}
			<group ref={orbitCloudRef}>
				<mesh geometry={planetGeo}>
					<meshStandardMaterial
						color={emeraldColor}
						emissive={emeraldColor}
						emissiveIntensity={0.9}
						roughness={0.1}
					/>
				</mesh>
			</group>

			{/* Ambient Sparkle Cloud */}
			<group ref={particlesRef}>
				{particlePositions.map((pos, idx) => (
					<mesh key={idx} position={pos}>
						<sphereGeometry args={[0.025, 6, 6]} />
						<meshBasicMaterial
							color={
								idx % 4 === 0
									? cyanColor
									: idx % 4 === 1
									? pinkColor
									: idx % 4 === 2
									? emeraldColor
									: primaryColor
							}
							transparent
							opacity={0.65}
						/>
					</mesh>
				))}
			</group>
		</group>
	);
}
