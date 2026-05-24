"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";

// ── constants ─────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "ꦗ  Juara 1 — Web Design Competition UTI",
  "ꦤ  Juara 3 — Hackathon Base Indonesia",
  "ꦒ  Top 50 Global — Base Build Hackathon",
  "ꦭ  Most Favorite — Lisk Builder Program 2",
];

const LINE_PAD       = 72;   // px — line inset from section top/bottom
const PART_THRESHOLD = 360;  // px — radius where cards start parting
const MAX_SHIFT      = 56;   // px — max horizontal card shift

// ── component ─────────────────────────────────────────────────────────────────
export default function AchievementsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dotRef      = useRef<HTMLDivElement>(null);
  const sectionHRef = useRef(2400);

  // ── per-row refs (3 rows: achievement A, achievement B, bootcamp) ──────────
  const row0 = useRef<HTMLDivElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);

  const left0 = useRef<HTMLDivElement>(null);
  const left1 = useRef<HTMLDivElement>(null);
  const left2 = useRef<HTMLDivElement>(null);

  const right0 = useRef<HTMLDivElement>(null);
  const right1 = useRef<HTMLDivElement>(null);
  const right2 = useRef<HTMLDivElement>(null);

  const ms0 = useRef<HTMLDivElement>(null); // milestone dots
  const ms1 = useRef<HTMLDivElement>(null);
  const ms2 = useRef<HTMLDivElement>(null);

  const rowRefs   = useMemo(() => [row0,   row1,   row2],   []);
  const leftRefs  = useMemo(() => [left0,  left1,  left2],  []);
  const rightRefs = useMemo(() => [right0, right1, right2], []);
  const msRefs    = useMemo(() => [ms0,    ms1,    ms2],    []);

  // ── row center Y positions (document-relative → section-relative px) ────────
  const rowCenterYsRef = useRef<number[]>([99999, 99999, 99999]);

  const computeRowCenters = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionDocTop = section.getBoundingClientRect().top + window.scrollY;
    rowRefs.forEach((rRef, i) => {
      const el = rRef.current;
      if (!el) return;
      const elDocTop = el.getBoundingClientRect().top + window.scrollY;
      rowCenterYsRef.current[i] = elDocTop - sectionDocTop + el.offsetHeight / 2;
    });
  }, [rowRefs]);

  // ── section height tracking ───────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    sectionHRef.current = el.offsetHeight;
    const ro = new ResizeObserver(() => {
      sectionHRef.current = el.offsetHeight;
      computeRowCenters();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [computeRowCenters]);

  useEffect(() => {
    const t = setTimeout(computeRowCenters, 300);
    window.addEventListener("resize", computeRowCenters);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", computeRowCenters);
    };
  }, [computeRowCenters]);

  // ── scroll tracking ────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 78, damping: 21, restDelta: 0.001 });

  // ── dot Y MotionValue (px from section top) ────────────────────────────────
  const dotYMV  = useMotionValue(LINE_PAD);
  const filledH = useTransform(dotYMV, v => Math.max(0, v - LINE_PAD));

  // ── main animation loop ────────────────────────────────────────────────────
  useMotionValueEvent(smooth, "change", (progress) => {
    const sH  = sectionHRef.current;
    const dot = LINE_PAD + progress * (sH - 2 * LINE_PAD);
    dotYMV.set(dot);

    const isDesktop = window.innerWidth >= 1024;

    rowRefs.forEach((_, i) => {
      const rowCenter = rowCenterYsRef.current[i];
      const dist      = Math.abs(dot - rowCenter);
      const prox      = Math.max(0, 1 - dist / PART_THRESHOLD);

      const lEl  = leftRefs[i].current;
      const rEl  = rightRefs[i].current;
      const msEl = msRefs[i].current;

      if (lEl) {
        gsap.to(lEl, {
          ...(isDesktop ? { x: -prox * MAX_SHIFT } : {}),
          opacity: 0.32 + prox * 0.68,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (rEl) {
        gsap.to(rEl, {
          ...(isDesktop ? { x: prox * MAX_SHIFT } : {}),
          opacity: 0.32 + prox * 0.68,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        });
      }

      if (msEl) {
        gsap.to(msEl, {
          scale:   1 + prox * 1.2,
          opacity: 0.18 + prox * 0.82,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  });

  // ── GSAP comet flash on dot ────────────────────────────────────────────────
  useEffect(() => {
    const comet = dotRef.current?.querySelector<HTMLElement>(".comet");
    if (!comet) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.8 });
    tl.fromTo(comet,
      { scaleY: 0, opacity: 0.9, transformOrigin: "bottom" },
      { scaleY: 1, opacity: 0,   duration: 0.55, ease: "power2.out" }
    );
    return () => { tl.kill(); };
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="perjalanan"
      className="relative z-20 overflow-hidden bg-[#0e0c0a]"
      style={{ boxShadow: "0 -12px 48px rgba(0,0,0,0.28)", borderRadius: "28px 28px 0 0" }}
    >
      {/* bg aksara watermark */}
      <p
        className="pointer-events-none absolute -right-10 top-16 select-none font-black leading-none text-[#d6a44b] opacity-[0.028]"
        style={{ fontSize: "30vw" }}
        aria-hidden
      >
        ꦥ
      </p>

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="reveal flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
              <span className="h-px w-6 bg-[#d6a44b]/60" />
              04 · Karya & Capaian
            </p>
            <h2
              className="reveal mt-5 font-black leading-[0.9]"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
            >
              Dari layar,
              <br />
              <span className="font-display italic" style={{ color: "#d6a44b" }}>
                ke panggung.
              </span>
            </h2>
          </div>
          <div className="reveal flex gap-12 lg:flex-col lg:items-end lg:gap-5">
            {[["4", "Penghargaan"], ["2", "Bootcamp"]].map(([n, l]) => (
              <div key={l} className="lg:text-right">
                <p className="text-[2.6rem] font-black leading-none text-[#d6a44b]">{n}</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#4b3f30]">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── MARQUEE ─────────────────────────────────────────────────────── */}
        <div className="mb-16 overflow-hidden border-y border-[#f7efe0]/6 py-4">
          <div className="marquee-track flex items-center">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="mx-14 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.26em] text-[#3b3028]"
              >
                <span className="mr-4 text-[#d6a44b]/40">ꦱ</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── TIMELINE GRID ───────────────────────────────────────────────── */}
        <div ref={timelineRef} className="relative">

          {/* center line + dot — desktop only ─────────────────────────────── */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>

            {/* bg track */}
            <div
              className="absolute left-1/2 w-px -translate-x-1/2 bg-[#1e1a16]"
              style={{ top: LINE_PAD, bottom: LINE_PAD }}
            />

            {/* gold filled portion */}
            <motion.div
              className="absolute left-1/2 w-px -translate-x-1/2 origin-top"
              style={{
                top: LINE_PAD,
                height: filledH,
                background: "linear-gradient(to bottom, #d6a44b, #d6a44b55)",
              }}
            />

            {/* glowing dot */}
            <motion.div
              ref={dotRef}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: dotYMV, marginTop: -5 }}
            >
              {/* GSAP comet tail */}
              <div
                className="comet absolute left-1/2 w-px -translate-x-1/2"
                style={{
                  bottom: "50%",
                  height: 52,
                  background: "linear-gradient(to top, #d6a44b, transparent)",
                  transformOrigin: "bottom",
                }}
              />

              {/* outer glow pulse */}
              <motion.div
                className="absolute rounded-full bg-[#d6a44b]"
                style={{ width: 22, height: 22, left: -11, top: -11 }}
                animate={{ scale: [1, 2.6, 3.4], opacity: [0.5, 0.12, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              {/* mid ring */}
              <motion.div
                className="absolute rounded-full bg-[#d6a44b]"
                style={{ width: 14, height: 14, left: -7, top: -7 }}
                animate={{ scale: [1, 1.9, 2.5], opacity: [0.4, 0.1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.38 }}
              />

              {/* core dot */}
              <div
                className="relative rounded-full bg-[#d6a44b]"
                style={{
                  width: 8,
                  height: 8,
                  marginLeft: -4,
                  marginTop: -4,
                  boxShadow: "0 0 16px 6px #d6a44b80, 0 0 5px 1px #d6a44b",
                }}
              />
              {/* inner bright */}
              <div
                className="absolute rounded-full bg-[#fff7ea]"
                style={{ width: 3, height: 3, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
              />
            </motion.div>
          </div>

          {/* ── ROW 0 — Top 50 Global + Juara 1 ────────────────────────── */}
          <div
            ref={row0}
            className="mb-4 grid items-center gap-3 lg:grid-cols-[1fr_56px_1fr]"
          >
            {/* LEFT: Top 50 Global */}
            <div ref={left0} style={{ opacity: 0.32 }}>
              <div
                className="group relative overflow-hidden border border-[#f7efe0]/8"
                style={{ minHeight: "400px", background: "#0d0b09" }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/achievement/baseproject.png"
                    alt="Base Build Hackathon Global"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover opacity-[0.28] saturate-[0.4] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-[0.80] group-hover:saturate-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/60 to-transparent" />
                </div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#d6a44b] via-[#d6a44b]/40 to-transparent" />
                <div
                  className="relative flex h-full flex-col justify-between p-8 md:p-10 transition-all duration-500 group-hover:blur-sm"
                  style={{ minHeight: "400px" }}
                >
                  <div className="flex items-start justify-between">
                    <span className="border border-[#d6a44b]/35 bg-[#1e1508]/80 px-3.5 py-1.5 text-[8px] font-black uppercase tracking-[0.22em] text-[#d6a44b] backdrop-blur-sm">
                      2025 · Base Build Hackathon
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#4b3f30]">
                      Base · Coinbase
                    </span>
                  </div>
                  <div>
                    <p className="font-black leading-none text-[#d6a44b]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>Top</p>
                    <p className="font-black leading-[0.82] text-[#fff7ea]" style={{ fontSize: "clamp(5rem, 13vw, 10rem)" }}>50</p>
                    <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-base font-black text-[#c9b99d]">Winner · Global Competition</p>
                        <p className="mt-1 max-w-[36ch] text-xs font-medium leading-6 text-[#5a4f40]">
                          Salah satu dari 50 tim terbaik di hackathon global Base yang diselenggarakan oleh Coinbase.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {["Web3", "Blockchain", "Global"].map(t => (
                          <span key={t} className="border border-[#d6a44b]/20 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.16em] text-[#d6a44b]/55">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: milestone dot 0 */}
            <div className="hidden items-center justify-center lg:flex">
              <div ref={ms0} style={{ opacity: 0.18 }}>
                <div
                  className="h-3 w-3 rounded-full bg-[#d6a44b]"
                  style={{ boxShadow: "0 0 10px 4px #d6a44b55" }}
                />
              </div>
            </div>

            {/* RIGHT: Juara 1 */}
            <div ref={right0} style={{ opacity: 0.32 }}>
              <div
                className="group relative overflow-hidden border border-[#f7efe0]/8"
                style={{ minHeight: "400px", background: "#100e0c" }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/achievement/web2.png"
                    alt="Web Design Competition UTI"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover opacity-[0.28] saturate-[0.4] transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-[0.80] group-hover:saturate-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c] via-[#100e0c]/55 to-transparent" />
                </div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#d6a44b]/70 to-transparent" />
                <div
                  className="relative flex h-full flex-col justify-between p-8 md:p-10 transition-all duration-500 group-hover:blur-sm"
                  style={{ minHeight: "400px" }}
                >
                  <div className="flex items-start justify-between">
                    <span className="border border-[#d6a44b]/25 bg-[#100e0c]/70 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#d6a44b]/70 backdrop-blur-sm">
                      Juara 1 · Pertama
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-[0.18em] text-[#3b3028]">2025</span>
                  </div>
                  <div>
                    <p className="font-black leading-none text-[#d6a44b]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>Juara</p>
                    <p className="font-black leading-[0.82] text-[#fff7ea]" style={{ fontSize: "clamp(5rem, 13vw, 10rem)" }}>1</p>
                    <p className="mt-2 text-xl font-black leading-[1.12] text-[#c9b99d]">Web Design Competition</p>
                    <p className="mt-1.5 text-[10px] font-medium text-[#5a4f40]">Universitas Teknokrat Indonesia</p>
                    <span className="mt-3 inline-block border border-[#f7efe0]/10 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]">Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 1 — Juara 3 + Most Favorite ────────────────────────── */}
          <div
            ref={row1}
            className="mb-4 grid items-center gap-3 lg:grid-cols-[1fr_56px_1fr]"
          >
            {/* LEFT: Juara 3 */}
            <div ref={left1} style={{ opacity: 0.32 }}>
              <div
                className="group relative overflow-hidden border border-[#f7efe0]/8"
                style={{ minHeight: "340px", background: "#0d0b09" }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/achievement/baseindo.png"
                    alt="Hackathon Base Indonesia"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover opacity-[0.22] saturate-[0.35] transition-all duration-700 group-hover:scale-[1.05] group-hover:opacity-[0.80] group-hover:saturate-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/55 to-transparent" />
                </div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#a73522]/80 to-transparent" />
                <div
                  className="relative flex h-full flex-col justify-between p-7 md:p-9 transition-all duration-500 group-hover:blur-sm"
                  style={{ minHeight: "340px" }}
                >
                  <div className="flex items-start justify-between">
                    <span className="border border-[#a73522]/30 bg-[#0d0b09]/70 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#a73522]/75 backdrop-blur-sm">
                      Juara 3 · Ketiga
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-[0.18em] text-[#3b3028]">2025</span>
                  </div>
                  <div>
                    <p className="font-black leading-none text-[#a73522]" style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}>Juara</p>
                    <p className="font-black leading-[0.82] text-[#fff7ea]" style={{ fontSize: "clamp(4.5rem, 11vw, 9rem)" }}>3</p>
                    <p className="mt-2 text-lg font-black leading-[1.12] text-[#c9b99d]">Hackathon Base Indonesia</p>
                    <p className="mt-1.5 text-[10px] font-medium text-[#5a4f40]">Base Indonesia Community</p>
                    <div className="mt-3 flex gap-1.5">
                      {["Blockchain", "Web3"].map(t => (
                        <span key={t} className="border border-[#f7efe0]/10 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: milestone dot 1 */}
            <div className="hidden items-center justify-center lg:flex">
              <div ref={ms1} style={{ opacity: 0.18 }}>
                <div
                  className="h-3 w-3 rounded-full bg-[#a73522]"
                  style={{ boxShadow: "0 0 10px 4px #a7352255" }}
                />
              </div>
            </div>

            {/* RIGHT: Most Favorite */}
            <div ref={right1} style={{ opacity: 0.32 }}>
              <div
                className="group relative overflow-hidden border border-[#f7efe0]/8"
                style={{ minHeight: "340px", background: "#0c0a08" }}
              >
                <div className="absolute inset-0">
                  <Image
                    src="/achievement/lisk.png"
                    alt="Lisk Builder Program 2"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover object-top opacity-[0.28] saturate-[0.35] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-[0.80] group-hover:saturate-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-[#0c0a08]/55 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/60 via-transparent to-[#0c0a08]/30" />
                </div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#a73522] via-[#a73522]/40 to-transparent" />
                <div
                  className="relative flex h-full flex-col justify-between p-7 md:p-9 transition-all duration-500 group-hover:blur-sm"
                  style={{ minHeight: "340px" }}
                >
                  <span className="inline-block border border-[#a73522]/30 bg-[#150606]/70 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.22em] text-[#a73522]/80">
                    Most Favorite Project
                  </span>
                  <div>
                    <p className="font-black leading-[1.05] text-[#fff7ea]" style={{ fontSize: "clamp(1.6rem, 3.8vw, 3rem)" }}>
                      Lisk Builder<br />Program 2
                    </p>
                    <p className="mt-2 text-sm font-medium text-[#5a4f40]">
                      Dipilih sebagai proyek paling disukai komunitas · Lisk · 2025
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Community Choice", "Lisk L2", "Blockchain"].map(t => (
                        <span key={t} className="border border-[#f7efe0]/10 bg-[#f7efe0]/4 px-3.5 py-1.5 text-[7px] font-black uppercase tracking-[0.16em] text-[#3b3028]">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bootcamp sub-header ──────────────────────────────────────── */}
          <div className="my-12 lg:grid lg:grid-cols-[1fr_56px_1fr] lg:items-end">
            <div className="border-b border-[#f7efe0]/8 pb-6">
              <p className="reveal flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
                <span className="h-px w-6 bg-[#d6a44b]/60" />
                Bootcamp · Pendidikan
              </p>
              <h3 className="reveal mt-4 font-black leading-[1.1]" style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}>
                Dua program intensif
                <br />
                <span style={{ color: "rgba(247,239,224,0.35)" }}>di Yogyakarta.</span>
              </h3>
            </div>
            {/* center spacer (keeps line visible through sub-header) */}
            <div className="hidden lg:block" />
            <div className="hidden items-end justify-end border-b border-[#f7efe0]/8 pb-6 lg:flex">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3b3028]">2025 · Jogja</p>
            </div>
          </div>

          {/* ── ROW 2 — Bootcamp ────────────────────────────────────────── */}
          <div
            ref={row2}
            className="grid items-start gap-3 lg:grid-cols-[1fr_56px_1fr]"
          >
            {/* LEFT: Base Indonesia Workshop */}
            <div ref={left2} style={{ opacity: 0.32 }}>
              <div className="group overflow-hidden border border-[#f7efe0]/8" style={{ background: "#100e0c" }}>
                <div className="relative overflow-hidden" style={{ height: "240px" }}>
                  <Image
                    src="/achievement/basework.png"
                    alt="Base Indonesia Workshop Batch 2"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover opacity-[0.38] saturate-[0.4] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-[0.82] group-hover:saturate-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c] via-[#100e0c]/30 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="border border-[#d6a44b]/35 bg-[#100e0c]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#d6a44b]/80 backdrop-blur-sm">Batch 2</span>
                    <span className="border border-[#f7efe0]/12 bg-[#100e0c]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#6b5f4f] backdrop-blur-sm">Workshop</span>
                  </div>
                  <p className="pointer-events-none absolute bottom-4 right-5 select-none font-black text-[#d6a44b] opacity-[0.15]" style={{ fontSize: "5rem" }} aria-hidden>ꦧ</p>
                </div>
                <div className="p-6 lg:p-7 transition-all duration-500 group-hover:blur-sm">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#d6a44b]/60">September – Oktober 2025</p>
                  <h3 className="mt-2 text-2xl font-black text-[#fff7ea]">Base Indonesia</h3>
                  <p className="mt-1.5 text-sm font-medium leading-6 text-[#5a4f40]">
                    Workshop intensif Web3 di Jogja bersama komunitas Base Indonesia, mengeksplorasi pengembangan smart contract dan ekosistem Layer 2.
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {["Web3", "Smart Contract", "Base L2"].map(t => (
                        <span key={t} className="border border-[#f7efe0]/10 bg-[#f7efe0]/4 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]">{t}</span>
                      ))}
                    </div>
                    <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.18em] text-[#2e2620]">ꦗꦒꦗ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER: milestone dot 2 */}
            <div className="hidden items-start justify-center pt-28 lg:flex">
              <div ref={ms2} style={{ opacity: 0.18 }}>
                <div
                  className="h-3 w-3 rounded-full bg-[#d6a44b]"
                  style={{ boxShadow: "0 0 10px 4px #d6a44b55" }}
                />
              </div>
            </div>

            {/* RIGHT: Dev Web3 Jogja */}
            <div ref={right2} style={{ opacity: 0.32 }}>
              <div className="group overflow-hidden border border-[#f7efe0]/8" style={{ background: "#0d0b09" }}>
                <div className="relative overflow-hidden" style={{ height: "240px" }}>
                  <Image
                    src="/achievement/devweb3.png"
                    alt="Dev Web3 Jogja Batch 5"
                    fill
                    sizes="(min-width: 1024px) 45vw, 90vw"
                    className="object-cover opacity-[0.38] saturate-[0.4] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-[0.82] group-hover:saturate-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/30 to-transparent" />
                  <div className="absolute left-5 top-5 flex gap-2">
                    <span className="border border-[#d6a44b]/35 bg-[#0d0b09]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#d6a44b]/80 backdrop-blur-sm">Batch 5</span>
                    <span className="border border-[#f7efe0]/12 bg-[#0d0b09]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#6b5f4f] backdrop-blur-sm">Bootcamp</span>
                  </div>
                  <p className="pointer-events-none absolute bottom-4 right-5 select-none font-black text-[#d6a44b] opacity-[0.15]" style={{ fontSize: "5rem" }} aria-hidden>ꦮ</p>
                </div>
                <div className="p-6 lg:p-7 transition-all duration-500 group-hover:blur-sm">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#d6a44b]/60">November – Desember 2025</p>
                  <h3 className="mt-2 text-2xl font-black text-[#fff7ea]">Dev Web3 Jogja</h3>
                  <p className="mt-1.5 text-sm font-medium leading-6 text-[#5a4f40]">
                    Bootcamp full-stack Web3 di Yogyakarta, membangun aplikasi terdesentralisasi dari dasar hingga deployment ke mainnet.
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {["DeFi", "Solidity", "dApp"].map(t => (
                        <span key={t} className="border border-[#f7efe0]/10 bg-[#f7efe0]/4 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]">{t}</span>
                      ))}
                    </div>
                    <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.18em] text-[#2e2620]">ꦗꦒꦗ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>{/* /timeline grid */}
      </div>
    </section>
  );
}
