import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleGalaxy({ count = 280, theme = "dark" }) {
	const pointsRef = useRef();

	const isDark = theme === "dark";

	const { positions, colors } = useMemo(() => {
		const pos = new Float32Array(count * 3);
		const col = new Float32Array(count * 3);

		const colorOptions = isDark
			? [
					new THREE.Color("#6366f1"), // Indigo
					new THREE.Color("#06b6d4"), // Cyan
					new THREE.Color("#ec4899"), // Pink
					new THREE.Color("#8b5cf6"), // Violet
					new THREE.Color("#3b82f6")  // Blue
			  ]
			: [
					new THREE.Color("#4f46e5"),
					new THREE.Color("#0284c7"),
					new THREE.Color("#7c3aed"),
					new THREE.Color("#059669")
			  ];

		for (let i = 0; i < count; i++) {
			// Spherical distribution
			const radius = 12 + Math.random() * 25;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(Math.random() * 2 - 1);

			pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
			pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
			pos[i * 3 + 2] = radius * Math.cos(phi);

			const chosenColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
			col[i * 3] = chosenColor.r;
			col[i * 3 + 1] = chosenColor.g;
			col[i * 3 + 2] = chosenColor.b;
		}

		return { positions: pos, colors: col };
	}, [count, isDark]);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (pointsRef.current) {
			pointsRef.current.rotation.y = t * 0.03;
			pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;
			pointsRef.current.position.y = Math.sin(t * 0.1) * 0.5;
		}
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					args={[positions, 3]}
				/>
				<bufferAttribute
					attach="attributes-color"
					args={[colors, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.12}
				vertexColors
				transparent
				opacity={isDark ? 0.7 : 0.45}
				blending={THREE.AdditiveBlending}
				sizeAttenuation
			/>
		</points>
	);
}

function CyberGrid({ theme }) {
	const gridRef = useRef();
	const isDark = theme === "dark";

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		if (gridRef.current) {
			gridRef.current.rotation.z = t * 0.015;
		}
	});

	return (
		<group ref={gridRef} position={[0, -8, -12]} rotation={[-Math.PI / 3, 0, 0]}>
			<gridHelper
				args={[60, 40, isDark ? "#4f46e5" : "#6366f1", isDark ? "#1e1b4b" : "#cbd5e1"]}
				position={[0, 0, 0]}
			/>
		</group>
	);
}

export function Background3D({ theme = "dark" }) {
	return (
		<div className="canvas-background-3d">
			<Canvas
				camera={{ position: [0, 0, 20], fov: 60 }}
				dpr={[1, 1.5]}
				gl={{ antialias: false, powerPreference: "high-performance" }}
			>
				<ambientLight intensity={0.4} />
				<ParticleGalaxy count={320} theme={theme} />
				<CyberGrid theme={theme} />
			</Canvas>
		</div>
	);
}
