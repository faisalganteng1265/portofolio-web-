"use client";

import { useEffect, useRef, useState } from "react";

const stackCards = [
  {
    num: "01",
    label: "Kawruh · Ilmu",
    aksara: "ꦲ",
    title: "Antarmuka yang hidup dan berkarakter.",
    text: "React dan Next.js sebagai fondasi. Animasi halus, spacing disiplin, dan visual yang lahir dari identitas lokal—bukan sekadar komponen generik yang copy-paste.",
    meta: "Frontend",
  },
  {
    num: "02",
    label: "Karya · Wujud",
    aksara: "ꦤ",
    title: "Kode bersih, skalabel, dan mudah dirawat.",
    text: "Arsitektur komponen dipikirkan sejak awal. TypeScript untuk keamanan tipe, Tailwind untuk konsistensi visual, dan struktur folder yang masuk akal untuk tim maupun solo.",
    meta: "Engineering",
  },
  {
    num: "03",
    label: "Rasa · Estetika",
    aksara: "ꦕ",
    title: "Visual dari akar budaya, bukan template.",
    text: "Aksara Jawa, motif kawung, warna sogan. Identitas Nusantara dipakai sebagai sistem visual modern yang tetap fungsional dan usable—bukan sekadar ornamen.",
    meta: "Design",
  },
  {
    num: "04",
    label: "Tindak · Aksi",
    aksara: "ꦫ",
    title: "Dari sketsa hingga deploy, tuntas sendiri.",
    text: "Riset, wireframe, development, optimasi performa, dan responsivitas dalam satu alur kerja yang konsisten. Cocok untuk proyek kecil maupun skala penuh.",
    meta: "Full Cycle",
  },
];

const TOP_OFFSET = 104;
const CARD_STEP = 22;

export default function StackSection() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const targetTop = TOP_OFFSET + i * CARD_STEP;
        if (rect.top <= targetTop + 4) setActive(i);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="relative bg-[#0e0c0a] px-5 py-20 md:px-8 lg:py-32"
      style={{ minHeight: "180vh" }}
    >
      {/* bg aksara */}
      <p
        className="pointer-events-none absolute -left-10 top-20 select-none font-black leading-none text-[#d6a44b] opacity-[0.03]"
        style={{ fontSize: "22vw" }}
        aria-hidden="true"
      >
        ꦱ
      </p>

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        {/* ── sticky sidebar ── */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
            <span className="h-px w-6 bg-[#d6a44b]/60" />
            Scroll Stack
          </p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-black leading-[1.04]">
            Empat lapis cara kerja saya.
          </h2>
          <p className="mt-4 max-w-[38ch] text-sm font-medium leading-7 text-[#9b8f7d]">
            Scroll ke bawah — kartu-kartu ini menempel satu per satu seperti
            tumpukan, menunjukkan cara saya mendekati setiap proyek.
          </p>

          <div className="java-rule mt-8" />

          {/* progress tracker */}
          <div className="mt-8 flex flex-col gap-3">
            {stackCards.map((card, i) => (
              <button
                key={card.num}
                className="group flex items-center gap-3 text-left transition-all duration-300"
                onClick={() => {
                  cardRefs.current[i]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              >
                <span
                  className={`block h-[2px] transition-all duration-500 ${
                    i <= active
                      ? "w-8 bg-[#d6a44b]"
                      : "w-3 bg-[#d6a44b]/20 group-hover:w-5 group-hover:bg-[#d6a44b]/50"
                  }`}
                />
                <span
                  className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                    i === active
                      ? "text-[#d6a44b]"
                      : i < active
                      ? "text-[#6b5f4f]"
                      : "text-[#2e2620] group-hover:text-[#4b3f30]"
                  }`}
                >
                  {card.num} · {card.label}
                </span>
              </button>
            ))}
          </div>

          {/* scroll hint */}
          <div className="mt-10 hidden lg:flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.22em] text-[#2e2620]">
            <span className="animate-bounce">↓</span>
            <span>Scroll untuk menumpuk</span>
          </div>
        </aside>

        {/* ── stack cards ── */}
        <div style={{ paddingBottom: "42vh" }}>
          {stackCards.map((card, index) => {
            const isActive = index === active;
            const isPast = index < active;

            return (
              <article
                key={card.num}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="stack-card relative overflow-hidden border p-6 shadow-[0_28px_72px_rgba(0,0,0,0.56)] transition-all duration-500 md:p-9 lg:sticky"
                style={{
                  top: `${TOP_OFFSET + index * CARD_STEP}px`,
                  zIndex: index + 2,
                  marginBottom: index < stackCards.length - 1 ? "1rem" : 0,
                  borderColor: isActive
                    ? "rgba(214,164,75,0.35)"
                    : "rgba(247,239,224,0.07)",
                  transform: isPast
                    ? `scale(${1 - (active - index) * 0.015})`
                    : "scale(1)",
                  opacity: isPast ? Math.max(0.55, 1 - (active - index) * 0.18) : 1,
                }}
              >
                {/* left accent */}
                <div
                  className="absolute left-0 top-0 h-full w-[3px] transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(to bottom, #a73522, #d6a44b, transparent)"
                      : "linear-gradient(to bottom, rgba(167,53,34,0.3), rgba(214,164,75,0.3), transparent)",
                  }}
                />

                {/* aksara bg */}
                <p
                  className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-black leading-none transition-opacity duration-500"
                  style={{
                    fontSize: "clamp(5rem,9vw,8rem)",
                    color: "#d6a44b",
                    opacity: isActive ? 0.1 : 0.04,
                  }}
                  aria-hidden="true"
                >
                  {card.aksara}
                </p>

                <div className="flex items-start justify-between gap-5">
                  <p
                    className="text-[10px] font-black uppercase tracking-[0.26em] transition-colors duration-300"
                    style={{ color: isActive ? "#d6a44b" : "#6b5f4f" }}
                  >
                    {card.num} / {card.label}
                  </p>
                  <span
                    className="shrink-0 border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] transition-all duration-300"
                    style={{
                      borderColor: isActive
                        ? "rgba(214,164,75,0.4)"
                        : "rgba(214,164,75,0.14)",
                      background: isActive ? "#2a1710" : "#1a1210",
                      color: isActive ? "#d6a44b" : "#4b3f30",
                    }}
                  >
                    {card.meta}
                  </span>
                </div>

                <h3
                  className="mt-7 max-w-2xl text-[1.5rem] font-black leading-[1.18] transition-colors duration-300 md:text-[1.9rem]"
                  style={{ color: isActive ? "#fff7ea" : "#a89880" }}
                >
                  {card.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[0.93rem] font-medium leading-8 text-[#9b8f7d]">
                  {card.text}
                </p>

                {/* active indicator dot */}
                {isActive && (
                  <div className="absolute bottom-5 right-5 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6a44b] shadow-[0_0_6px_#d6a44b]" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#d6a44b]/60">
                      Active
                    </span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
