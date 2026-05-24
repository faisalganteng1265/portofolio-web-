"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import gsap from "gsap";

// ── data ─────────────────────────────────────────────────────────────────────
const EXPERIENCES = [
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
    roleLines: ["Mentor", "Data Structure", "Algorithm"],
    company: "BEM FATISDA UNS · Remote",
    period: "Apr 2025",
    year: "2025",
    desc: "Menjadi mentor live class Data Structure and Algorithm untuk membantu peserta memahami konsep dasar, pola penyelesaian soal, dan implementasi kode.",
    wins: [
      "Membawakan materi struktur data dan algoritma secara remote",
      "Mendampingi peserta melalui contoh kasus dan diskusi langsung",
      "Menyederhanakan konsep teknis menjadi materi yang mudah diikuti",
    ],
    tags: ["Data Structure", "Algorithm", "Mentoring", "Public Speaking"],
    aksara: "ꦭ",
    accent: "#d6a44b",
  },
  {
    id: "03",
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
    id: "04",
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
    id: "05",
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
    id: "06",
    roleLines: ["Staff", "Interests &", "Talents"],
    company: "HIMASTER UNS · Surakarta · On-site",
    period: "Feb 2024 — Dec 2024",
    year: "2024",
    desc: "Berkontribusi di Divisi Minat dan Bakat HIMASTER UNS dalam perencanaan serta pelaksanaan program untuk mahasiswa informatika.",
    wins: [
      "Aktif dalam program kerja divisi selama 11 bulan",
      "Mendukung koordinasi kegiatan dan kebutuhan peserta",
      "Mengembangkan komunikasi, teamwork, dan tanggung jawab organisasi",
    ],
    tags: ["Communication", "Teamwork", "Organization"],
    aksara: "ꦲ",
    accent: "#d6a44b",
  },
  {
    id: "07",
    roleLines: ["Staff", "PKKMB Wonder", "Quest 2024"],
    company: "HIMASTER UNS · Surakarta · On-site",
    period: "Sep 2024 — Oct 2024",
    year: "2024",
    desc: "Menjadi bagian dari tim pelaksana PKKMB Wonder Quest 2024, membantu kebutuhan acara dan koordinasi lapangan selama rangkaian kegiatan.",
    wins: [
      "Mendukung pelaksanaan kegiatan selama 2 bulan",
      "Berkoordinasi dengan tim untuk menjaga acara tetap tertata",
      "Mengasah komunikasi dan kerja sama dalam event kampus",
    ],
    tags: ["Communication", "Teamwork", "Event"],
    aksara: "ꦮ",
    accent: "#a73522",
  },
  {
    id: "08",
    roleLines: ["Staff", "General Affair", "Division"],
    company: "PINGFEST · Pekan Informasi dan Teknologi",
    period: "Mar 2024 — Sep 2024",
    year: "2024",
    desc: "Bergabung di Divisi General Affair PINGFEST untuk mendukung kebutuhan operasional, logistik, dan koordinasi internal acara teknologi.",
    wins: [
      "Berperan dalam operasional kegiatan selama 7 bulan",
      "Membantu kebutuhan teknis dan non-teknis acara",
      "Menjaga komunikasi tim agar pelaksanaan kegiatan berjalan lancar",
    ],
    tags: ["General Affair", "Communication", "Teamwork", "Operations"],
    aksara: "ꦠ",
    accent: "#d6a44b",
  },
];

const N = EXPERIENCES.length;

