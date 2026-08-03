"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { experienceRoles, experiences, type Experience } from "../data/experiences";
import OrgLogo from "./OrgLogo";
import { Counter, EASE, Words } from "./RevealBits";

const YEARS = Array.from(new Set(experiences.map((e) => e.year)));
const SPOTLIGHT_IDS = experiences.filter((e) => e.spotlight).map((e) => e.id);
const ORG_COUNT = experiences.filter(
  (e) => e.kind === "Organisasi" || e.kind === "Kepanitiaan"
).length;

// ── satu baris pengalaman ────────────────────────────────────────────────────
// Di-memo supaya perubahan `activeIndex` (terjadi tiap kali satu baris melewati
// tengah layar saat scroll) tidak me-render ulang ketujuh baris sekaligus.
const ExperienceRow = memo(function ExperienceRow({
  exp,
  index,
  isOpen,
  onToggle,
  onActive,
  registerRef,
}: {
  exp: Experience;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onActive: (index: number) => void;
  registerRef: (index: number, el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const reduce = useReducedMotion();
  const panelId = `exp-panel-${exp.id}`;

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={(el) => {
        ref.current = el;
        registerRef(index, el);
      }}
      className="grid grid-cols-[1.75rem_1fr] gap-x-3 lg:grid-cols-[2.5rem_1fr] lg:gap-x-5"
    >
      {/* ── simpul di rel ── */}
      <div className="relative flex justify-center pt-[2.35rem]">
        <motion.span
          className="relative block h-3 w-3 rounded-full border-2"
          animate={{
            scale: isOpen ? 1.25 : inView ? 1.1 : 0.85,
            borderColor: inView || isOpen ? exp.accent : "#2a231c",
            backgroundColor: isOpen ? exp.accent : "#0f0c09",
          }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{ boxShadow: inView ? `0 0 12px 3px ${exp.accent}44` : "none" }}
        />
      </div>

      {/* ── kartu ── */}
      <motion.article
        className="relative mb-3 overflow-hidden border"
        animate={{
          borderColor: isOpen ? `${exp.accent}47` : "rgba(247,239,224,0.08)",
          backgroundColor: isOpen ? `${exp.accent}0a` : "rgba(247,239,224,0)",
        }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {/* nomor hantu di latar */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 -top-6 select-none font-black leading-none transition-transform duration-700 ease-out"
          style={{
            color: exp.accent,
            opacity: isOpen ? 0.09 : 0.045,
            fontSize: "8rem",
            transform: isOpen ? "translateY(6px)" : "none",
          }}
        >
          {exp.id}
        </span>

        {/* bilah aksen kiri */}
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 w-[2px] origin-top"
          animate={{ scaleY: isOpen ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            height: "100%",
            background: `linear-gradient(to bottom, ${exp.accent}, transparent)`,
          }}
        />

        {/* garis sapuan saat kartu dibuka */}
        <AnimatePresence>
          {isOpen && !reduce && (
            <motion.span
              key="sweep"
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left"
              initial={{ scaleX: 0, opacity: 0.9 }}
              animate={{ scaleX: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              style={{
                background: `linear-gradient(to right, transparent, ${exp.accent}, transparent)`,
              }}
            />
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => onToggle(exp.id)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="group relative flex w-full items-start gap-4 p-4 text-left outline-none transition-colors duration-300 hover:bg-[#f7efe0]/[0.025] focus-visible:ring-1 focus-visible:ring-[#d6a44b] md:gap-5 md:p-5"
        >
          {/* slot logo instansi */}
          <motion.span
            className="relative block"
            whileHover={reduce ? undefined : { y: -3, rotate: -2 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <OrgLogo
              src={exp.logo}
              alt={`Logo ${exp.company}`}
              fallback={exp.aksara}
              accent={exp.accent}
              size={56}
              className="md:!h-16 md:!w-16"
            />
          </motion.span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[8px] font-black uppercase tracking-[0.26em]"
                style={{ color: `${exp.accent}b0` }}
              >
                {exp.id}
              </span>
              <span
                className="border px-2 py-0.5 text-[7.5px] font-black uppercase tracking-[0.18em]"
                style={{
                  borderColor: `${exp.accent}33`,
                  background: `${exp.accent}12`,
                  color: `${exp.accent}dd`,
                }}
              >
                {exp.kind}
              </span>
              {exp.spotlight && (
                <span className="border border-[#f7efe0]/15 bg-[#f7efe0]/[0.04] px-2 py-0.5 text-[7.5px] font-black uppercase tracking-[0.18em] text-[#c9b99d]">
                  Spotlight
                </span>
              )}
            </div>

            <h3
              className="mt-2 font-black leading-[1.12] text-[#fff7ea]"
              style={{ fontSize: "clamp(1.05rem, 1.9vw, 1.45rem)" }}
            >
              {exp.role}
            </h3>

            <p className="mt-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#c9b99d]">
              {exp.company}
            </p>
            <p className="mt-1 text-[10px] font-medium text-[#8d8170]">
              {exp.unit ? `${exp.unit} · ` : ""}
              {exp.location} · {exp.mode}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <span
              className="whitespace-nowrap border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em]"
              style={{ borderColor: `${exp.accent}2e`, color: `${exp.accent}cc` }}
            >
              {exp.periodShort}
            </span>
            <span className="hidden text-[8px] font-black uppercase tracking-[0.18em] text-[#8d8170] sm:block">
              {exp.duration}
            </span>
            <motion.span
              aria-hidden
              className="mt-1 grid h-7 w-7 place-items-center border text-[13px] font-black leading-none"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{
                borderColor: `${exp.accent}33`,
                color: exp.accent,
              }}
            >
              +
            </motion.span>
          </div>
        </button>

        {/* ── detail ── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="detail"
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.45, ease: EASE },
                opacity: { duration: 0.3, ease: "linear" },
              }}
              className="relative overflow-hidden"
            >
              <div
                className="border-t px-4 pb-6 pt-5 md:px-5 md:pl-[5.75rem]"
                style={{ borderColor: `${exp.accent}1f` }}
              >
                <motion.p
                  className="max-w-[72ch] text-[13px] font-medium leading-[1.9] text-[#a2937d]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
                >
                  {exp.desc}
                </motion.p>

                {exp.wins.length > 0 && (
                  <ul className="mt-5 grid gap-2.5">
                    {exp.wins.map((win, i) => (
                      <motion.li
                        key={win}
                        className="flex gap-3 text-[12.5px] font-semibold leading-[1.7] text-[#c9b99d]"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.14 + i * 0.07, ease: EASE }}
                      >
                        <span
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45"
                          style={{ background: exp.accent }}
                        />
                        <span>{win}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                <motion.div
                  className="mt-6 flex flex-wrap items-center gap-1.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.24, ease: EASE }}
                >
                  <span className="mr-1 text-[8px] font-black uppercase tracking-[0.22em] text-[#6b5f4f]">
                    Fokus
                  </span>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border bg-[#f7efe0]/[0.04] px-2.5 py-1 text-[7.5px] font-black uppercase tracking-[0.16em]"
                      style={{ borderColor: `${exp.accent}26`, color: `${exp.accent}c0` }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-[8px] font-black uppercase tracking-[0.2em] text-[#6b5f4f]">
                    {exp.period}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>
    </div>
  );
});

// ── section ──────────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rowEls = useRef<(HTMLDivElement | null)[]>([]);

  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(SPOTLIGHT_IDS));
  const [activeIndex, setActiveIndex] = useState(0);

  const registerRef = useCallback((index: number, el: HTMLDivElement | null) => {
    rowEls.current[index] = el;
  }, []);

  const handleActive = useCallback((index: number) => setActiveIndex(index), []);

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allOpen = openIds.size === experiences.length;
  const toggleAll = () =>
    setOpenIds(allOpen ? new Set() : new Set(experiences.map((e) => e.id)));

  const jumpToYear = (year: string) => {
    const index = experiences.findIndex((e) => e.year === year);
    rowEls.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const activeYear = experiences[activeIndex]?.year ?? YEARS[0];

  const yearCounts = useMemo(
    () =>
      YEARS.map((y) => ({
        year: y,
        count: experiences.filter((e) => e.year === y).length,
      })),
    []
  );

  // rel emas mengisi seiring scroll
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 62%", "end 55%"],
  });
  const railFill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  // parallax latar
  const { scrollYProgress: secProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(secProgress, [0, 1], [-70, 70]);
  const topRule = useTransform(secProgress, [0.04, 0.26], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-30 overflow-hidden bg-[#0f0c09] px-5 py-24 md:px-8 lg:py-32"
      style={{ boxShadow: "0 -16px 64px rgba(0,0,0,0.45)", borderRadius: "28px 28px 0 0" }}
    >
      {/* Glyph ini dulunya 52vw dan ikut dirotasi tiap frame — layer sebesar itu
          harus di-raster ulang terus-menerus saat scroll. Sekarang lebih kecil
          dan murni translate. */}
      <motion.p
        className="pointer-events-none absolute -right-12 top-4 select-none font-black leading-none text-[#d6a44b]"
        style={{ y: bgY, fontSize: "38vw", opacity: 0.014 }}
        aria-hidden
      >
        ꦱ
      </motion.p>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-[#d6a44b]/40"
        style={{ scaleX: topRule }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(#d6a44b 1px, transparent 1px), linear-gradient(90deg, #d6a44b 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="mb-12 grid gap-9 lg:grid-cols-[0.9fr_1fr] lg:items-end">
          <div>
            <motion.p
              className="flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.28em] text-[#d6a44b]"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="h-px w-5 bg-[#d6a44b]/60" />
              05 · Pengalaman
            </motion.p>

            <h2 className="mt-5 font-black leading-[0.92]" style={{ fontSize: "clamp(2.4rem, 5.4vw, 5.4rem)" }}>
              <Words text="Experience" />
              <br />
              <Words
                text="that matters."
                className="font-display italic text-[#d6a44b]"
                delay={0.1}
              />
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <motion.div
              className="flex flex-wrap gap-8 sm:gap-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            >
              {[
                { n: experiences.length, l: "Pengalaman", suffix: "" },
                { n: SPOTLIGHT_IDS.length, l: "Spotlight", suffix: "" },
                { n: YEARS.length, l: "Tahun Aktif", suffix: "" },
                { n: ORG_COUNT, l: "Organisasi & Panitia", suffix: "" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-[2.1rem] font-black leading-none text-[#d6a44b] tabular-nums">
                    <Counter to={s.n} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-[8px] font-black uppercase tracking-[0.2em] text-[#8d8170]">
                    {s.l}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="max-w-2xl text-sm font-medium leading-[1.9] text-[#a2937d]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              Dua pengalaman teknis jadi spotlight — membangun katalog produk eSize dan mengajar
              Data Structures &amp; Algorithms. Sisanya membangun sisi leadership, komunikasi, dan
              kerja tim. Ketuk tiap baris untuk membuka rinciannya.
            </motion.p>
          </div>
        </div>

        {/* ── MARQUEE ────────────────────────────────────────────────────── */}
        <div className="mb-12 overflow-hidden border-y border-[#f7efe0]/8 py-4">
          <div className="marquee-track-reverse flex w-max items-center">
            {[...experienceRoles, ...experienceRoles].map((role, i) => (
              <span
                key={i}
                className="mx-10 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.26em] text-[#8d8170]"
              >
                <span className="mr-4 text-[#d6a44b]/70">ꦱ</span>
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* ── BODY ───────────────────────────────────────────────────────── */}
        <div className="lg:grid lg:grid-cols-[13.5rem_1fr] lg:gap-14">
          {/* ── panel kiri: tahun yang sedang dibaca ── */}
          <aside className="mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p className="text-[8px] font-black uppercase tracking-[0.26em] text-[#6b5f4f]">
                Sedang dibaca
              </p>

              <div className="relative mt-2 h-[3.4rem] overflow-hidden lg:h-[5rem]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={activeYear}
                    className="absolute inset-0 font-black leading-none text-[#d6a44b] tabular-nums"
                    style={{ fontSize: "clamp(2.8rem, 5vw, 4.4rem)" }}
                    initial={{ y: "72%", opacity: 0, filter: "blur(9px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-72%", opacity: 0, filter: "blur(9px)" }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    {activeYear}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs font-black tabular-nums text-[#c9b99d]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-[#f7efe0]/12">
                  <motion.div
                    className="h-px bg-[#d6a44b]"
                    animate={{
                      scaleX: (activeIndex + 1) / experiences.length,
                    }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                </div>
                <span className="text-xs font-black tabular-nums text-[#6b5f4f]">
                  {String(experiences.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-7 flex gap-2 lg:flex-col lg:gap-1.5">
                {yearCounts.map(({ year, count }) => {
                  const isActive = year === activeYear;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => jumpToYear(year)}
                      className="group relative flex flex-1 items-center justify-between gap-3 border px-3 py-2 text-left outline-none transition-colors duration-300 focus-visible:ring-1 focus-visible:ring-[#d6a44b]"
                      style={{
                        borderColor: isActive ? "#d6a44b4d" : "rgba(247,239,224,0.08)",
                        background: isActive ? "#d6a44b0f" : "transparent",
                      }}
                    >
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.18em] transition-colors"
                        style={{ color: isActive ? "#d6a44b" : "#8d8170" }}
                      >
                        {year}
                      </span>
                      <span className="text-[9px] font-black tabular-nums text-[#6b5f4f]">
                        {String(count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={toggleAll}
                className="mt-4 w-full border border-[#f7efe0]/10 px-3 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#8d8170] outline-none transition-colors duration-300 hover:border-[#d6a44b]/45 hover:text-[#d6a44b] focus-visible:ring-1 focus-visible:ring-[#d6a44b]"
              >
                {allOpen ? "Tutup semua" : "Buka semua"}
              </button>

              <p className="mt-4 hidden text-[9px] font-medium leading-[1.8] text-[#6b5f4f] lg:block">
                Ketuk kartu untuk membuka rincian, atau pilih tahun untuk melompat.
              </p>
            </div>
          </aside>

          {/* ── daftar pengalaman ── */}
          <div ref={listRef} className="relative">
            {/* rel */}
            <div
              aria-hidden
              className="absolute left-[0.875rem] top-3 bottom-16 w-px -translate-x-1/2 bg-[#231d17] lg:left-[1.25rem]"
            />
            <motion.div
              aria-hidden
              className="absolute left-[0.875rem] top-3 bottom-16 w-px -translate-x-1/2 origin-top lg:left-[1.25rem]"
              style={{
                scaleY: railFill,
                background: "linear-gradient(to bottom, #d6a44b, #a73522)",
              }}
            />

            {experiences.map((exp, i) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                index={i}
                isOpen={openIds.has(exp.id)}
                onToggle={toggle}
                onActive={handleActive}
                registerRef={registerRef}
              />
            ))}

            {/* ── ujung timeline ── */}
            <div className="grid grid-cols-[1.75rem_1fr] gap-x-3 lg:grid-cols-[2.5rem_1fr] lg:gap-x-5">
              <div className="relative flex justify-center pt-2">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d6a44b] opacity-50" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#d6a44b]" />
                </span>
              </div>
              <motion.div
                className="pt-0.5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <p className="text-base font-black text-[#fff7ea]">Sekarang</p>
                <p className="mt-1.5 max-w-[46ch] text-[13px] font-medium leading-[1.8] text-[#a2937d]">
                  Terbuka untuk peran frontend berikutnya — magang, freelance, atau kolaborasi
                  produk.
                </p>
                <a
                  href="mailto:faisalakmal2105@gmail.com"
                  className="btn-shimmer mt-4 inline-flex items-center gap-2 border border-[#d6a44b]/40 bg-[#d6a44b]/[0.08] px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.22em] text-[#d6a44b] hover:border-[#d6a44b]"
                >
                  Ajak kerja sama <span aria-hidden>→</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
