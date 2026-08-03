"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  achievementFilters,
  achievements,
  type Achievement,
  type AchievementFilter,
} from "../data/achievements";
import OrgLogo from "./OrgLogo";
import { Counter, EASE, Words } from "./RevealBits";

const TILT_SPRING = { stiffness: 210, damping: 20, mass: 0.5 };

const MARQUEE_ITEMS = [
  "Juara 1 · Web Design Competition UTI",
  "Top 50 Global · Base Build Hackathon",
  "Juara 3 · Hackathon Base Indonesia",
  "Most Favorite · Lisk Builder Program 2",
  "Batch 2 · Base Indonesia Workshop",
  "Batch 5 · Dev Web3 Jogja",
];

// ── medali peringkat ─────────────────────────────────────────────────────────
function Medal({ item, compact }: { item: Achievement; compact?: boolean }) {
  return (
    <div
      className="medal relative overflow-hidden px-4 pb-3 pt-2.5"
      style={{
        border: `1px solid ${item.accent}45`,
        background: `linear-gradient(150deg, ${item.accent}1f, rgba(11,9,7,0.75) 62%)`,
        clipPath:
          "polygon(0 0, calc(100% - 11px) 0, 100% 11px, 100% 100%, 11px 100%, 0 calc(100% - 11px))",
      }}
    >
      <span aria-hidden className="medal-sheen pointer-events-none absolute inset-0" />
      <span
        className="relative block text-[8px] font-black uppercase tracking-[0.3em]"
        style={{ color: item.accent }}
      >
        {item.rankTop}
      </span>
      <span
        className="relative block font-black leading-[0.82] text-[#fff7ea]"
        style={{ fontSize: compact ? "clamp(1.9rem, 3.4vw, 2.6rem)" : "clamp(2.4rem, 4.6vw, 3.8rem)" }}
      >
        {item.rankMain}
      </span>
    </div>
  );
}

