"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Skill = { label: string; aksara: string; logo: string[] };

type OrbitDef = {
  speed: number;       // rad/s, positive = CW, negative = CCW
  variant: "light" | "dark" | "gold";
  chips: Skill[];
};

const ORBITS: OrbitDef[] = [
  {
    speed: 0.28, variant: "light",
    chips: [
      { label: "React",      aksara: "ꦫ", logo: ["/logo%20bahasa/react.svg"] },
      { label: "TypeScript", aksara: "ꦠ", logo: ["/logo%20bahasa/typescript.svg"] },
      { label: "Solidity",   aksara: "ꦱ", logo: ["/logo%20bahasa/solidity.svg"] },
      { label: "Wagmi",      aksara: "ꦮ", logo: ["/logo%20bahasa/wagmi.svg"] },
    ],
  },
  {
    speed: -0.16, variant: "dark",
    chips: [
      { label: "Next.js",    aksara: "ꦤ", logo: ["/logo%20bahasa/nextdotjs.svg"] },
      { label: "Tailwind",   aksara: "ꦕ", logo: ["/logo%20bahasa/tailwindcss.svg"] },
      { label: "Node.js",    aksara: "ꦤ", logo: ["/logo%20bahasa/nodedotjs.svg"] },
      { label: "Supabase",   aksara: "ꦱ", logo: ["/logo%20bahasa/supabase.svg"] },
      { label: "ethers.js",  aksara: "ꦲ", logo: ["/logo%20bahasa/ethers.svg"] },
      { label: "Python",     aksara: "ꦥ", logo: ["/logo%20bahasa/python.svg"] },
      { label: "Git",        aksara: "ꦒ", logo: ["/logo%20bahasa/git.svg"] },
      { label: "Figma",      aksara: "ꦥ", logo: ["/logo%20bahasa/figma.svg"] },
    ],
  },
  {
    speed: 0.10, variant: "gold",
    chips: [
      { label: "Express.js",  aksara: "ꦌ", logo: ["/logo%20bahasa/express.svg"] },
      { label: "SSMS / SQL",  aksara: "ꦢ", logo: ["/logo%20bahasa/microsoftsqlserver.svg"] },
      { label: "Kotlin",      aksara: "ꦏ", logo: ["/logo%20bahasa/kotlin.svg"] },
      { label: "GitHub",      aksara: "ꦓ", logo: ["/logo%20bahasa/github.svg"] },
      { label: "Vercel",      aksara: "ꦮ", logo: ["/logo%20bahasa/vercel.svg"] },
      { label: "VS Code",     aksara: "ꦏ", logo: ["/logo%20bahasa/vscode.svg"] },
      { label: "HTML / CSS",  aksara: "ꦲ", logo: ["/logo%20bahasa/html5.svg", "/logo%20bahasa/css.svg"] },
      { label: "Performance", aksara: "ꦱ", logo: ["/logo%20bahasa/lighthouse.svg"] },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const chipRefs    = useRef(new Map<string, HTMLDivElement>());
  const anglesRef   = useRef(new Map<string, number>());
  const rafRef      = useRef(0);
  const inViewRef   = useRef(false);
  const entryTimeRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [inView, setInView] = useState(false);
  const [dims, setDims]     = useState({ r1: 130, r2: 230, r3: 330 });

  /* ── window-close scroll transition ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const next = el.nextElementSibling as HTMLElement | null;
      if (!next) return;
      const vh = window.innerHeight;
      const rect = next.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / vh));

      el.style.clipPath = progress > 0 ? `inset(0 ${(progress * 100).toFixed(2)}% 0 0)` : "";
      el.style.pointerEvents = progress >= 1 ? "none" : "";

      if (progress < 1) {
        next.style.transform = `translateX(${((1 - progress) * 6).toFixed(2)}%)`;
      } else {
        next.style.transform = "";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      const next = sectionRef.current?.nextElementSibling as HTMLElement | null;
      if (next) next.style.transform = "";
      if (sectionRef.current) sectionRef.current.style.clipPath = "";
    };
  }, []);

  /* ── intersection + resize ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const recalc = () => {
      const { width, height } = el.getBoundingClientRect();
      const base = Math.min(width, height) * 0.78;
      setDims({ r1: base * 0.20, r2: base * 0.37, r3: base * 0.50 });
    };

    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.5 }
    );
    obs.observe(el);
    recalc();
    window.addEventListener("resize", recalc);
    return () => { obs.disconnect(); window.removeEventListener("resize", recalc); };
  }, []);

  /* ── sync inView to ref + record entry time ── */
  useEffect(() => {
    inViewRef.current = inView;
    if (inView) entryTimeRef.current = performance.now();
  }, [inView]);

  /* ── RAF animation loop ── */
  useEffect(() => {
    const radii = [dims.r1, dims.r2, dims.r3];

    // initialise starting angles evenly spread from top (-π/2)
    ORBITS.forEach((orbit, oi) => {
      orbit.chips.forEach((_, ci) => {
        const key = `${oi}-${ci}`;
        if (!anglesRef.current.has(key)) {
          anglesRef.current.set(
            key,
            -Math.PI / 2 + (2 * Math.PI / orbit.chips.length) * ci
          );
        }
      });
    });

    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const dt      = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      const visible = inViewRef.current;
      const elapsed = (now - entryTimeRef.current) / 1000;

      // burst radius: 0 → full over 2s (ease-out cubic)
      const burstT    = Math.min(1, elapsed / 2);
      const burstEase = 1 - Math.pow(1 - burstT, 3);

      // fast-spin entry: 20x at t=0, decays to 1x by ~7s
      const boost = visible ? 1 + 19 * Math.exp(-elapsed * 0.65) : 0;

      ORBITS.forEach((orbit, oi) => {
        const targetR   = radii[oi];
        const currentR  = visible ? targetR * burstEase : 0;

        orbit.chips.forEach((_, ci) => {
          const key   = `${oi}-${ci}`;
          const prev  = anglesRef.current.get(key) ?? 0;
          const angle = visible ? prev + orbit.speed * dt * boost : prev;
          anglesRef.current.set(key, angle);

          const el = chipRefs.current.get(key);
          if (!el) return;

          const x = Math.cos(angle) * currentR;
          const y = Math.sin(angle) * currentR;
          el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
          el.style.opacity   = visible ? "1" : "0";
        });
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dims]);

  return (
    <section
      ref={sectionRef}
      id="keahlian"
      className="sticky top-0 z-30 flex h-svh flex-col overflow-hidden bg-[#f5f0e8]"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#d6a44b]/30 to-transparent" />

      {/* top bar */}
      <div className="shrink-0 flex items-center justify-between border-b border-[#1a100a]/8 px-8 py-3.5 md:px-12">
        <p className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.28em] text-[#a73522]">
          <span className="h-px w-5 bg-[#a73522]/60" />
          ꦱ꧀ꦠꦏ꧀ · Stack & Alat
        </p>
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#1a100a]/25">03</p>
      </div>

      {/* orbit stage */}
      <div className="relative flex-1">

        {/* orbit ring guides */}
        {[dims.r1, dims.r2, dims.r3].map((r) => (
          <div
            key={r}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: r * 2, height: r * 2,
              marginLeft: -r, marginTop: -r,
              borderRadius: "50%",
              border: "1px dashed rgba(26,16,10,0.07)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* chips — all start at center, JS moves them */}
        {ORBITS.map((orbit, oi) =>
          orbit.chips.map((chip, ci) => (
            <div
              key={`${oi}-${ci}`}
              ref={(el) => { if (el) chipRefs.current.set(`${oi}-${ci}`, el); }}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <Chip chip={chip} variant={orbit.variant} />
            </div>
          ))
        )}

        {/* center title */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center select-none text-center">
          <div
            className="absolute rounded-full border border-[#1a100a]/8 bg-[#ede8e0]/60"
            style={{ width: dims.r1 * 1.5, height: dims.r1 * 1.5 }}
          />
          <div className="relative z-10 px-4">
            <p className="text-[8px] font-black uppercase tracking-[0.28em] text-[#a73522]">Stack & Alat</p>
            <h2
              className="mt-1 font-black uppercase leading-[0.84] text-[#1a100a]"
              style={{ fontSize: "clamp(1rem, 2vw, 2.2rem)" }}
            >
              Teknologi
            </h2>
            <p
              className="font-display text-[#a73522] leading-[0.9]"
              style={{ fontSize: "clamp(0.9rem, 1.8vw, 2rem)", fontStyle: "italic" }}
            >
              yang saya pakai.
            </p>
            <p className="mt-2 text-[7px] font-black uppercase tracking-[0.22em] text-[#1a100a]/28">
              20 teknologi
            </p>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="shrink-0 flex items-center justify-between border-t border-[#1a100a]/8 px-8 py-3.5 md:px-12">
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#7a6a58]">
          Frontend · Backend · Blockchain · Tools
        </p>
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#a73522]">
          ꦧꦼꦭꦲꦂ · Terus berkembang
        </p>
      </div>
    </section>
  );
}

function Chip({ chip, variant }: { chip: Skill; variant: "light" | "dark" | "gold" }) {
  const base = "flex items-center gap-2 border px-3 py-2 whitespace-nowrap shadow-sm";
  const v = {
    light: "border-[#1a100a]/14 bg-white/95 text-[#1a100a]",
    dark:  "border-[#f7efe0]/10 bg-[#1a100a] text-[#f7efe0] shadow-md",
    gold:  "border-[#d6a44b]/35 bg-[#fff7ea] text-[#1a100a]",
  };

  return (
    <div className={`${base} ${v[variant]}`}>
      <div className="flex items-center gap-1">
        {chip.logo.map((src) => (
          <Image
            key={src}
            src={src}
            alt=""
            width={15}
            height={15}
            unoptimized
            className={`h-[15px] w-[15px] object-contain ${variant === "dark" ? "brightness-[1.8] saturate-0" : ""}`}
          />
        ))}
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.1em]">{chip.label}</span>
      <span className="font-display text-[9px] opacity-25">{chip.aksara}</span>
    </div>
  );
}
