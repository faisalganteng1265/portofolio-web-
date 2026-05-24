"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";

// ── constants ──────────────────────────────────────────────────────────────────
const LINE_PAD      = 72;
const PROX_FEAT     = 420;
const PROX_ROW      = 300;
const MAX_ROW_SHIFT = 24;

const MARQUEE_ROLES = [
  "Frontend Developer",
  "Asisten Dosen",
  "Ketua Pelaksana PKKMB",
  "Staff Minat & Bakat",
  "Koordinator Bidang",
  "Staff General Affair",
  "Staff PKKMB",
];

// ── types ──────────────────────────────────────────────────────────────────────
type Experience = {
  id: string;
  roleLines: string[];
  company: string;
  period: string;
  year: string;
  desc: string;
  wins: string[];
  tags: string[];
  aksara: string;
  accent: string;
};

const EXPERIENCES: Experience[] = [
  {
    id: "01",
    roleLines: ["Frontend", "Developer"],
    company: "Program Hibah Magang Berdampak · PT Esize Surakarta",
    period: "2025",
    year: "2025",
    desc: "Berkontribusi sebagai frontend developer dalam program hibah magang berdampak untuk membangun web perusahaan konveksi PT Esize Surakarta.",
    wins: [
      "Mengembangkan antarmuka web perusahaan konveksi",
      "Menerjemahkan kebutuhan bisnis PT Esize ke pengalaman web yang rapi",
      "Berkoordinasi dalam tim untuk memastikan fitur dan tampilan sesuai kebutuhan",
    ],
    tags: ["Frontend", "Web Development", "React", "Teamwork"],
    aksara: "ꦩ",
    accent: "#a73522",
  },
  {
    id: "02",
    roleLines: ["Coordinating", "Ministry", "Interests & Talents"],
    company: "BEM FATISDA UNS · Contract · Hybrid",
    period: "Feb 2025 — Dec 2025",
    year: "2025",
    desc: "Mengelola agenda pengembangan minat dan bakat mahasiswa di lingkungan FATISDA UNS, dari koordinasi program, komunikasi lintas divisi, hingga pelaksanaan kegiatan.",
    wins: [
      "Koordinasi program selama 11 bulan di Surakarta",
      "Menjaga alur komunikasi antara panitia, peserta, dan stakeholder",
      "Mengasah problem solving dalam kegiatan organisasi kampus",
    ],
    tags: ["Communication", "Problem Solving", "Leadership", "Teamwork"],
    aksara: "ꦥ",
    accent: "#d6a44b",
  },
  {
    id: "03",
    roleLines: ["Chairman", "PKKMB", "FATISDA"],
    company: "PKKMB FATISDA UNS · Surakarta",
    period: "Apr 2025 — Aug 2025",
    year: "2025",
    desc: "Memimpin pelaksanaan PKKMB FATISDA UNS sebagai ketua pelaksana, memastikan perencanaan, koordinasi tim, dan eksekusi acara berjalan rapi.",
    wins: [
      "Memimpin rangkaian kegiatan selama 5 bulan",
      "Mengkoordinasikan tim lintas divisi dari persiapan hingga evaluasi",
      "Menjaga kualitas acara, komunikasi, dan ritme kerja panitia",
    ],
    tags: ["Leadership", "Communication", "Event Management", "Teamwork"],
    aksara: "ꦧ",
    accent: "#a73522",
  },
  {
    id: "04",
    roleLines: ["Assistant", "Data Structure", "Algorithm"],
    company: "FATISDA UNS · Part-time · On-site",
    period: "Mar 2025 — Jul 2025",
    year: "2025",
    desc: "Mendukung pembelajaran mata kuliah Data Structure and Algorithm sebagai assistant, membantu mahasiswa memahami materi teknis dan latihan pemrograman.",
    wins: [
      "Mendampingi kelas secara on-site selama 5 bulan",
      "Membantu diskusi Java, struktur data, dan penyelesaian soal",
      "Menguatkan kemampuan public speaking dalam konteks akademik",
    ],
    tags: ["Java", "Data Structure", "Algorithm", "Public Speaking"],
    aksara: "ꦒ",
    accent: "#d6a44b",
  },
  {
    id: "05",
    roleLines: ["Staff", "Interests &", "Talents"],
    company: "HIMASTER UNS · Surakarta · On-site",
    period: "Feb 2024 — Dec 2024",
    year: "2024",
    desc: "Berkontribusi di Divisi Minat dan Bakat HIMASTER UNS dalam perencanaan serta pelaksanaan program untuk mahasiswa informatika.",
    wins: [],
    tags: ["Communication", "Teamwork", "Organization"],
    aksara: "ꦲ",
    accent: "#d6a44b",
  },
  {
    id: "06",
    roleLines: ["Staff", "PKKMB Wonder", "Quest 2024"],
    company: "HIMASTER UNS · Surakarta · On-site",
    period: "Sep 2024 — Oct 2024",
    year: "2024",
    desc: "Menjadi bagian dari tim pelaksana PKKMB Wonder Quest 2024, membantu kebutuhan acara dan koordinasi lapangan selama rangkaian kegiatan.",
    wins: [],
    tags: ["Communication", "Teamwork", "Event"],
    aksara: "ꦮ",
    accent: "#a73522",
  },
  {
    id: "07",
    roleLines: ["Staff", "General Affair", "Division"],
    company: "PINGFEST · Pekan Informasi dan Teknologi",
    period: "Mar 2024 — Sep 2024",
    year: "2024",
    desc: "Bergabung di Divisi General Affair PINGFEST untuk mendukung kebutuhan operasional, logistik, dan koordinasi internal acara teknologi.",
    wins: [],
    tags: ["General Affair", "Communication", "Teamwork", "Operations"],
    aksara: "ꦠ",
    accent: "#d6a44b",
  },
];