// ── kartu ────────────────────────────────────────────────────────────────────
function AchievementCard({
  item,
  index,
  onOpen,
}: {
  item: Achievement;
  index: number;
  onOpen: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5.5, -5.5]), TILT_SPRING);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6.5, 6.5]), TILT_SPRING);
  // Sorot digerakkan lewat transform (dikomposisi GPU), bukan dengan menulis
  // ulang radial-gradient tiap frame — itu memaksa repaint sebesar kartu.
  const glowX = useSpring(0, TILT_SPRING);
  const glowY = useSpring(0, TILT_SPRING);

  const isWide = item.span.includes("col-span-4");

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Di layar sentuh, pointermove ikut terpicu saat scroll — itu bikin 6 kartu
    // menghitung tilt bersamaan persis ketika frame paling dibutuhkan.
    if (reduce || e.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    glowX.set(e.clientX - r.left);
    glowY.set(e.clientY - r.top);
  };

  const recenter = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 34, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.96 }}
      transition={{ duration: 0.55, delay: Math.min(index, 5) * 0.05, ease: EASE }}
      className={`${item.span} [perspective:1400px]`}
    >
      <motion.article
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={recenter}
        style={{ rotateX, rotateY }}
        whileHover={reduce ? undefined : { y: -6 }}
        transition={{ duration: 0.28, ease: EASE }}
        className={`group relative h-full overflow-hidden border border-[#f7efe0]/10 bg-[#0b0907] ${item.height}`}
      >
        {/* foto — tetap terbaca, makin jelas saat hover.
            Hanya opacity + transform yang dianimasikan; filter seperti saturate
            memaksa repaint gambar sebesar kartu tiap frame. */}
        <div className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 92vw"
            className="object-cover opacity-[0.38] transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.05] group-hover:opacity-[0.72]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0907] via-[#0b0907]/88 to-[#0b0907]/35" />
          {isWide && (
            <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0b0907] via-[#0b0907]/45 to-transparent lg:block" />
          )}
        </div>

        {/* sorot mengikuti kursor — gradien statis yang digeser transform */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            x: glowX,
            y: glowY,
            marginLeft: -210,
            marginTop: -210,
            background: `radial-gradient(circle, ${item.accent}2b, transparent 70%)`,
          }}
        />

        {/* garis aksen atas */}
        <span
          aria-hidden
          className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
          style={{ background: `linear-gradient(to right, ${item.accent}, transparent 78%)` }}
        />

        {/* siku sudut yang memanjang saat hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t transition-all duration-500 group-hover:h-7 group-hover:w-7"
          style={{ borderColor: `${item.accent}55` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l transition-all duration-500 group-hover:h-7 group-hover:w-7"
          style={{ borderColor: `${item.accent}55` }}
        />

        {/* aksara latar */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 bottom-[-3rem] select-none font-black leading-none transition-transform duration-[900ms] ease-out group-hover:-translate-y-3"
          style={{ color: item.accent, opacity: 0.07, fontSize: isWide ? "16rem" : "11rem" }}
        >
          {item.aksara}
        </span>

        {/* isi */}
        <div className="relative flex h-full flex-col justify-between gap-8 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <Medal item={item} compact={!isWide} />
            <div className="flex flex-col items-end gap-2">
              <span
                className="border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.2em]"
                style={{
                  borderColor: `${item.accent}3d`,
                  background: `${item.accent}14`,
                  color: item.accent,
                }}
              >
                {item.kind === "bootcamp" ? "Bootcamp" : "Kompetisi"}
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#8d8170]">
                {item.year}
              </span>
            </div>
          </div>

          <div className={isWide ? "max-w-[46ch]" : ""}>
            <h3
              className="font-black leading-[1.02] text-[#fff7ea]"
              style={{ fontSize: isWide ? "clamp(1.7rem, 3.1vw, 2.8rem)" : "clamp(1.25rem, 2.1vw, 1.7rem)" }}
            >
              {item.title}
            </h3>

            <div className="mt-4 flex items-center gap-3.5">
              <OrgLogo
                src={item.logo}
                alt={item.org}
                fallback={item.aksara}
                accent={item.accent}
                size={isWide ? 68 : 56}
              />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-black uppercase tracking-[0.14em] text-[#c9b99d]">
                  {item.org}
                </p>
                <p className="mt-0.5 truncate text-[9px] font-black uppercase tracking-[0.18em] text-[#8d8170]">
                  {item.issuer} · {item.period}
                </p>
              </div>
            </div>

            <p
              className={`mt-4 text-[13px] font-medium leading-[1.75] text-[#a2937d] ${
                isWide ? "line-clamp-3" : "line-clamp-2"
              }`}
            >
              {item.desc}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[#f7efe0]/12 bg-[#f7efe0]/[0.04] px-2.5 py-1 text-[7.5px] font-black uppercase tracking-[0.16em] text-[#a2937d]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span
              className="mt-5 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.22em] transition-all duration-300 group-hover:gap-3.5"
              style={{ color: item.accent }}
            >
              Lihat detail
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>

        {/* target klik menutupi seluruh kartu */}
        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="absolute inset-0 z-20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#d6a44b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0c0a]"
        >
          <span className="sr-only">Buka detail {item.title}</span>
        </button>
      </motion.article>
    </motion.div>
  );
}

// ── lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }: { item: Achievement; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#050403]/88 backdrop-blur-md"
      />

      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.42, ease: EASE }}
        className="relative z-10 grid max-h-[88vh] w-full max-w-5xl overflow-y-auto border border-[#f7efe0]/12 bg-[#0d0b09] lg:grid-cols-[1.15fr_0.85fr] lg:overflow-hidden"
        style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
      >
        <div className="relative min-h-[240px] bg-[#080706] lg:min-h-[520px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 55vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0d0b09]/70" />
          <div className="absolute left-5 top-5">
            <Medal item={item} />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-6 md:p-9">
          <div className="flex items-start justify-between gap-4">
            <span
              className="border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.22em]"
              style={{
                borderColor: `${item.accent}44`,
                background: `${item.accent}16`,
                color: item.accent,
              }}
            >
              {item.kind === "bootcamp" ? "Bootcamp" : "Kompetisi"}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center border border-[#f7efe0]/15 text-[#c9b99d] transition-colors hover:border-[#d6a44b]/60 hover:text-[#d6a44b]"
              aria-label="Tutup detail"
            >
              ✕
            </button>
          </div>

          <div>
            <h3
              className="font-black leading-[1.04] text-[#fff7ea]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)" }}
            >
              {item.title}
            </h3>
            <div className="mt-5 flex items-center gap-3.5">
              <OrgLogo
                src={item.logo}
                alt={item.org}
                fallback={item.aksara}
                accent={item.accent}
                size={72}
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#c9b99d]">
                  {item.org}
                </p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#8d8170]">
                  {item.issuer}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#f7efe0]/10" />

          <p className="text-sm font-medium leading-[1.9] text-[#a2937d]">{item.desc}</p>

          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-[8px] font-black uppercase tracking-[0.22em] text-[#6b5f4f]">
                Periode
              </dt>
              <dd className="mt-1.5 text-xs font-black text-[#c9b99d]">{item.period}</dd>
            </div>
            <div>
              <dt className="text-[8px] font-black uppercase tracking-[0.22em] text-[#6b5f4f]">
                Capaian
              </dt>
              <dd className="mt-1.5 text-xs font-black" style={{ color: item.accent }}>
                {item.rankTop} {item.rankMain}
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#f7efe0]/12 bg-[#f7efe0]/[0.04] px-2.5 py-1 text-[7.5px] font-black uppercase tracking-[0.16em] text-[#a2937d]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── section ──────────────────────────────────────────────────────────────────
export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<AchievementFilter>("semua");
  const [activeId, setActiveId] = useState<string | null>(null);
  // Portal baru dibuat setelah interaksi pertama, jadi `document` dijamin ada
  // dan AnimatePresence tetap punya host untuk animasi keluar.
  const [portalReady, setPortalReady] = useState(false);

  const openCard = useCallback((id: string) => {
    setPortalReady(true);
    setActiveId(id);
  }, []);

  const closeCard = useCallback(() => setActiveId(null), []);

  const visible = useMemo(
    () => (filter === "semua" ? achievements : achievements.filter((a) => a.kind === filter)),
    [filter]
  );

  const counts = useMemo(
    () => ({
      semua: achievements.length,
      kompetisi: achievements.filter((a) => a.kind === "kompetisi").length,
      bootcamp: achievements.filter((a) => a.kind === "bootcamp").length,
    }),
    []
  );

  const activeItem = activeId ? achievements.find((a) => a.id === activeId) ?? null : null;

  // Ikut otomatis kalau tahun di data berubah.
  const yearSpan = useMemo(() => {
    const years = [...new Set(achievements.map((a) => a.year))].sort();
    return years.length > 1
      ? `Capaian ${years[0]}–${years[years.length - 1]}`
      : `Semua capaian diraih di ${years[0]}`;
  }, []);

  // parallax watermark
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const railScale = useTransform(scrollYProgress, [0.08, 0.9], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="perjalanan"
      className="relative z-20 overflow-hidden bg-[#0e0c0a]"
      style={{ boxShadow: "0 -12px 48px rgba(0,0,0,0.28)", borderRadius: "28px 28px 0 0" }}
    >
      {/* Watermark hanya digeser (translate). Menambah rotate memaksa glyph
          sebesar ini di-raster ulang tiap frame scroll. */}
      <motion.p
        className="pointer-events-none absolute -right-10 top-16 select-none font-black leading-none text-[#d6a44b]"
        style={{ fontSize: "30vw", opacity: 0.03, y: bgY }}
        aria-hidden
      >
        ꦥ
      </motion.p>

      {/* rel emas tipis di tepi kiri — mengisi seiring scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden w-[2px] origin-top lg:block"
        style={{
          height: "100%",
          scaleY: railScale,
          background: "linear-gradient(to bottom, #d6a44b, #a73522 55%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div className="mb-12 flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.p
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="h-px w-6 bg-[#d6a44b]/60" />
              04 · Karya &amp; Capaian
            </motion.p>

            <h2 className="mt-5 font-black leading-[0.92]" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
              <Words text="Dari layar," />
              <br />
              <Words
                text="ke panggung."
                className="font-display italic"
                style={{ color: "#d6a44b" }}
                delay={0.12}
              />
            </h2>

            <motion.p
              className="mt-6 max-w-[46ch] text-sm font-medium leading-[1.9] text-[#a2937d]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            >
              Empat penghargaan kompetisi dan dua program intensif. Klik kartunya untuk
              melihat dokumentasi lengkap tiap capaian.
            </motion.p>
          </div>

          <motion.div
            className="flex gap-10 lg:flex-col lg:items-end lg:gap-6"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            {[
              { n: counts.kompetisi, l: "Penghargaan" },
              { n: counts.bootcamp, l: "Bootcamp" },
              { n: 2, l: "Skala Global" },
            ].map((s) => (
              <div key={s.l} className="lg:text-right">
                <p className="text-[2.6rem] font-black leading-none text-[#d6a44b] tabular-nums">
                  <Counter to={s.n} />
                </p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#8d8170]">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── MARQUEE ────────────────────────────────────────────────────── */}
        <div className="mb-10 overflow-hidden border-y border-[#f7efe0]/8 py-4">
          <div className="marquee-track flex w-max items-center">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((label, i) => (
              <span
                key={i}
                className="mx-10 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.26em] text-[#8d8170]"
              >
                <span className="mr-4 text-[#d6a44b]/70">ꦱ</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── FILTER ─────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div
            role="tablist"
            aria-label="Filter capaian"
            className="inline-flex items-center gap-1 border border-[#f7efe0]/12 bg-[#15110d] p-1"
          >
            {achievementFilters.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className="relative px-4 py-2 outline-none focus-visible:ring-1 focus-visible:ring-[#d6a44b]"
                >
                  {isActive && (
                    <motion.span
                      layoutId="ach-filter-pill"
                      className="absolute inset-0 bg-[#d6a44b]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-200 ${
                      isActive ? "text-[#100d0a]" : "text-[#8d8170] hover:text-[#f7efe0]"
                    }`}
                  >
                    {f.label}
                    <span className={isActive ? "opacity-60" : "opacity-40"}>{counts[f.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#6b5f4f]">
            {visible.length} kartu ditampilkan
          </p>
        </motion.div>

        {/* ── BENTO GRID ─────────────────────────────────────────────────── */}
        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <AchievementCard key={item.id} item={item} index={i} onOpen={openCard} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── FOOTNOTE ───────────────────────────────────────────────────── */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#f7efe0]/8 pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="grid h-8 w-8 place-items-center border border-[#d6a44b]/25 bg-[#d6a44b]/[0.08] text-sm font-black text-[#d6a44b]">
            ꦱ
          </span>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8d8170]">
            {yearSpan} · Yogyakarta &amp; Surakarta
          </p>
        </motion.div>
      </div>

      {/* lightbox lewat portal — section ini kena transform dari SkillsSection,
          jadi position:fixed harus hidup di luar pohon DOM-nya */}
      {portalReady &&
        createPortal(
          <AnimatePresence>
            {activeItem && (
              <Lightbox key={activeItem.id} item={activeItem} onClose={closeCard} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
