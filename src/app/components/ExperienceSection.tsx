"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  logoSrc?: string;
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
    logoSrc: "/experience/pkkmb.png",
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
    id: "06",
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
    id: "07",
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

const FEATURED_IDS = new Set(["01", "04"]);
const FEATURED_EXPERIENCES = EXPERIENCES.filter((exp) => FEATURED_IDS.has(exp.id));
const SUPPORTING_EXPERIENCES = EXPERIENCES.filter((exp) => !FEATURED_IDS.has(exp.id));

function Tags({ exp }: { exp: Experience }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {exp.tags.map((tag) => (
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

function FeaturedCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <motion.article
      className="group relative min-h-[520px] overflow-hidden border bg-[#100d0a] p-6 md:p-8"
      style={{
        borderColor: exp.accent + "38",
        boxShadow: `0 24px 80px ${exp.accent}10`,
      }}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: `linear-gradient(135deg, ${exp.accent}18, transparent 34%, ${exp.accent}0d 72%, transparent)`,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(${exp.accent} 1px, transparent 1px), linear-gradient(90deg, ${exp.accent} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ background: `linear-gradient(to right, ${exp.accent}, transparent)` }}
      />
      <motion.p
        className="pointer-events-none absolute -right-4 bottom-0 select-none font-black leading-none"
        style={{ color: exp.accent, fontSize: "clamp(9rem, 18vw, 16rem)", opacity: 0.055 }}
        animate={{ y: [0, -10, 0], rotate: [0, -1.5, 0] }}
        transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        {exp.aksara}
      </motion.p>

      <div className="relative flex h-full flex-col justify-between gap-12">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p
              className="text-[8px] font-black uppercase tracking-[0.28em]"
              style={{ color: exp.accent + "aa" }}
            >
              Spotlight · {exp.id}
            </p>
            <p className="mt-3 max-w-[38ch] text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#6f6251]">
              {exp.company}
            </p>
          </div>
          <p
            className="shrink-0 text-right text-[8px] font-black uppercase tracking-[0.2em]"
            style={{ color: exp.accent + "75" }}
          >
            {exp.period}
          </p>
        </div>

        <div>
          {exp.roleLines.map((line, i) => (
            <p
              key={line}
              className="font-black uppercase leading-[0.9]"
              style={{
                color: i === 0 ? exp.accent : "#fff7ea",
                fontSize: "clamp(2.1rem, 4vw, 4.2rem)",
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="space-y-5">
          <p className="max-w-[56ch] text-sm font-medium leading-[1.85] text-[#8d8170]">
            {exp.desc}
          </p>
          <ul className="grid gap-2">
            {exp.wins.map((win) => (
              <li key={win} className="flex gap-3 text-xs font-semibold leading-relaxed text-[#b4a68f]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0" style={{ background: exp.accent }} />
                <span>{win}</span>
              </li>
            ))}
          </ul>
          <Tags exp={exp} />
        </div>
      </div>
    </motion.article>
  );
}

function SupportCard({ exp, index }: { exp: Experience; index: number }) {
  return (
    <motion.article
      className="group relative min-h-[250px] overflow-hidden border bg-[#100d0a] p-5"
      style={{ borderColor: exp.accent + "24" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -6,
        borderColor: exp.accent + "5c",
        boxShadow: `0 20px 60px ${exp.accent}12`,
        transition: { duration: 0.22 },
      }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-px opacity-70"
        style={{ background: `linear-gradient(to bottom, ${exp.accent}, transparent)` }}
      />
      <motion.p
        className="pointer-events-none absolute -right-2 bottom-0 select-none font-black leading-none"
        style={{ color: exp.accent, fontSize: "7rem", opacity: 0.04 }}
        whileHover={{ x: -8, opacity: 0.075 }}
        transition={{ duration: 0.28 }}
        aria-hidden
      >
        {exp.aksara}
      </motion.p>

      <div className="relative flex h-full flex-col justify-between gap-8">
        <div className="flex items-start gap-4">
          <div
            className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden border text-3xl font-black"
            style={{
              borderColor: exp.accent + "30",
              background: exp.accent + "10",
              color: exp.accent,
            }}
          >
            {exp.logoSrc ? (
              <Image
                src={exp.logoSrc}
                alt={`${exp.roleLines.join(" ")} logo`}
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            ) : (
              exp.aksara
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-black uppercase leading-[1.05] text-[#fff7ea]">
                {exp.roleLines.join(" ")}
              </h3>
              <span
                className="shrink-0 border px-2 py-1 text-[7px] font-black uppercase tracking-[0.16em]"
                style={{
                  borderColor: exp.accent + "20",
                  background: exp.accent + "0d",
                  color: exp.accent + "a8",
                }}
              >
                {exp.year}
              </span>
            </div>
            <p
              className="mt-2 text-[0.68rem] font-black uppercase tracking-[0.13em]"
              style={{ color: exp.accent + "95" }}
            >
              {exp.period}
            </p>
            <div className="my-4 h-px bg-[#f7efe0]/10" />
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#6f6251]">
              {exp.company}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium leading-[1.75] text-[#8d8170]">
            {exp.desc}
          </p>
          <Tags exp={exp} />
        </div>
      </div>
    </motion.article>
  );
}

function TimelineRail() {
  const milestones = [
    { label: "2024", detail: "Organization", accent: "#d6a44b" },
    { label: "2025", detail: "Teaching", accent: "#d6a44b" },
    { label: "2025", detail: "Internship", accent: "#a73522" },
  ];

  return (
    <motion.div
      className="my-12 border-y border-[#f7efe0]/10 py-5"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {milestones.map((item, index) => (
          <div key={`${item.label}-${item.detail}`} className="contents">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center border text-[8px] font-black uppercase tracking-[0.12em]"
                style={{
                  borderColor: item.accent + "30",
                  background: item.accent + "0d",
                  color: item.accent,
                }}
              >
                {item.label}
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.22em] text-[#6f6251]">
                {item.detail}
              </span>
            </div>
            {index < milestones.length - 1 && (
              <div className="hidden h-px w-16 bg-[#f7efe0]/12 md:block" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="mb-7 flex items-center gap-4">
      <div className="grid h-8 w-8 place-items-center border border-[#d6a44b]/20 bg-[#d6a44b]/10 text-sm font-black text-[#d6a44b]">
        ꦏ
      </div>
      <p className="shrink-0 text-sm font-black text-[#fff7ea]">
        Leadership & Organization
      </p>
      <div className="h-px flex-1 bg-[#f7efe0]/12" />
      <p className="hidden text-[7px] font-black uppercase tracking-[0.22em] text-[#4b3f30] sm:block">
        {SUPPORTING_EXPERIENCES.length} entries
      </p>
    </div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const ruleScale = useTransform(scrollYProgress, [0.08, 0.34], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-30 overflow-hidden bg-[#0f0c09] px-5 py-24 md:px-8 lg:py-32"
      style={{
        boxShadow: "0 -16px 64px rgba(0,0,0,0.45)",
        borderRadius: "28px 28px 0 0",
      }}
    >
      <motion.p
        className="pointer-events-none absolute -right-12 top-8 select-none font-black leading-none text-[#d6a44b]"
        style={{ y: bgY, rotate: bgRotate, fontSize: "48vw", opacity: 0.012 }}
        aria-hidden
      >
        ꦱ
      </motion.p>
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-[#d6a44b]/40"
        style={{ scaleX: ruleScale }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#d6a44b 1px, transparent 1px), linear-gradient(90deg, #d6a44b 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-14 grid gap-8 lg:grid-cols-[0.55fr_1fr]"
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
          <p className="max-w-2xl self-end text-sm font-medium leading-[1.9] text-[#8d8170] md:text-base">
            Dua pengalaman utama ditempatkan sebagai fokus: membangun web untuk PT Esize Surakarta
            dan mendampingi kelas Data Structure and Algorithm. Pengalaman organisasi ditampilkan
            ringkas sebagai pendukung leadership, komunikasi, dan kerja tim.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {FEATURED_EXPERIENCES.map((exp, index) => (
            <FeaturedCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>

        <TimelineRail />

        <div>
          <SectionDivider />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SUPPORTING_EXPERIENCES.map((exp, index) => (
              <SupportCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
