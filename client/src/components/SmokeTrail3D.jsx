import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Creates a soft procedural volumetric smoke puff texture.
 */
function createSmokeTexture() {
	const canvas = document.createElement("canvas");
	canvas.width = 128;
	canvas.height = 128;
	const ctx = canvas.getContext("2d");

	const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
	gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
	gradient.addColorStop(0.25, "rgba(224, 242, 254, 0.65)");
	gradient.addColorStop(0.55, "rgba(186, 230, 253, 0.28)");
	gradient.addColorStop(0.8, "rgba(125, 211, 252, 0.08)");
	gradient.addColorStop(1, "rgba(56, 189, 248, 0)");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 128, 128);

	const texture = new THREE.CanvasTexture(canvas);
	texture.needsUpdate = true;
	return texture;
}

export function SmokeTrail3D({ theme = "dark" }) {
	const mountRef = useRef(null);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;

		let width = window.innerWidth;
		let height = window.innerHeight;

		// Scene & Camera
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
		camera.position.z = 20;

		// Renderer
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			powerPreference: "high-performance"
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		mount.appendChild(renderer.domElement);

		// Smoke Texture & Geometry
		const smokeTexture = createSmokeTexture();
		const smokeGeo = new THREE.PlaneGeometry(1, 1);

		// Particle Pool Configuration
		const MAX_PARTICLES = 160;
		const particles = [];

		for (let i = 0; i < MAX_PARTICLES; i++) {
			const mat = new THREE.MeshBasicMaterial({
				map: smokeTexture,
				transparent: true,
				opacity: 0,
				depthWrite: false,
				blending: theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending,
				color: theme === "dark" ? new THREE.Color("#93c5fd") : new THREE.Color("#60a5fa")
			});

			const mesh = new THREE.Mesh(smokeGeo, mat);
			mesh.visible = false;
			scene.add(mesh);

			particles.push({
				mesh,
				mat,
				active: false,
				life: 0,
				maxLife: 1.0,
				scale: 0.3,
				maxScale: 2.4,
				vx: 0,
				vy: 0,
				vz: 0,
				rotSpeed: 0
			});
		}

		let particleIdx = 0;

		// Function to convert screen (x, y) into 3D world coordinates at z = 0
		function screenToWorld(clientX, clientY) {
			const ndcX = (clientX / width) * 2 - 1;
			const ndcY = -(clientY / height) * 2 + 1;

			const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
			vector.unproject(camera);

			const dir = vector.sub(camera.position).normalize();
			const distance = -camera.position.z / dir.z;
			const pos = camera.position.clone().add(dir.multiplyScalar(distance));
			return pos;
		}

		// Spawn a single smoke puff
		function spawnSmokePuff(pos, dirX = 0, dirY = 0) {
			const p = particles[particleIdx];
			particleIdx = (particleIdx + 1) % MAX_PARTICLES;

			p.active = true;
			p.life = 1.0;
			p.maxLife = 1.0 + Math.random() * 0.4;
			p.scale = 0.4 + Math.random() * 0.2;
			p.maxScale = 2.2 + Math.random() * 1.0;

			// Position with slight turbulence
			p.mesh.position.set(
				pos.x + (Math.random() - 0.5) * 0.15,
				pos.y + (Math.random() - 0.5) * 0.15,
				pos.z + (Math.random() - 0.5) * 0.2
			);

			p.mesh.rotation.z = Math.random() * Math.PI * 2;
			p.rotSpeed = (Math.random() - 0.5) * 0.04;

			// Velocity: subtle back-draft + upward buoyant float
			p.vx = -dirX * 0.015 + (Math.random() - 0.5) * 0.01;
			p.vy = -dirY * 0.015 + 0.008 + Math.random() * 0.006;
			p.vz = (Math.random() - 0.5) * 0.015;

			p.mesh.visible = true;
			p.mesh.scale.set(p.scale, p.scale, 1);
			p.mat.opacity = 0.75;
		}

		// Mouse tracking with linear interpolation (continuous jet trail)
		let lastPos = null;
		let lastTime = performance.now();

		const handleMouseMove = (e) => {
			const currentPos = screenToWorld(e.clientX, e.clientY);
			const now = performance.now();
			const dt = now - lastTime;
			lastTime = now;

			if (lastPos) {
				const dist = currentPos.distanceTo(lastPos);
				const dirX = currentPos.x - lastPos.x;
				const dirY = currentPos.y - lastPos.y;

				// Interpolate puffs so fast mouse movement forms a continuous smoke stream
				const steps = Math.min(Math.max(Math.floor(dist / 0.35), 1), 6);
				for (let i = 1; i <= steps; i++) {
					const interPos = new THREE.Vector3().lerpVectors(lastPos, currentPos, i / steps);
					spawnSmokePuff(interPos, dirX, dirY);
				}
			} else {
				spawnSmokePuff(currentPos);
			}

			lastPos = currentPos;
		};

		const handleTouchMove = (e) => {
			if (e.touches && e.touches.length > 0) {
				handleMouseMove(e.touches[0]);
			}
		};

		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("touchmove", handleTouchMove, { passive: true });

		// Window resize handler
		const handleResize = () => {
			width = window.innerWidth;
			height = window.innerHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
		};
		window.addEventListener("resize", handleResize);

		// Animation Loop
		let animId;
		const clock = new THREE.Clock();

		const animate = () => {
			animId = requestAnimationFrame(animate);
			const delta = clock.getDelta();

			for (let i = 0; i < MAX_PARTICLES; i++) {
				const p = particles[i];
				if (!p.active) continue;

				p.life -= delta / p.maxLife;

				if (p.life <= 0) {
					p.active = false;
					p.mesh.visible = false;
					continue;
				}

				// Move smoke with buoyant drift
				p.mesh.position.x += p.vx;
				p.mesh.position.y += p.vy;
				p.mesh.position.z += p.vz;
				p.mesh.rotation.z += p.rotSpeed;

				// Expand smoke size outward as it diffuses
				const progress = 1 - p.life;
				const currentScale = p.scale + (p.maxScale - p.scale) * Math.sin(progress * Math.PI * 0.5);
				p.mesh.scale.set(currentScale, currentScale, 1);

				// Smooth fade out
				p.mat.opacity = Math.sin(p.life * Math.PI) * 0.7;
			}

			renderer.render(scene, camera);
		};

		animate();

		// Cleanup
		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("resize", handleResize);

			if (mount && renderer.domElement) {
				mount.removeChild(renderer.domElement);
			}
			renderer.dispose();
			smokeTexture.dispose();
			smokeGeo.dispose();
		};
	}, [theme]);

	return <div ref={mountRef} className="canvas-smoke-trail-3d" />;
}