// ── ExperienceCard ────────────────────────────────────────────────────────────
function ExperienceCard({
  exp,
  isActive,
  index,
}: {
  exp: (typeof EXPERIENCES)[0];
  isActive: boolean;
  index: number;
}) {
  return (
    <motion.div
      className="relative flex-shrink-0 overflow-hidden border"
      style={{
        width: "clamp(280px, 48vw, 660px)",
        height: "78vh",
        background: "#100d0a",
      }}
      animate={{
        borderColor: isActive ? exp.accent + "45" : "rgba(247,239,224,0.06)",
        opacity: isActive ? 1 : 0.35,
        scale: isActive ? 1 : 0.96,
        y: isActive ? 0 : 20,
      }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={isActive ? { scale: 1.014, transition: { duration: 0.25 } } : {}}
    >
      {/* left accent bar */}
      <motion.div
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{
          background: `linear-gradient(to bottom, ${exp.accent}, ${exp.accent}25, transparent)`,
        }}
        animate={{ opacity: isActive ? 1 : 0.15 }}
        transition={{ duration: 0.5 }}
      />

      {/* top border glow when active */}
      <motion.div
        className="absolute left-0 top-0 h-[2px] w-full origin-left"
        style={{ background: `linear-gradient(to right, ${exp.accent}80, transparent)` }}
        animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {/* aksara watermark */}
      <motion.p
        className="pointer-events-none absolute -right-4 bottom-0 select-none font-black leading-none"
        style={{ fontSize: "clamp(8rem, 18vw, 18rem)", color: exp.accent }}
        animate={{ opacity: isActive ? 0.065 : 0.02 }}
        transition={{ duration: 0.7 }}
        aria-hidden
      >
        {exp.aksara}
      </motion.p>

      {/* index marker — decorative */}
      <div
        className="pointer-events-none absolute right-8 top-8 select-none font-black leading-none"
        style={{
          fontSize: "clamp(5rem, 10vw, 10rem)",
          color: exp.accent,
          opacity: 0.04,
        }}
        aria-hidden
      >
        {index + 1}
      </div>

      <div className="relative flex h-full flex-col justify-between p-7 lg:p-10">
        {/* top row */}
        <div className="flex items-start justify-between">
          <span
            className="text-[8px] font-black uppercase tracking-[0.32em]"
            style={{ color: exp.accent + "75" }}
          >
            {exp.id}
          </span>
          <div className="text-right">
            <p className="text-[7px] font-black uppercase tracking-[0.22em] text-[#4b3f30]">
              {exp.company}
            </p>
            <p
              className="mt-1 text-[7px] font-black uppercase tracking-[0.18em]"
              style={{ color: exp.accent + "55" }}
            >
              {exp.period}
            </p>
          </div>
        </div>

        {/* role — large type */}
        <div>
          {exp.roleLines.map((line, i) => (
            <p
              key={i}
              className="font-black leading-[0.88] uppercase"
              style={{
                fontSize: "clamp(1.9rem, 3.6vw, 3.5rem)",
                color: i === 0 ? exp.accent : "#fff7ea",
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* bottom: desc + wins + tags */}
        <div className="space-y-4">
          <p className="max-w-[46ch] text-[0.72rem] font-medium leading-[1.85] text-[#5a4f40]">
            {exp.desc}
          </p>
          <ul className="space-y-1.5">
            {exp.wins.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[0.68rem] font-medium text-[#7a7060]"
              >
                <span
                  className="mt-0.5 flex-shrink-0 text-[7px]"
                  style={{ color: exp.accent + "65" }}
                >
                  ◆
                </span>
                {w}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.tags.map((tag) => (
              <span
                key={tag}
                className="border bg-[#f7efe0]/[0.03] px-2.5 py-1 text-[6px] font-black uppercase tracking-[0.14em]"
                style={{
                  borderColor: exp.accent + "18",
                  color: exp.accent + "55",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const numRef      = useRef<HTMLSpanElement>(null);
  const prevIdx     = useRef(0);

  const [activeIdx, setActiveIdx]       = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // ── scroll setup ───────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 20,
    restDelta: 0.001,
  });

  // compute max horizontal translate after layout
  useEffect(() => {
    const compute = () => {
      if (!trackRef.current) return;
      const totalW = trackRef.current.scrollWidth;
      const vw     = window.innerWidth;
      // leave 40px right breathing room
      setMaxTranslate(-(totalW - vw + 40));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const x = useTransform(smooth, [0, 1], [0, maxTranslate]);

  // track active card index
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.round(v * (N - 1));
    setActiveIdx(Math.max(0, Math.min(N - 1, idx)));
  });

  // ── GSAP: counter roll animation ───────────────────────────────────────────
  useEffect(() => {
    if (!numRef.current) return;
    const direction = activeIdx > prevIdx.current ? 1 : -1;
    prevIdx.current = activeIdx;

    gsap.fromTo(
      numRef.current,
      { y: direction * 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [activeIdx]);

  const curr = EXPERIENCES[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-30"
      style={{ height: `${N * 100 + 10}vh`, background: "#0f0c09" }}
    >
      {/* ── STICKY SHELL ──────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 h-screen overflow-hidden bg-[#0f0c09]"
        style={{
          boxShadow: "0 -16px 64px rgba(0,0,0,0.45)",
          borderRadius: "28px 28px 0 0",
        }}
      >
        {/* ── global aksara watermark ────────────────────────────────────── */}
        <motion.p
          className="pointer-events-none absolute -right-10 top-0 select-none font-black leading-none text-[#d6a44b]"
          style={{ fontSize: "70vh" }}
          animate={{ opacity: curr.accent === "#a73522" ? 0.012 : 0.018 }}
          transition={{ duration: 1 }}
          aria-hidden
        >
          ꦱ
        </motion.p>

        {/* ── LEFT: fixed header column ──────────────────────────────────── */}
        <motion.div
          className="absolute left-8 top-0 z-20 flex h-full flex-col justify-between py-10 lg:left-12"
          style={{ width: "clamp(160px, 18vw, 240px)" }}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* section label */}
          <div>
            <p className="flex items-center gap-2.5 text-[8.5px] font-black uppercase tracking-[0.28em] text-[#d6a44b]">
              <span className="h-px w-5 bg-[#d6a44b]/60" />
              05 · Pengalaman
            </p>
            <h2
              className="mt-5 font-black leading-[0.9]"
              style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.8rem)" }}
            >
              Dari Jogja,
              <br />
              <span className="font-display italic text-[#d6a44b]">ke dunia.</span>
            </h2>
          </div>

          {/* ── counter ────────────────────────────────────────────────────── */}
          <div className="hidden lg:block">
            <div className="overflow-hidden" style={{ height: "clamp(3rem, 5.5vw, 5rem)" }}>
              <span
                ref={numRef}
                className="block font-black leading-none text-[#d6a44b]"
                style={{ fontSize: "clamp(3rem, 5.5vw, 5rem)" }}
              >
                0{activeIdx + 1}
              </span>
            </div>
            <p className="mt-1 text-[7.5px] font-black uppercase tracking-[0.22em] text-[#2e2620]">
              / 0{N} · Pengalaman
            </p>
          </div>

          {/* ── dot navigation ─────────────────────────────────────────────── */}
          <div className="hidden flex-col gap-3 lg:flex">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <motion.div
                  className="h-px"
                  style={{ background: exp.accent, originX: 0 }}
                  animate={{
                    width: i === activeIdx ? 28 : 10,
                    opacity: i === activeIdx ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <motion.span
                  className="text-[6.5px] font-black uppercase tracking-[0.22em]"
                  animate={{ color: i === activeIdx ? exp.accent + "aa" : "#2e2620" }}
                  transition={{ duration: 0.3 }}
                >
                  {exp.id}
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CARDS TRACK ───────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex items-center overflow-visible"
          style={{ paddingLeft: "clamp(200px, 20vw, 280px)" }}
        >
          {/* right fade mask */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-[#0f0c09] to-transparent" />

          <motion.div
            ref={trackRef}
            className="flex items-center gap-7"
            style={{ x }}
          >
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                isActive={i === activeIdx}
                index={i}
              />
            ))}

            {/* end spacer card */}
            <div className="flex-shrink-0" style={{ width: "15vw" }} />
          </motion.div>
        </div>

        {/* ── BOTTOM PROGRESS BAR ───────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-7 lg:px-12">
          <div className="flex items-center gap-4">
            <span className="text-[7px] font-black uppercase tracking-[0.24em] text-[#1e1a16]">
              ꦱ Timeline
            </span>

            {/* progress track */}
            <div className="relative flex-1 h-px bg-[#1e1a16]">
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{ background: curr.accent }}
                animate={{ width: `${((activeIdx + 1) / N) * 100}%` }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />

              {/* milestone dots */}
              {EXPERIENCES.map((exp, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${(i / (N - 1)) * 100}%`, marginLeft: -3 }}
                >
                  <motion.div
                    className="rounded-full"
                    style={{ background: exp.accent, width: 6, height: 6 }}
                    animate={{
                      scale: i === activeIdx ? 2 : 1,
                      opacity: i <= activeIdx ? 1 : 0.18,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  {/* active pulse ring */}
                  {i === activeIdx && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: exp.accent }}
                      animate={{ scale: [1, 2.5, 3.5], opacity: [0.6, 0.2, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.span
              key={curr.year}
              className="text-[7px] font-black uppercase tracking-[0.22em]"
              style={{ color: curr.accent + "70" }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {curr.year}
            </motion.span>
          </div>
        </div>

        {/* ── MOBILE: counter pill ──────────────────────────────────────────── */}
        <div className="absolute right-5 top-5 z-20 lg:hidden">
          <div className="border border-[#d6a44b]/20 bg-[#0f0c09]/80 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#d6a44b]">
              {activeIdx + 1} / {N}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
