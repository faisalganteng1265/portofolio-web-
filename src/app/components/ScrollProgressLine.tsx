"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";

export default function ScrollProgressLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef       = useRef<HTMLDivElement>(null);
  const [trackH, setTrackH] = useState(0);

  // Track height for pixel-accurate dot positioning
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setTrackH(el.clientHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scroll tracking — covers entire time section is in viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 85, damping: 22, restDelta: 0.001 });

  // Dot top: 32px from top → (trackH - 32)px (stays within track)
  const dotY   = useTransform(smooth, [0, 1], [32, Math.max(32, trackH - 32)]);
  // Line fill height
  const lineH  = useTransform(smooth, [0, 1], [0, Math.max(0, trackH - 64)]);

  // GSAP: recurring comet flash on the filled bar
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    const comet = dot.querySelector<HTMLElement>(".comet");
    if (!comet) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });
    tl.fromTo(
      comet,
      { scaleY: 0, opacity: 0.9, transformOrigin: "bottom" },
      { scaleY: 1, opacity: 0, duration: 0.55, ease: "power2.out" }
    );
    return () => { tl.kill(); };
  }, []);

  return (
    // This div mirrors the section bounds so useScroll tracks correctly
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    >
      {/* ── vertical track column ─────────────────────────────────── */}
      <div className="absolute left-3 top-0 h-full lg:left-5">

        {/* bg track */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px bg-[#1e1a16]"
          style={{ top: 32, bottom: 32 }}
        />

        {/* gold filled track */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-px origin-top"
          style={{
            top: 32,
            height: lineH,
            background: "linear-gradient(to bottom, #d6a44b, #d6a44b50)",
          }}
        />

        {/* ── glowing dot ──────────────────────────────────────────── */}
        <motion.div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: dotY, marginTop: -5 }}
        >
          {/* GSAP comet tail — upward flash */}
          <div
            className="comet absolute left-1/2 -translate-x-1/2 w-px"
            style={{
              bottom: "50%",
              height: 40,
              background: "linear-gradient(to top, #d6a44b, transparent)",
              transformOrigin: "bottom",
            }}
          />

          {/* outer soft glow ring */}
          <motion.div
            className="absolute rounded-full bg-[#d6a44b]"
            style={{ width: 18, height: 18, left: -9, top: -9 }}
            animate={{ scale: [1, 2.2, 3], opacity: [0.55, 0.15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />

          {/* medium ring */}
          <motion.div
            className="absolute rounded-full bg-[#d6a44b]"
            style={{ width: 14, height: 14, left: -7, top: -7 }}
            animate={{ scale: [1, 1.8, 2.4], opacity: [0.4, 0.1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
          />

          {/* core dot */}
          <div
            className="relative rounded-full bg-[#d6a44b]"
            style={{
              width: 8,
              height: 8,
              marginLeft: -4,
              marginTop: -4,
              boxShadow: "0 0 12px 4px #d6a44b90, 0 0 5px 1px #d6a44b",
            }}
          />

          {/* inner bright core */}
          <div
            className="absolute rounded-full bg-[#fff7ea]"
            style={{ width: 3, height: 3, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
          />
        </motion.div>

        {/* start cap */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#2e2620]"
          style={{ width: 4, height: 4, top: 32, marginLeft: -2 }}
        />

        {/* end cap */}
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-[#2e2620]"
          style={{ width: 4, height: 4, bottom: 32, marginLeft: -2 }}
        />
      </div>
    </div>
  );
}
