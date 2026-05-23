"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

const aboutMarquee = [
  "Universitas Sebelas Maret",
  "Learning Blockchain",
  "Developing Projects",
  "Frontend Developer",
];

export default function ScrollHero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const viewport = window.innerHeight || 1;
      setProgress(clamp(window.scrollY / (viewport * 0.78)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const darkProgress = clamp((progress - 0.18) / 0.72);
  const exitProgress = clamp((progress - 0.86) / 0.14);
  const faceBoxProgress = clamp((darkProgress - 0.36) / 0.64);
  const cardScale = 1 - darkProgress * 0.48;
  const cardY = darkProgress * -4;
  const portraitOpacity = 1 - darkProgress * 0.34;
  const topLogoColor = darkProgress > 0.45 ? "#d6a44b" : "#2a1a0e";
  const faceBoxHeight = 96 - faceBoxProgress * 48;
  const faceBoxMinHeight = 660 - faceBoxProgress * 260;
  const faceBoxAspect = 0.68 + faceBoxProgress * 0.76;

  return (
    <section id="home" className="relative h-[190svh] bg-[#100d0a]">
      <div
        className="sticky top-0 min-h-svh overflow-hidden px-5 md:px-8"
        style={{
          backgroundColor: `color-mix(in srgb, #fff7ea ${100 - darkProgress * 100}%, #100d0a ${darkProgress * 100}%)`,
          color: `color-mix(in srgb, #2a1a0e ${100 - darkProgress * 100}%, #f7efe0 ${darkProgress * 100}%)`,
        }}
      >
        <div
          className="pointer-events-none absolute left-5 top-6 z-20 leading-[0.78] md:left-8"
          style={{ opacity: 1 - exitProgress }}
        >
          <p className="font-display text-[2.35rem] font-normal uppercase tracking-normal md:text-[3rem]">
            ABIYYU
          </p>
          <p className="text-[1.95rem] font-black uppercase tracking-normal md:text-[2.6rem]">
            FAISAL
          </p>
        </div>

        <div
          className="absolute right-5 top-[71svh] z-20 hidden md:block md:right-8"
          style={{ opacity: 1 - exitProgress }}
        >
          <p
            className="mb-2 text-[10px] font-black uppercase tracking-[0.04em]"
            style={{ color: `rgba(42,26,14,${1 - darkProgress})` }}
          >
            Next Project
          </p>
          <div
            className="h-60 w-32 overflow-hidden rounded-tl-[24px] border bg-white/35 p-4"
            style={{
              borderColor: `rgba(42,26,14,${0.58 - darkProgress * 0.45})`,
              opacity: 1 - darkProgress,
            }}
          >
            <div className="relative h-14 border-b border-[#2a1a0e]/45">
              <Image
                src="/assets/borobudur-java.jpg"
                alt=""
                fill
                sizes="128px"
                className="object-cover opacity-65 grayscale"
              />
            </div>
            <p className="mt-10 border-b border-[#2a1a0e]/45 pb-2 text-center text-[10px] font-black uppercase text-[#2a1a0e]/70">
              Portfolio
            </p>
            <p className="mt-10 text-center text-[10px] font-black uppercase leading-tight text-[#2a1a0e]/60">
              Frontend
              <br />
              Indonesia
            </p>
          </div>
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-9 z-20 text-4xl font-black leading-none"
          style={{
            color: topLogoColor,
            opacity: 1 - exitProgress,
            transform: "translateX(-50%)",
          }}
          aria-hidden="true"
        >
          ꦄ
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-[20%] z-20 -translate-x-1/2 text-center"
          style={{ opacity: faceBoxProgress }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a44b]">
            Currently Building
          </p>
          <p className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#f7efe0]/55">
            UNS · Blockchain · Portfolio Projects
          </p>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 overflow-hidden"
          style={{ opacity: 0.08 + darkProgress * 0.82 }}
          aria-hidden="true"
        >
          <div
            className="marquee-track flex gap-[4vw] whitespace-nowrap font-black uppercase leading-[0.86]"
            style={{
              color: `color-mix(in srgb, #d6a44b ${darkProgress * 100}%, #2a1a0e ${100 - darkProgress * 100}%)`,
              fontSize: "clamp(4.4rem, 8.8vw, 10.5rem)",
            }}
          >
            {[0, 1].map((copy) =>
              aboutMarquee.map((item, index) => (
                <span
                  key={`bot-${copy}-${item}`}
                  className={index % 2 === 1 ? "text-[#f7efe0]" : undefined}
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-8 left-5 z-20 hidden max-w-[18rem] md:block md:left-8"
          style={{ opacity: faceBoxProgress }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a44b]">
            Focus
          </p>
          <p className="mt-2 text-sm font-medium leading-6 text-[#f7efe0]/68">
            Building useful web interfaces while learning blockchain systems.
          </p>
        </div>

        <div
          className="absolute inset-0 z-10 grid place-items-center pt-8"
          style={{ opacity: 1 }}
        >
          <div
            className="relative w-auto overflow-hidden border"
            style={{
              aspectRatio: faceBoxAspect,
              backgroundColor: `rgba(248,248,244,${0.34 - darkProgress * 0.18})`,
              borderColor: `rgba(214,164,75,${faceBoxProgress * 0.24})`,
              boxShadow: `0 34px 110px rgba(0,0,0,${faceBoxProgress * 0.18})`,
              filter: `saturate(${1 - darkProgress * 0.35}) contrast(${1 + darkProgress * 0.1})`,
              height: `${faceBoxHeight}svh`,
              maxHeight: "1040px",
              minHeight: `${faceBoxMinHeight}px`,
              transform: `translate3d(0, ${10 + cardY - faceBoxProgress * 8}svh, 0) scale(${cardScale})`,
            }}
          >
            <div
              className="absolute inset-0 z-10"
              style={{
                background: `linear-gradient(to bottom, rgba(16,13,10,${faceBoxProgress * 0.18}) 0%, rgba(248,248,244,0) 34%, rgba(16,13,10,${darkProgress * 0.34}) 100%)`,
              }}
            />
            <Image
              src="/assets/faisal-hero.png"
              alt="Foto Faisal Akmal"
              fill
              priority
              sizes="(min-width: 768px) 54vw, 92vw"
              className="object-contain object-bottom"
              style={{
                opacity: portraitOpacity * (1 - faceBoxProgress),
              }}
            />
            <Image
              src="/assets/faisal-hero.png"
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 42vw, 92vw"
              className="object-cover"
              style={{
                objectPosition: "50% 16%",
                opacity: faceBoxProgress,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `rgba(32,39,25,${darkProgress * 0.48})`,
              }}
            />
          </div>
        </div>

        <div
          className="absolute bottom-8 left-5 z-30 max-w-2xl md:left-8"
          style={{ opacity: 1 - darkProgress * 0.94 }}
        >
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-[#a73522]">
            ꦥꦺꦴꦂꦠꦺꦴꦥꦺꦴꦭꦶꦪꦺꦴ · Frontend Developer
          </p>
          <h1 className="text-[clamp(3.6rem,10vw,10rem)] font-black uppercase leading-[0.82] tracking-normal text-[#2a1a0e]">
            Abiyyu
            <br />
            Faisal Akmal
          </h1>
        </div>
      </div>
    </section>
  );
}
