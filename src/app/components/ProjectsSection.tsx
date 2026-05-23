"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { projectList as projects } from "../data/projects";

// ── layout constants ─────────────────────────────────────────────────────────
const CARD_W   = 440;  // px  — landscape untuk screenshot landing page
const CARD_H   = 275;  // px
const CARD_GAP = 32;   // px gap between cards
const STEP     = CARD_W + CARD_GAP;
const PAD_L    = 80;
const PAD_R    = 120;

// Y offset per card (vh from top) — zigzag atas-bawah dengan variasi
const Y_VH = [8, 42, 12, 46, 6, 38, 16, 48, 10, 40, 18, 44, 8];


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section  = sectionRef.current;
    const track    = trackRef.current;
    if (!section || !track) return;

    const n = projects.length;

    function onScroll() {
      const wh  = window.innerHeight;
      const ww  = window.innerWidth;
      const top = section!.getBoundingClientRect().top;
      const scrollInSection = -top;
      const totalSectionScroll = section!.offsetHeight - wh;

      const rawProgress  = scrollInSection / totalSectionScroll;
      const progress     = Math.max(0, Math.min(1, rawProgress));

      // ── horizontal track movement ─────────────────────────────────────────
      const trackWidth   = PAD_L + n * STEP + PAD_R;
      const maxTranslate = Math.max(0, trackWidth - ww);
      track.style.transform = `translateX(${-progress * maxTranslate}px)`;

      // ── current card counter ──────────────────────────────────────────────
      const cardIdx = Math.min(n - 1, Math.floor(progress * n));
      if (counterRef.current) {
        counterRef.current.textContent = String(cardIdx + 1).padStart(2, "0");
      }

      // ── bg: putih saat masuk section, tetap putih setelah selesai ──────────
      const isLight = scrollInSection > wh * 0.15;

      section.style.backgroundColor = isLight ? "#f5f0e8" : "#100d0a";

      const heading = section!.querySelector<HTMLElement>("[data-heading]");
      const sub     = section!.querySelector<HTMLElement>("[data-sub]");
      if (heading) {
        heading.style.color      = isLight ? "#1a100a" : "#fff7ea";
        heading.style.transition = "color 0.6s ease";
      }
      if (sub) {
        sub.style.color      = isLight ? "#7a6a58" : "#4b3f30";
        sub.style.transition = "color 0.6s ease";
      }

      const cards = track.querySelectorAll<HTMLElement>("[data-card]");
      cards.forEach((card) => {
        card.style.boxShadow = isLight
          ? "0 12px 56px rgba(0,0,0,0.22)"
          : "0 12px 48px rgba(0,0,0,0.35)";
      });

      // teks muncul saat scroll gallery mulai
      const textPanels = track.querySelectorAll<HTMLElement>("[data-card-text]");
      const textOpacity = progress > 0.02 ? 1 : 0;
      textPanels.forEach((el) => { el.style.opacity = String(textOpacity); });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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
              data-heading
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
                data-sub
                className="max-w-[26ch] text-sm font-medium leading-6"
                style={{ color: "#4b3f30", transition: "color 0.25s ease" }}
              >
                Scroll — {projects.length} proyek meluncur ke kanan, atas-bawah.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll-driven horizontal gallery ── */}
      <div style={{ height: `${Math.max(300, projects.length * 90)}vh` }}>
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
                    data-card
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
                      className="object-cover transition-all duration-500 group-hover:scale-[1.04]"
                      priority={i < 3}
                    />
                    {project.featured && (
                      <div className="absolute left-4 top-4 border border-[#a73522]/50 bg-[#a73522]/15 px-2 py-0.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#a73522]">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* ── teks di kanan card ── */}
                <div
                  data-card-text
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
                  <a
                    href={project.href ?? "#"}
                    className="mt-1 inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#1a100a]/30 transition-colors hover:text-[#d6a44b]"
                  >
                    Lihat <span aria-hidden="true">→</span>
                  </a>
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
            "Dibangun dengan rasa, bukan hanya fungsi."
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
