"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import AboutLanyard from "./AboutLanyard";

type DelayStyle = CSSProperties & { "--about-delay"?: string };

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tentang"
      data-about-in={inView ? "" : undefined}
      className="relative overflow-hidden bg-[#100d0a]"
      style={{ minHeight: "100svh" }}
    >
      {/* top metadata bar */}
      <div className="about-reveal-sub flex items-center justify-between border-b border-[#f7efe0]/8 px-8 py-4 md:px-12" style={{ "--about-delay": "0ms" } as DelayStyle}>
        <p className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#d6a44b]">
          <span className="h-px w-6 bg-[#d6a44b]/50" />
          Tentang Saya
        </p>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#f7efe0]/25">02 · Profile</p>
      </div>

      {/* main grid — full bleed, no max-w */}
      <div className="flex flex-col lg:grid lg:h-[calc(100svh-49px)]" style={{ gridTemplateColumns: "40% 1fr" }}>

        {/* ── LEFT: image + lanyard ── */}
        <div className="relative border-r border-[#f7efe0]/8">
          <div className="relative h-full min-h-[520px] overflow-hidden">
            <div className="absolute inset-0 border-[1.5px] border-[#d6a44b]/22 z-10 pointer-events-none" />
            <div className="absolute inset-3 border border-[#d6a44b]/14 z-10 pointer-events-none" />
            <Image
              src="/assets/wayang-kulit.jpg"
              alt="Wayang Kulit"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-45 saturate-[0.5]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100d0a]/88 via-[#100d0a]/34 to-[#100d0a]/52" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#100d0a]/36 via-transparent to-[#100d0a]/26" />
            <p
              className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-black text-[#d6a44b] opacity-[0.07]"
              style={{ fontSize: "clamp(10rem,20vw,18rem)" }}
              aria-hidden="true"
            >ꦄ</p>
            <AboutLanyard />
          </div>
        </div>

        {/* ── RIGHT: editorial text layout ── */}
        <div className="relative flex flex-col overflow-hidden">

          {/* giant faded "02" background */}
          <p className="about-bg-num pointer-events-none absolute -right-8 -top-10 select-none font-black leading-none text-[#f7efe0]" style={{ fontSize: "32vw" }} aria-hidden="true">02</p>

          {/* vertical accent — far right */}
          <p className="about-reveal pointer-events-none absolute bottom-20 right-5 hidden select-none text-[7px] font-black uppercase tracking-[0.3em] text-[#f7efe0]/12 lg:block" style={{ writingMode: "vertical-rl", "--about-delay": "600ms" } as DelayStyle} aria-hidden="true">Interface · With · Rasa</p>

          {/* ── HEADING — each line animates independently ── */}
          <div className="overflow-hidden px-10 pt-10 lg:px-14 lg:pt-14">
            <h2 className="font-black uppercase leading-[0.85]">
              <span
                className="about-reveal-line text-[#fff7ea]"
                style={{ fontSize: "clamp(3.5rem, 8.5vw, 8.5rem)", "--about-delay": "60ms" } as DelayStyle}
              >
                HALO,
              </span>
              <span
                className="about-reveal-line"
                style={{
                  fontSize: "clamp(3.5rem, 8.5vw, 8.5rem)",
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(247,239,224,0.22)",
                  "--about-delay": "160ms",
                } as DelayStyle}
              >
                SAYA
              </span>
              <span
                className="about-reveal-line font-display text-[#d6a44b]"
                style={{ fontSize: "clamp(3.2rem, 8vw, 8rem)", fontStyle: "italic", "--about-delay": "260ms" } as DelayStyle}
              >
                Abiyyu.
              </span>
            </h2>
          </div>

          {/* ── BIO — two columns ── */}
          <div className="mt-auto grid gap-6 border-t border-[#f7efe0]/8 px-10 pt-8 lg:grid-cols-2 lg:px-14">
            <div className="about-reveal-sub" style={{ "--about-delay": "380ms" } as DelayStyle}>
              <p className="mb-3 text-[9px] font-black uppercase tracking-[0.22em] text-[#a73522]">
                Blockchain Enthusiast
              </p>
              <p className="text-[0.9rem] font-medium leading-7 text-[#9b8f7d]">
                Mahasiswa IT yang sedang membangun cara sendiri untuk menggabungkan interface, rasa visual, dan engineering yang tetap rapi.
              </p>
            </div>
            <div className="about-reveal-sub" style={{ "--about-delay": "480ms" } as DelayStyle}>
              <p className="mb-3 text-[9px] font-black uppercase tracking-[0.22em] text-[#f7efe0]/18">Focus</p>
              <p className="text-[0.9rem] font-medium leading-7 text-[#6f6252]">
                Saya tertarik pada web yang terasa hidup tanpa kehilangan fungsi. Motif lokal, animasi, dan struktur komponen saya pakai sebagai bahasa visual, bukan sekadar hiasan.
              </p>
            </div>
          </div>

          {/* ── BOTTOM STRIP — stats + tags ── */}
          <div className="about-reveal-sub mt-6 flex flex-col gap-5 border-t border-[#f7efe0]/8 px-10 py-6 lg:flex-row lg:items-end lg:justify-between lg:px-14" style={{ "--about-delay": "580ms" } as DelayStyle}>
            <div className="flex gap-8">
              {[
                ["14+", "Proyek", "Selesai"],
                ["2+", "Tahun", "Belajar"],
                ["∞",  "Rasa",  "Jawa dalam kode"],
              ].map(([num, title, sub]) => (
                <div key={title}>
                  <p className="text-[2.2rem] font-black leading-none text-[#d6a44b]">{num}</p>
                  <p className="mt-1 text-[8px] font-black uppercase tracking-[0.18em] text-[#fff7ea]">{title}</p>
                  <p className="text-[8px] font-medium text-[#4b3f30]">{sub}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {["Jawa", "IT Student", "Web Dev", "UI Design", "Open Source"].map((tag, i) => (
                <span key={tag} className="text-[8px] font-black uppercase tracking-[0.2em] text-[#4b3f30]">
                  {i > 0 && <span className="mr-4 text-[#d6a44b]/40">/</span>}{tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
