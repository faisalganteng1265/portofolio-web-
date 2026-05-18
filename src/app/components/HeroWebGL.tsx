"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio, 2);

    // ── Renderer ───────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // ── Kawung particle field ──────────────────────────
    // Kawung = 4 interlocking circles per cell in a diamond grid
    const gridW = isMobile ? 6 : 13;
    const gridH = isMobile ? 5 : 9;
    const cellSize = 1.9;
    const petalOffset = 0.46;
    const petalRadius = 0.34;
    const ringCount = isMobile ? 6 : 10;

    const rawPos: number[] = [];
    const rawSizes: number[] = [];

    for (let row = 0; row < gridH; row++) {
      for (let col = 0; col < gridW; col++) {
        const cx = (col - gridW / 2 + (row % 2) * 0.5) * cellSize;
        const cy = (row - gridH / 2) * cellSize * 0.88;

        // 4 petals per cell (up, right, down, left)
        const petals: [number, number][] = [
          [cx, cy + petalOffset],
          [cx + petalOffset, cy],
          [cx, cy - petalOffset],
          [cx - petalOffset, cy],
        ];

        for (const [px, py] of petals) {
          // Center dot
          rawPos.push(px, py, (Math.random() - 0.5) * 1.8);
          rawSizes.push(1.5);

          // Ring of particles forming the circle outline
          for (let r = 0; r < ringCount; r++) {
            const angle = (r / ringCount) * Math.PI * 2;
            const jitter = (Math.random() - 0.5) * 0.04;
            rawPos.push(
              px + Math.cos(angle) * (petalRadius + jitter),
              py + Math.sin(angle) * (petalRadius + jitter),
              (Math.random() - 0.5) * 1.8
            );
            rawSizes.push(0.5 + Math.random() * 0.7);
          }
        }
      }
    }

    const positions = new Float32Array(rawPos);
    const sizes = new Float32Array(rawSizes);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uDpr: { value: dpr },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2  uMouse;
        uniform float uDpr;
        attribute float aSize;
        varying float vAlpha;

        void main() {
          vec3 pos = position;

          // Organic breathing wave
          pos.y += sin(uTime * 0.36 + pos.x * 0.52 + pos.z * 0.28) * 0.15;
          pos.x += cos(uTime * 0.27 + pos.y * 0.44 + pos.z * 0.22) * 0.10;
          pos.z += sin(uTime * 0.42 + pos.x * 0.38) * 0.06;

          // Mouse parallax — deeper particles shift more
          pos.x += uMouse.x * (0.20 + pos.z * 0.05);
          pos.y += uMouse.y * (0.14 + pos.z * 0.04);

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * 3.4 * uDpr;

          vAlpha = aSize * 0.16 + 0.04;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.12, d) * vAlpha;
          // Brighter gold for center dots, dimmer for ring particles
          vec3 c = mix(vec3(0.60, 0.36, 0.14), vec3(0.84, 0.64, 0.29), vAlpha * 1.8);
          gl_FragColor = vec4(c, a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, particleMat);
    scene.add(particles);

    // ── Floating gold crystal (octahedron) ─────────────
    const crystalGeo = new THREE.OctahedronGeometry(1.15, 1);

    const crystalMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d6a44b"),
      metalness: 0.92,
      roughness: 0.09,
      transparent: true,
      opacity: 0.52,
      side: THREE.DoubleSide,
    });
    const crystal = new THREE.Mesh(crystalGeo, crystalMat);

    // Wireframe shell
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#f0c870"),
      wireframe: true,
      transparent: true,
      opacity: 0.20,
    });
    const wireframe = new THREE.Mesh(crystalGeo, wireMat);
    crystal.add(wireframe);

    // Position: upper-right of view
    crystal.position.set(isMobile ? 2.8 : 5.2, 2.2, -0.5);
    scene.add(crystal);

    // Lights for the crystal
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.35);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight("#d6a44b", 10, 14);
    goldLight.position.set(5, 5, 3);
    scene.add(goldLight);

    const rimLight = new THREE.PointLight("#fff8e0", 4, 10);
    rimLight.position.set(-2, 2, 5);
    scene.add(rimLight);

    // ── Mouse & resize ─────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    // ── Render loop ─────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      // Update uniforms
      particleMat.uniforms.uTime.value = t;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      particleMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Crystal spin + float
      crystal.rotation.y = t * 0.20;
      crystal.rotation.x = t * 0.11;
      crystal.position.y = 2.2 + Math.sin(t * 0.58) * 0.16;
      crystal.position.x = (isMobile ? 2.8 : 5.2) + mouse.x * 0.18;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      particleMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[2]"
    />
  );
}
