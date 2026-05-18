"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BatikShaderBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const getSize = () => ({
      w: parent.offsetWidth || window.innerWidth,
      h: parent.offsetHeight || 400,
    });
    const { w, h } = getSize();

    // ── Renderer ───────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(1); // intentionally 1x — it's a decorative bg
    renderer.setSize(w, h);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // ── Full-screen quad with GLSL shader ──────────────
    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(w, h) },
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        precision mediump float;
        uniform float uTime;
        uniform vec2  uRes;

        // Fast hash + smooth noise
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1,0)), f.x),
            mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
            f.y
          );
        }
        float fbm(vec2 p) {
          float v = 0.0;
          v += 0.500 * noise(p);
          v += 0.250 * noise(p * 2.1 + vec2(1.7, 9.2));
          v += 0.125 * noise(p * 4.3 + vec2(8.3, 2.8));
          return v;
        }

        // Soft circle SDF
        float circle(vec2 p, vec2 c, float r) {
          return smoothstep(r + 0.012, r - 0.012, length(p - c));
        }

        // Kawung cell: 4 circles arranged in a cross
        float kawung(vec2 uv) {
          vec2 cell  = fract(uv);
          float pat  = 0.0;
          float r    = 0.40;
          pat += circle(cell, vec2(0.5,  0.0), r);
          pat += circle(cell, vec2(0.5,  1.0), r);
          pat += circle(cell, vec2(0.0,  0.5), r);
          pat += circle(cell, vec2(1.0,  0.5), r);
          return clamp(pat, 0.0, 1.0);
        }

        // Parang-like diagonal stripe overlay
        float parang(vec2 uv) {
          float d = (uv.x - uv.y) * 3.0;
          return smoothstep(0.96, 0.98, abs(fract(d) - 0.5) * 2.0) * 0.5;
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / uRes;
          float aspect = uRes.x / uRes.y;

          // Slow pan
          vec2 p = vec2(uv.x * aspect, uv.y) * 5.0;
          p += vec2(uTime * 0.035, uTime * 0.022);

          // Warped kawung
          vec2 warp = vec2(
            fbm(p + uTime * 0.04),
            fbm(p + vec2(3.7, 1.9) + uTime * 0.032)
          );
          float kaw = kawung(p + warp * 0.22);

          // Diagonal parang stripes
          float par = parang(p * 0.7 + vec2(uTime * 0.018, -uTime * 0.012));

          // Noise base for subtle texture
          float n = fbm(p * 0.9 + uTime * 0.018);

          // Color palette
          vec3 dark  = vec3(0.050, 0.042, 0.031);  // #0d0b08
          vec3 mid   = vec3(0.098, 0.075, 0.048);  // #191310
          vec3 gold  = vec3(0.839, 0.643, 0.294);  // #d6a44b
          vec3 brick = vec3(0.655, 0.208, 0.133);  // #a73522

          vec3 col = mix(dark, mid, n * 0.55);
          col = mix(col, gold  * 0.38, kaw  * 0.45);
          col = mix(col, brick * 0.25, par  * 0.35);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });

    const plane = new THREE.Mesh(geo, mat);
    scene.add(plane);

    // ── Resize observer ────────────────────────────────
    const ro = new ResizeObserver(() => {
      const { w: nw, h: nh } = getSize();
      renderer.setSize(nw, nh);
      mat.uniforms.uRes.value.set(nw, nh);
    });
    ro.observe(parent);

    // ── Render loop ─────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      mat.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full z-0"
    />
  );
}
