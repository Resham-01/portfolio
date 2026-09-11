import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function HeroModel({ theme }) {
	const groupRef = useRef();
	const ringRef1 = useRef();
	const ringRef2 = useRef();
	const particlesRef = useRef();

	const isDark = theme === "dark";
	const primaryColor = isDark ? "#6366f1" : "#3b82f6";
	const secondaryColor = isDark ? "#06b6d4" : "#0284c7";
	const accentColor = isDark ? "#ec4899" : "#8b5cf6";

	const mainMaterial = useMemo(
		() =>
			new THREE.MeshStandardMaterial({
				color: primaryColor,
				metalness: 0.6,
				roughness: 0.2,
				wireframe: false,
			}),
		[primaryColor]
	);

	const torusGeometry = useMemo(() => new THREE.TorusKnotGeometry(0.85, 0.22, 180, 30), []);
	const smallSphere = useMemo(() => new THREE.SphereGeometry(0.18, 24, 24), []);
	const ringGeo = useMemo(() => new THREE.TorusGeometry(1.6, 0.02, 16, 100), []);

	// Generate particle cloud
	const particleCount = 40;
	const particlePositions = useMemo(() => {
		const positions = [];
		for (let i = 0; i < particleCount; i++) {
			positions.push([
				(Math.random() - 0.5) * 5,
				(Math.random() - 0.5) * 4,
				(Math.random() - 0.5) * 3,
			]);
		}
		return positions;
	}, []);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (groupRef.current) {
			groupRef.current.rotation.y = t * 0.2;
			groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.2;
			groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
		}
		if (ringRef1.current) {
			ringRef1.current.rotation.x = t * 0.3;
			ringRef1.current.rotation.y = t * 0.15;
		}
		if (ringRef2.current) {
			ringRef2.current.rotation.y = -t * 0.25;
			ringRef2.current.rotation.z = t * 0.1;
		}
	});

	return (
		<group ref={groupRef} position={[0, 0, 0]}>
			{/* Main central 3D element */}
			<mesh geometry={torusGeometry} material={mainMaterial} castShadow receiveShadow />

			{/* Orbiting accent spheres */}
			<mesh geometry={smallSphere} position={[1.4, 0.7, 0.5]}>
				<meshStandardMaterial
					color={secondaryColor}
					emissive={secondaryColor}
					emissiveIntensity={0.6}
					roughness={0.1}
				/>
			</mesh>
			<mesh geometry={smallSphere} position={[-1.3, -0.8, -0.4]}>
				<meshStandardMaterial
					color={accentColor}
					emissive={accentColor}
					emissiveIntensity={0.6}
					roughness={0.1}
				/>
			</mesh>
			<mesh geometry={smallSphere} position={[0.4, -1.2, 1.1]}>
				<meshStandardMaterial
					color="#10b981"
					emissive="#10b981"
					emissiveIntensity={0.5}
					roughness={0.1}
				/>
			</mesh>

			{/* Subtle glowing orbital rings */}
			<mesh ref={ringRef1} geometry={ringGeo}>
				<meshBasicMaterial color={secondaryColor} transparent opacity={0.35} />
			</mesh>
			<mesh ref={ringRef2} geometry={ringGeo}>
				<meshBasicMaterial color={accentColor} transparent opacity={0.25} />
			</mesh>

			{/* Subtle background float particles */}
			<group ref={particlesRef}>
				{particlePositions.map((pos, idx) => (
					<mesh key={idx} position={pos}>
						<sphereGeometry args={[0.03, 8, 8]} />
						<meshBasicMaterial
							color={idx % 2 === 0 ? secondaryColor : primaryColor}
							transparent
							opacity={0.4}
						/>
					</mesh>
				))}
			</group>
		</group>
	);
}
