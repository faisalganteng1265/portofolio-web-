"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectList as projects } from "../data/projects";

// ── layout constants ─────────────────────────────────────────────────────────
const CARD_W   = 440;  // px  — landscape untuk screenshot landing page
const CARD_H   = 275;  // px
const CARD_GAP = 32;   // px gap between cards
const STEP     = CARD_W + CARD_GAP;
const PAD_L    = 80;
const PAD_R    = 320;

// Y offset per card (vh from top) — zigzag atas-bawah dengan variasi
const Y_VH = [8, 42, 12, 46, 6, 38,  8, 48, 10, 40,  4, 44, 8, 42];


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section  = sectionRef.current;
    const track    = trackRef.current;
    if (!section || !track) return;
    if (window.innerWidth < 768) {
      const state = { isLight: false };
      const setLightMode = (isLight: boolean) => {
        if (state.isLight === isLight) return;
        state.isLight = isLight;
        section.style.backgroundColor = isLight ? "#f5f0e8" : "#100d0a";
        if (headingRef.current) headingRef.current.style.color = isLight ? "#1a100a" : "#fff7ea";
        if (subRef.current) subRef.current.style.color = isLight ? "#7a6a58" : "#4b3f30";
      };

      const onScroll = () => {
        const rect = section.getBoundingClientRect();
        const triggerY = window.innerHeight * 0.32;
        setLightMode(rect.top < triggerY && rect.bottom > triggerY);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      onScroll();
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        section.style.backgroundColor = "#100d0a";
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const n = projects.length;
    const trackWidth = PAD_L + n * STEP + PAD_R;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const textPanels = textRefs.current.filter(Boolean) as HTMLDivElement[];
    const state = { cardIdx: -1, isLight: false, textVisible: false };

    const setLightMode = (isLight: boolean) => {
      if (state.isLight === isLight) return;
      state.isLight = isLight;

      gsap.to(section, {
        backgroundColor: isLight ? "#f5f0e8" : "#100d0a",
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(headingRef.current, {
        color: isLight ? "#1a100a" : "#fff7ea",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(subRef.current, {
        color: isLight ? "#7a6a58" : "#4b3f30",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(cards, {
        boxShadow: isLight
          ? "0 12px 56px rgba(0,0,0,0.22)"
          : "0 12px 48px rgba(0,0,0,0.35)",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(track, { x: window.innerWidth * 0.55, force3D: true });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const maxTranslate = Math.max(0, trackWidth - window.innerWidth);
          const entryT = Math.min(1, progress / 0.07);
          const entryEase = 1 - Math.pow(1 - entryT, 3);
          const entryOffset = (1 - entryEase) * window.innerWidth * 0.55;

          gsap.set(track, {
            x: -progress * maxTranslate + entryOffset,
            force3D: true,
          });

          const cardIdx = Math.min(n - 1, Math.floor(progress * n));
          if (state.cardIdx !== cardIdx) {
            state.cardIdx = cardIdx;
            if (counterRef.current) {
              counterRef.current.textContent = String(cardIdx + 1).padStart(2, "0");
            }
          }

          setLightMode(self.scroll() - self.start > window.innerHeight * 0.15);

          const textVisible = progress > 0.02;
          if (state.textVisible !== textVisible) {
            state.textVisible = textVisible;
            gsap.to(textPanels, {
              opacity: textVisible ? 1 : 0,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const trackWidth = PAD_L + projects.length * STEP + PAD_R;

  return (
    <section
      ref={sectionRef}
      id="karya"
      style={{
        backgroundColor: "#100d0a",
        transition: "background-color 0.75s cubic-bezier(0.4,0,0.2,1)",
      }}
    >

      {/* ── Header ── */}
      <div className="px-5 pt-20 pb-10 md:px-10 lg:pt-24">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.28em] text-[#d6a44b]">
            <span className="h-px w-8 bg-[#d6a44b]/60" />
            ꦥꦶꦭꦶꦃꦏꦂꦪ · Pilihan Karya
          </p>
          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2
              ref={headingRef}
              className="font-black leading-[0.92]"
              style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", color: "#fff7ea", transition: "color 0.25s ease" }}
            >
              Visual kuat,{" "}
              <span className="text-[#d6a44b]">tetap fungsional.</span>
            </h2>
            <div className="flex items-center gap-6">
              {/* live counter */}
              <div className="text-right">
                <span
                  ref={counterRef}
                  className="text-[2.5rem] font-black leading-none text-[#d6a44b] tabular-nums"
                >
                  01
                </span>
                <span className="text-[1rem] font-black text-[#4b3f30]">
                  /{String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <p
                ref={subRef}
                className="max-w-[26ch] text-sm font-medium leading-6"
                style={{ color: "#4b3f30", transition: "color 0.25s ease" }}
              >
                <span className="md:hidden">{projects.length} proyek dalam stack cepat dibaca.</span>
                <span className="hidden md:inline">Scroll — {projects.length} proyek meluncur ke kanan, atas-bawah.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile stacked gallery ── */}
      <div className="px-5 pb-16 md:hidden">
        <div className="mb-5 flex items-center justify-between border-y border-[#f7efe0]/8 py-3">
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#d6a44b]">
            Scroll Stack
          </p>
          <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#4b3f30]">
            {projects.length} shipped
          </p>
        </div>

        <div className="pb-[36svh]">
          {projects.map((project, i) => {
            const stack = project.tags.includes("Web3")
              ? "Web3"
              : project.tags.includes("Web2")
                ? "Web2"
                : "Project";
            const isWeb3 = stack === "Web3";

            return (
              <article
                key={project.title}
                className="reveal group sticky mb-7 overflow-hidden border border-[#f7efe0]/10 bg-[#130f0b] shadow-[0_18px_56px_rgba(0,0,0,0.34)]"
                style={{
                  top: `calc(4.75rem + ${Math.min(i, 4) * 6}px)`,
                  zIndex: 10 + i,
                }}
              >
                <div className="relative aspect-[1.25/1] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:blur-sm"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#130f0b] via-[#130f0b]/10 to-transparent" />
                  <span className="absolute left-4 top-4 border border-[#d6a44b]/35 bg-[#100d0a]/70 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.18em] text-[#d6a44b] backdrop-blur-sm">
                    {project.num}
                  </span>
                  <span
                    className="absolute right-4 top-4 border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.18em] backdrop-blur-sm"
                    style={{
                      borderColor: isWeb3 ? "#d6a44b55" : "#a7352255",
                      background: isWeb3 ? "#d6a44b18" : "#a7352218",
                      color: isWeb3 ? "#d6a44b" : "#a73522",
                    }}
                  >
                    {stack}
                  </span>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <p className="text-center text-sm font-semibold leading-snug text-white">
                      {project.description}
                    </p>
                    <span className="border border-white/40 px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-white/80">
                      Lihat Project →
                    </span>
                  </a>
                </div>

                <div className="relative p-5">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#a73522]">
                    {project.type}
                  </p>
                  <h3 className="mt-2 text-2xl font-black leading-none text-[#fff7ea]">
                    {project.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#f7efe0]/10 bg-[#f7efe0]/[0.03] px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#8d8170]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Scroll-driven horizontal gallery ── */}
      <div className="hidden md:block" style={{ height: `${Math.max(300, projects.length * 90)}vh` }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>
          {/* horizontal track */}
          <div
            ref={trackRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${trackWidth}px`,
              willChange: "transform",
            }}
          >
            {projects.map((project, i) => {
              const yVh = Y_VH[i % Y_VH.length];
              return (
                <div
                  key={project.title}
                  style={{
                    position: "absolute",
                    left: `${PAD_L + i * STEP}px`,
                    top: `${yVh}vh`,
                  }}
                  className="group"
                >
                  {/* card image */}
                  <div
                    ref={(el) => { cardRefs.current[i] = el; }}
                    style={{
                      width: `${CARD_W}px`,
                      height: `${CARD_H}px`,
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 12px 48px rgba(0,0,0,0.35)",
                      position: "relative",
                    }}
                    className="bg-[#130f0b]"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="440px"
                      className="object-cover transition-all duration-500 group-hover:scale-[1.04] group-hover:blur-sm"
                      priority={i < 3}
                    />
                    {project.featured && (
                      <div className="absolute left-4 top-4 border border-[#a73522]/50 bg-[#a73522]/15 px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#a73522]">
                        Featured
                      </div>
                    )}
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <p className="text-center text-sm font-semibold leading-snug text-white">
                        {project.description}
                      </p>
                      <span className="border border-white/40 px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-white/80">
                        Lihat Project →
                      </span>
                    </a>
                  </div>

                  {/* ── teks di kanan card ── */}
                <div
                  ref={(el) => { textRefs.current[i] = el; }}
                  style={{
                    position: "absolute",
                    left: CARD_W + 24,
                    top: 0,
                    width: 220,
                    height: CARD_H,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 8,
                    opacity: 0,
                    transition: "opacity 0.6s ease",
                  }}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#a73522]">
                    {project.num}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d6a44b]">
                    {project.type}
                  </span>
                  <h3 className="font-black leading-[1.1] text-[#1a100a]" style={{ fontSize: "1.25rem" }}>
                    {project.title}
                  </h3>
                  <div
                    className="h-px w-10 opacity-40"
                    style={{ background: project.accent }}
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase tracking-[0.12em] text-[#7a6a58]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {(() => {
                    const stack = project.tags.includes("Web3") ? "Web3" : project.tags.includes("Web2") ? "Web2" : null;
                    if (!stack) return null;
                    const isWeb3 = stack === "Web3";
                    return (
                      <span
                        className="mt-1 text-[1.6rem] font-black uppercase tracking-[0.06em]"
                        style={{ color: isWeb3 ? "#d6a44b" : "#a73522" }}
                      >
                        {stack}
                      </span>
                    );
                  })()}
                </div>
                </div>
              );
            })}
          </div>

          {/* ── decorative floating texts ── */}

          {/* big faded word — bottom left */}
          <p
            className="pointer-events-none absolute bottom-0 left-6 select-none font-black uppercase leading-none text-[#1a100a]"
            style={{ fontSize: "clamp(5rem,9vw,10rem)", opacity: 0.045 }}
            aria-hidden="true"
          >
            Karya
          </p>

          {/* "every project" — top center */}
          <p className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none text-[9px] font-black uppercase tracking-[0.35em] text-[#1a100a]/30" aria-hidden="true">
            Every&nbsp;Project&nbsp;·&nbsp;Setiap&nbsp;Karya
          </p>

          {/* vertical label — far left */}
          <p
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 select-none text-[8px] font-black uppercase tracking-[0.28em] text-[#1a100a]/20"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            aria-hidden="true"
          >
            Frontend&nbsp;·&nbsp;Indonesia&nbsp;·&nbsp;2026
          </p>

          {/* quote — bottom center */}
          <p className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 select-none text-center text-[10px] font-black italic text-[#1a100a]/25" aria-hidden="true">
            &ldquo;Dibangun dengan rasa, bukan hanya fungsi.&rdquo;
          </p>

          {/* scroll hint arrow */}
          <div className="pointer-events-none absolute bottom-8 right-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.22em] text-[#d6a44b]/50">
            <span>scroll</span>
            <span className="animate-pulse">→</span>
          </div>
        </div>
      </div>

      {/* ── Bottom strip ── */}
      <div className="bg-[#f5f0e8] px-8 py-10 md:flex md:items-center md:justify-between">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#a73522]">
            ꦠꦩ꧀ꦧꦃꦭꦒꦶ · Masih ada lagi
          </p>
          <p className="mt-1 text-sm font-medium text-[#7a6a58]">
            Lebih banyak proyek sedang dikerjakan.
          </p>
        </div>
        <a
          className="mt-4 inline-flex items-center gap-2 border border-[#1a100a]/14 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a100a] transition-colors hover:border-[#d6a44b]/50 hover:text-[#d6a44b] md:mt-0"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