const FEATURED_IDS   = new Set(["01", "04"]);
const FEATURED       = EXPERIENCES.filter(e =>  FEATURED_IDS.has(e.id));
const SUPPORTING     = EXPERIENCES.filter(e => !FEATURED_IDS.has(e.id));

function Tags({ exp }: { exp: Experience }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {exp.tags.map(tag => (
        <span
          key={tag}
          className="border bg-[#f7efe0]/[0.03] px-2.5 py-1 text-[6.5px] font-black uppercase tracking-[0.14em]"
          style={{ borderColor: exp.accent + "22", color: exp.accent + "72" }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const timelineRef  = useRef<HTMLDivElement>(null);
  const dotRef       = useRef<HTMLDivElement>(null);
  const timelineHRef = useRef(2400);

  // ── featured refs ──────────────────────────────────────────────────────────
  const feat0  = useRef<HTMLDivElement>(null);
  const feat1  = useRef<HTMLDivElement>(null);
  const fms0   = useRef<HTMLDivElement>(null);
  const fms1   = useRef<HTMLDivElement>(null);
  const scan0  = useRef<HTMLDivElement>(null);
  const scan1  = useRef<HTMLDivElement>(null);
  const featRefs = useRef([feat0, feat1]).current;
  const fmsRefs  = useRef([fms0, fms1]).current;
  const scanRefs = useRef([scan0, scan1]).current;

  // ── supporting refs ────────────────────────────────────────────────────────
  const srow0 = useRef<HTMLDivElement>(null);
  const srow1 = useRef<HTMLDivElement>(null);
  const srow2 = useRef<HTMLDivElement>(null);
  const srow3 = useRef<HTMLDivElement>(null);
  const srow4 = useRef<HTMLDivElement>(null);
  const sms0  = useRef<HTMLDivElement>(null);
  const sms1  = useRef<HTMLDivElement>(null);
  const sms2  = useRef<HTMLDivElement>(null);
  const sms3  = useRef<HTMLDivElement>(null);
  const sms4  = useRef<HTMLDivElement>(null);
  const srowRefs = useRef([srow0, srow1, srow2, srow3, srow4]).current;
  const smsRefs  = useRef([sms0, sms1, sms2, sms3, sms4]).current;

  const featTrigYs = useRef<number[]>([99999, 99999]);
  const srowTrigYs = useRef<number[]>([99999, 99999, 99999, 99999, 99999]);
  const scanFired  = useRef([false, false]);

  // ── metrics ────────────────────────────────────────────────────────────────
  const computeMetrics = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    timelineHRef.current = tl.offsetHeight;
    const tlTop = tl.getBoundingClientRect().top + window.scrollY;

    featRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      featTrigYs.current[i] = r.top + window.scrollY - tlTop + r.height / 2;
    });
    srowRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      srowTrigYs.current[i] = r.top + window.scrollY - tlTop + r.height / 2;
    });
  };

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => computeMetrics());
    ro.observe(el);
    return () => ro.disconnect();
  });

  useEffect(() => {
    const t = setTimeout(computeMetrics, 300);
    window.addEventListener("resize", computeMetrics);
    return () => { clearTimeout(t); window.removeEventListener("resize", computeMetrics); };
  });

  // ── scroll ─────────────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const smooth  = useSpring(scrollYProgress, { stiffness: 78, damping: 21, restDelta: 0.001 });
  const dotYMV  = useMotionValue(LINE_PAD);
  const filledH = useTransform(dotYMV, v => Math.max(0, v - LINE_PAD));

  useMotionValueEvent(smooth, "change", (progress) => {
    const h   = timelineHRef.current;
    const dot = LINE_PAD + progress * Math.max(0, h - 2 * LINE_PAD);
    dotYMV.set(dot);

    featRefs.forEach((ref, i) => {
      const dist = Math.abs(dot - featTrigYs.current[i]);
      const prox = Math.max(0, 1 - dist / PROX_FEAT);
      const el   = ref.current;
      const msEl = fmsRefs[i].current;
      const scEl = scanRefs[i].current;

      if (el)   gsap.to(el,   { opacity: 0.38 + prox * 0.62, duration: 0.55, ease: "power2.out", overwrite: "auto" });
      if (msEl) gsap.to(msEl, { scale: 1 + prox * 1.2, opacity: 0.18 + prox * 0.82, duration: 0.4, ease: "power2.out", overwrite: "auto" });

      if (scEl && prox > 0.85 && !scanFired.current[i]) {
        scanFired.current[i] = true;
        gsap.fromTo(scEl,
          { scaleX: 0, opacity: 0.8, transformOrigin: "left" },
          { scaleX: 1, opacity: 0, duration: 0.8, ease: "power2.inOut" }
        );
      }
      if (prox < 0.4) scanFired.current[i] = false;
    });

    srowRefs.forEach((ref, i) => {
      const dist = Math.abs(dot - srowTrigYs.current[i]);
      const prox = Math.max(0, 1 - dist / PROX_ROW);
      const el   = ref.current;
      const msEl = smsRefs[i].current;

      if (el)   gsap.to(el,   { x: prox * MAX_ROW_SHIFT, opacity: 0.32 + prox * 0.68, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      if (msEl) gsap.to(msEl, { scale: 1 + prox * 0.8, opacity: 0.18 + prox * 0.82, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
  });

  // ── comet flash ────────────────────────────────────────────────────────────
  useEffect(() => {
    const comet = dotRef.current?.querySelector<HTMLElement>(".exp-comet");
    if (!comet) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.6 });
    tl.fromTo(comet,
      { scaleY: 0, opacity: 0.9, transformOrigin: "bottom" },
      { scaleY: 1, opacity: 0,   duration: 0.55, ease: "power2.out" }
    );
    return () => { tl.kill(); };
  }, []);

  // ── section bg parallax ────────────────────────────────────────────────────
  const { scrollYProgress: secProg } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY     = useTransform(secProg, [0, 1], [-60, 60]);
  const bgRot   = useTransform(secProg, [0, 1], [-2, 2]);
  const ruleScX = useTransform(secProg, [0.05, 0.28], [0, 1]);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-30 overflow-hidden bg-[#0f0c09] px-5 py-24 md:px-8 lg:py-32"
      style={{ boxShadow: "0 -16px 64px rgba(0,0,0,0.45)", borderRadius: "28px 28px 0 0" }}
    >
      {/* bg aksara */}
      <motion.p
        className="pointer-events-none absolute -right-12 top-4 select-none font-black leading-none text-[#d6a44b]"
        style={{ y: bgY, rotate: bgRot, fontSize: "52vw", opacity: 0.01 }}
        aria-hidden
      >
        ꦱ
      </motion.p>

      {/* top rule */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-[#d6a44b]/40"
        style={{ scaleX: ruleScX }}
      />

      {/* grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: "linear-gradient(#d6a44b 1px, transparent 1px), linear-gradient(90deg, #d6a44b 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-12 grid gap-8 lg:grid-cols-[0.55fr_1fr]"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="flex items-center gap-2.5 text-[8.5px] font-black uppercase tracking-[0.28em] text-[#d6a44b]">
              <span className="h-px w-5 bg-[#d6a44b]/60" />
              05 · Pengalaman
            </p>
            <h2
              className="mt-5 font-black leading-[0.9]"
              style={{ fontSize: "clamp(2.4rem, 5.6vw, 6rem)" }}
            >
              Experience
              <br />
              <span className="font-display italic text-[#d6a44b]">that matters.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-5">
            <div className="flex gap-10">
              {[["7", "Pengalaman"], ["2", "Spotlight"], ["2024–25", "Timeline"]].map(([n, l]) => (
                <div key={l}>
                  <p className="text-[2.2rem] font-black leading-none text-[#d6a44b]">{n}</p>
                  <p className="mt-1 text-[8px] font-black uppercase tracking-[0.2em] text-[#4b3f30]">{l}</p>
                </div>
              ))}
            </div>
            <p className="max-w-2xl text-sm font-medium leading-[1.9] text-[#8d8170]">
              Dua pengalaman utama sebagai spotlight: membangun web PT Esize dan mendampingi kelas Data Structure. Lima pengalaman organisasi mendukung profil leadership, komunikasi, dan teamwork.
            </p>
          </div>
        </motion.div>

        {/* ── MARQUEE ─────────────────────────────────────────────────────── */}
        <div className="mb-16 overflow-hidden border-y border-[#f7efe0]/6 py-4">
          <div className="marquee-track flex items-center">
            {[...MARQUEE_ROLES, ...MARQUEE_ROLES].map((item, i) => (
              <span
                key={i}
                className="mx-12 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.26em] text-[#3b3028]"
              >
                <span className="mr-4 text-[#d6a44b]/40">ꦱ</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── TIMELINE AREA ───────────────────────────────────────────────── */}
        <div ref={timelineRef} className="relative">

          {/* left vertical line + dot — desktop only ──────────────────────── */}
          <div className="pointer-events-none absolute inset-y-0 hidden lg:block" style={{ left: 0, width: 0 }} aria-hidden>

            {/* track */}
            <div
              className="absolute w-px"
              style={{ left: 24, top: LINE_PAD, bottom: LINE_PAD, background: "#1e1a16", transform: "translateX(-50%)" }}
            />

            {/* gold filled */}
            <motion.div
              className="absolute w-px origin-top"
              style={{
                left: 24,
                top: LINE_PAD,
                height: filledH,
                background: "linear-gradient(to bottom, #d6a44b, #d6a44b44)",
                transform: "translateX(-50%)",
              }}
            />

            {/* glowing dot */}
            <motion.div
              ref={dotRef}
              className="absolute"
              style={{ left: 24, top: dotYMV, marginTop: -5 }}
            >
              <div
                className="exp-comet absolute left-1/2 w-px -translate-x-1/2"
                style={{ bottom: "50%", height: 48, background: "linear-gradient(to top, #d6a44b, transparent)", transformOrigin: "bottom" }}
              />
              <motion.div
                className="absolute rounded-full bg-[#d6a44b]"
                style={{ width: 22, height: 22, left: -11, top: -11 }}
                animate={{ scale: [1, 2.6, 3.4], opacity: [0.5, 0.12, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute rounded-full bg-[#d6a44b]"
                style={{ width: 14, height: 14, left: -7, top: -7 }}
                animate={{ scale: [1, 1.9, 2.5], opacity: [0.4, 0.1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.38 }}
              />
              <div
                className="relative rounded-full bg-[#d6a44b]"
                style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4, boxShadow: "0 0 16px 6px #d6a44b80, 0 0 5px 1px #d6a44b" }}
              />
              <div
                className="absolute rounded-full bg-[#fff7ea]"
                style={{ width: 3, height: 3, left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
              />
            </motion.div>
          </div>

          {/* ── FEATURED CARDS ──────────────────────────────────────────────── */}
          <div className="mb-14 space-y-5">
            {FEATURED.map((exp, index) => (
              <div
                key={exp.id}
                className="lg:grid lg:grid-cols-[48px_1fr] lg:items-center"
              >
                {/* milestone dot */}
                <div className="hidden items-center justify-center lg:flex">
                  <div ref={[fms0, fms1][index]} style={{ opacity: 0.18 }}>
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ background: exp.accent, boxShadow: `0 0 10px 4px ${exp.accent}55` }}
                    />
                  </div>
                </div>

                {/* wrapper — GSAP drives opacity */}
                <div ref={[feat0, feat1][index]} style={{ opacity: 0.38 }}>
                  <motion.article
                    className="relative overflow-hidden border"
                    style={{ borderColor: exp.accent + "28", background: "#100d0a" }}
                    whileHover={{ y: -4, transition: { duration: 0.22 } }}
                  >
                    {/* GSAP scan line */}
                    <div
                      ref={[scan0, scan1][index]}
                      className="pointer-events-none absolute inset-x-0 h-px"
                      style={{
                        top: "50%",
                        background: `linear-gradient(to right, transparent 0%, ${exp.accent} 50%, transparent 100%)`,
                        transformOrigin: "left",
                        transform: "scaleX(0)",
                        opacity: 0,
                      }}
                    />

                    {/* top accent bar */}
                    <div
                      className="absolute left-0 top-0 h-[2px] w-full"
                      style={{ background: `linear-gradient(to right, ${exp.accent}, transparent 60%)` }}
                    />

                    {/* grid paper bg */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-[0.028]"
                      style={{
                        backgroundImage: `linear-gradient(${exp.accent} 1px, transparent 1px), linear-gradient(90deg, ${exp.accent} 1px, transparent 1px)`,
                        backgroundSize: "28px 28px",
                      }}
                    />

                    <div className="grid lg:grid-cols-[0.42fr_0.58fr]">

                      {/* LEFT — giant role typography */}
                      <div className="relative flex flex-col justify-end overflow-hidden p-8 lg:min-h-[400px] lg:p-10">
                        <motion.p
                          className="pointer-events-none absolute -left-4 bottom-0 select-none font-black leading-none"
                          style={{ color: exp.accent, fontSize: "clamp(11rem, 20vw, 18rem)", opacity: 0.046 }}
                          animate={{ y: [0, -12, 0], rotate: [0, -1.2, 0] }}
                          transition={{ duration: 8 + index * 1.5, repeat: Infinity, ease: "easeInOut" }}
                          aria-hidden
                        >
                          {exp.aksara}
                        </motion.p>

                        <div className="relative">
                          <p
                            className="mb-4 text-[8px] font-black uppercase tracking-[0.28em]"
                            style={{ color: exp.accent + "80" }}
                          >
                            Spotlight · {exp.id}
                          </p>
                          {exp.roleLines.map((line, i) => (
                            <p
                              key={line}
                              className="font-black uppercase leading-[0.88]"
                              style={{
                                color: i === 0 ? exp.accent : "#fff7ea",
                                fontSize: "clamp(1.9rem, 3vw, 3.2rem)",
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* RIGHT — details */}
                      <div
                        className="flex flex-col justify-between border-t p-8 lg:border-l lg:border-t-0 lg:p-10"
                        style={{ borderColor: exp.accent + "14" }}
                      >
                        <div>
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <p className="max-w-[42ch] text-[0.65rem] font-black uppercase tracking-[0.12em] text-[#6f6251]">
                              {exp.company}
                            </p>
                            <p
                              className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em]"
                              style={{ color: exp.accent + "66" }}
                            >
                              {exp.period}
                            </p>
                          </div>
                          <div className="mb-5 h-px bg-[#f7efe0]/8" />
                          <p className="text-sm font-medium leading-[1.85] text-[#8d8170]">{exp.desc}</p>
                        </div>

                        <div className="mt-6 space-y-4">
                          <ul className="grid gap-2.5">
                            {exp.wins.map(win => (
                              <li key={win} className="flex gap-3 text-xs font-semibold leading-relaxed text-[#b4a68f]">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ background: exp.accent }} />
                                <span>{win}</span>
                              </li>
                            ))}
                          </ul>
                          <Tags exp={exp} />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              </div>
            ))}
          </div>

          {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
          <motion.div
            className="mb-8 flex items-center gap-5 lg:pl-[48px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid h-8 w-8 place-items-center border border-[#d6a44b]/20 bg-[#d6a44b]/[0.08] text-sm font-black text-[#d6a44b]">
              ꦏ
            </div>
            <p className="shrink-0 text-sm font-black text-[#fff7ea]">Leadership & Organization</p>
            <div className="h-px flex-1 bg-[#f7efe0]/10" />
            <p className="hidden text-[7px] font-black uppercase tracking-[0.22em] text-[#4b3f30] sm:block">
              {SUPPORTING.length} entries
            </p>
          </motion.div>

          {/* ── SUPPORTING ROWS ─────────────────────────────────────────────── */}
          <div>
            {SUPPORTING.map((exp, index) => (
              <div
                key={exp.id}
                className="lg:grid lg:grid-cols-[48px_1fr] lg:items-start"
              >
                {/* milestone dot */}
                <div className="hidden items-start justify-center pt-[22px] lg:flex">
                  <div ref={[sms0, sms1, sms2, sms3, sms4][index]} style={{ opacity: 0.18 }}>
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: exp.accent, boxShadow: `0 0 8px 3px ${exp.accent}44` }}
                    />
                  </div>
                </div>

                {/* row wrapper — GSAP drives opacity + x */}
                <div ref={[srow0, srow1, srow2, srow3, srow4][index]} style={{ opacity: 0.32 }}>
                  <motion.article
                    className="group relative border-b border-[#f7efe0]/[0.06]"
                    whileHover={{ backgroundColor: exp.accent + "08" }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* left accent bar on hover */}
                    <div
                      className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"
                      style={{ background: `linear-gradient(to bottom, ${exp.accent}, transparent)` }}
                    />

                    <div className="flex items-start gap-5 px-5 py-5">
                      {/* aksara decoration */}
                      <span
                        className="hidden shrink-0 font-black sm:block"
                        style={{ color: exp.accent + "1e", fontSize: "2.2rem", lineHeight: 1 }}
                        aria-hidden
                      >
                        {exp.aksara}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span
                            className="text-[7px] font-black uppercase tracking-[0.22em]"
                            style={{ color: exp.accent + "50" }}
                          >
                            {exp.id}
                          </span>
                          <h3 className="text-base font-black uppercase leading-tight text-[#fff7ea]">
                            {exp.roleLines.join(" ")}
                          </h3>
                        </div>
                        <p className="mt-0.5 text-[0.63rem] font-black uppercase tracking-[0.1em] text-[#4b3f30]">
                          {exp.company}
                        </p>
                        <p className="mt-2 max-w-[68ch] text-[0.72rem] font-medium leading-[1.75] text-[#5a4f40]">
                          {exp.desc}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2.5">
                        <span
                          className="border px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.16em]"
                          style={{ borderColor: exp.accent + "20", color: exp.accent + "70" }}
                        >
                          {exp.period.includes("—") ? exp.period.split("—")[0].trim() : exp.year}
                        </span>
                        <div className="hidden flex-wrap justify-end gap-1 sm:flex">
                          {exp.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="border bg-[#f7efe0]/[0.02] px-2 py-0.5 text-[6px] font-black uppercase tracking-[0.12em]"
                              style={{ borderColor: exp.accent + "18", color: exp.accent + "58" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </div>
              </div>
            ))}
          </div>

        </div>{/* /timeline */}
      </div>
    </section>
  );
}
