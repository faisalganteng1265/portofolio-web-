import Image from "next/image";
import ProjectsSection from "./components/ProjectsSection";
import BatikShaderBg from "./components/BatikShaderBg";
import ScrollHero from "./components/ScrollHero";

const skillBento = [
  { label: "React",       span: "col-span-2", aksara: "ꦫ", desc: "Library UI utama" },
  { label: "Next.js",     span: "col-span-1", aksara: "ꦤ", desc: "Full-stack framework" },
  { label: "TypeScript",  span: "col-span-1", aksara: "ꦠ", desc: "Type safety" },
  { label: "Tailwind CSS",span: "col-span-1", aksara: "ꦕ", desc: "Utility CSS" },
  { label: "Git",         span: "col-span-1", aksara: "ꦒ", desc: "Version control" },
  { label: "Figma",       span: "col-span-2", aksara: "ꦥ", desc: "UI & Prototyping" },
  { label: "Vercel",      span: "col-span-1", aksara: "ꦮ", desc: "Deploy & hosting" },
  { label: "VS Code",     span: "col-span-1", aksara: "ꦏ", desc: "Primary editor" },
  { label: "HTML / CSS",  span: "col-span-1", aksara: "ꦲ", desc: "Web fundamentals" },
  { label: "Performance", span: "col-span-1", aksara: "ꦱ", desc: "Web Vitals" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#100d0a] text-[#f7efe0]">
      {/* ─── HERO ─────────────────────────────────────── */}
      <ScrollHero />

      {/* ─── ABOUT ────────────────────────────────────── */}
      <section
        id="tentang"
        className="relative overflow-hidden bg-[#100d0a] px-5 py-20 md:px-8 lg:py-32"
      >
        <div className="pointer-events-none absolute -right-12 top-0 text-[20vw] font-black leading-none text-[#d6a44b] opacity-[0.028]" aria-hidden="true">
          ꦄ
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* label */}
          <p className="reveal mb-12 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.28em] text-[#d6a44b]">
            <span className="h-px w-8 bg-[#d6a44b]/60" />
            Tentang Saya
          </p>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            {/* photo / ornament */}
            <div className="reveal">
              <div className="relative aspect-[4/5] overflow-hidden">
                {/* batik border frame */}
                <div className="absolute inset-0 border-[1.5px] border-[#d6a44b]/22 z-10 pointer-events-none" />
                <div className="absolute inset-3 border border-[#d6a44b]/14 z-10 pointer-events-none" />

                <Image
                  src="/assets/wayang-kulit.jpg"
                  alt="Wayang Kulit"
                  fill
                  sizes="(min-width: 1024px) 36vw, 90vw"
                  className="object-cover opacity-45 saturate-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a]/88 via-[#100d0a]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#100d0a]/30 to-transparent" />

                {/* big aksara overlay */}
                <p
                  className="pointer-events-none absolute inset-0 flex items-center justify-center font-black text-[#d6a44b] opacity-[0.07] select-none"
                  style={{ fontSize: "clamp(10rem,20vw,18rem)" }}
                  aria-hidden="true"
                >
                  ꦄ
                </p>

                {/* name plate */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#d6a44b]">
                    ꦄꦧꦶꦪꦸ ꦥꦻꦱꦭ꧀ ꦲꦏ꧀ꦩꦭ꧀
                  </p>
                  <p className="mt-1 text-base font-black text-[#fff7ea]">
                    Abiyyu Faisal Akmal
                  </p>
                  <p className="text-xs font-medium text-[#9b8f7d]">
                    Frontend Developer · Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* text content */}
            <div className="flex flex-col justify-center">
              <h2 className="reveal text-[clamp(2rem,4.5vw,3.8rem)] font-black leading-[1.04] text-[#fff7ea]">
                Halo, saya Abiyyu.{" "}
                <span className="text-[#d6a44b]">Frontend developer</span>{" "}
                yang berpikir dengan rasa.
              </h2>

              <p className="reveal mt-6 max-w-[52ch] text-[0.96rem] font-medium leading-8 text-[#9b8f7d]">
                Mahasiswa IT yang percaya bahwa kode yang baik bukan hanya
                soal fungsi—tapi juga tentang perasaan yang muncul saat
                pengguna pertama kali melihat halaman itu. Saya membawa
                warisan visual Nusantara ke dalam antarmuka digital yang
                modern dan usable.
              </p>

              <div className="java-rule reveal mt-8" />

              {/* stat cards */}
              <div className="reveal mt-8 grid grid-cols-3 gap-3">
                {[
                  ["3+", "Proyek", "Selesai & published"],
                  ["2+", "Tahun", "Belajar & build"],
                  ["∞", "Rasa", "Jawa dalam kode"],
                ].map(([num, title, sub]) => (
                  <div
                    key={title}
                    className="border border-[#f7efe0]/10 bg-[#18120e] p-4"
                  >
                    <p className="text-2xl font-black text-[#d6a44b]">{num}</p>
                    <p className="mt-0.5 text-sm font-black text-[#fff7ea]">
                      {title}
                    </p>
                    <p className="text-[9px] font-medium text-[#6b5f4f]">
                      {sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* tags */}
              <div className="reveal mt-6 flex flex-wrap gap-2">
                {["Jawa", "IT Student", "Web Dev", "UI Design", "Open Source"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="border border-[#f7efe0]/10 bg-[#1a1410] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#9b8f7d]"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────── */}
      <ProjectsSection />

      {/* ─── SKILLS ───────────────────────────────────── */}
      <section className="relative bg-[#f5f0e8] px-5 py-20 md:px-8 lg:py-28">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-[#d6a44b]/30 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <p className="reveal mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#a73522]">
            <span className="h-px w-6 bg-[#a73522]/60" />
            Stack & Alat
          </p>
          <h2 className="reveal mb-10 text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.04] text-[#1a100a]">
            Teknologi yang saya pakai sehari-hari.
          </h2>

          {/* bento skill grid */}
          <div className="grid auto-rows-[88px] grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {skillBento.map((skill, i) => (
              <div
                key={skill.label}
                className={`skill-card reveal group relative overflow-hidden border border-[#1a100a]/10 bg-white p-4 transition-all duration-300 hover:border-[#d6a44b]/50 hover:bg-[#fdf8f2] ${
                  i % 5 === 0 ? "col-span-2" : ""
                }`}
              >
                {/* aksara bg */}
                <p
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none font-black leading-none text-[#d6a44b] opacity-[0.10] transition-opacity duration-300 group-hover:opacity-[0.18]"
                  style={{ fontSize: "4.5rem" }}
                  aria-hidden="true"
                >
                  {skill.aksara}
                </p>
                <p className="relative text-sm font-black text-[#2a1a0e] group-hover:text-[#a73522]">
                  {skill.label}
                </p>
                <p className="relative mt-1 text-[9px] font-medium text-[#7a6a58]">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0e0c0a] px-5 py-20 md:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* image */}
          <div className="reveal relative min-h-[380px] overflow-hidden border border-[#f7efe0]/8 lg:order-2">
            <Image
              src="/assets/kraton-yogyakarta.jpg"
              alt="Pendopo Keraton Yogyakarta"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover opacity-55 saturate-[0.6]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0a] via-[#0e0c0a]/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
                Pendopo mindset
              </p>
              <p className="mt-1 text-xs font-medium text-[#6b5f4f]">
                Tenang di permukaan, disiplin di struktur
              </p>
            </div>
          </div>

          {/* steps */}
          <div className="flex flex-col justify-center lg:order-1">
            <p className="reveal flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
              <span className="h-px w-6 bg-[#d6a44b]/60" />
              Cara Kerja
            </p>
            <h2 className="reveal mt-5 text-[clamp(2rem,4vw,3.2rem)] font-black leading-[1.06]">
              Tenang di permukaan, disiplin di struktur.
            </h2>

            <div className="mt-8 grid gap-0">
              {[
                [
                  "ꦱ",
                  "Riset Cepat",
                  "Membaca konteks, target pengguna, dan visual brand sebelum membuat satu baris kode.",
                ],
                [
                  "ꦧ",
                  "Build Terukur",
                  "Komponen dibuat responsif, konsisten, dan mudah diganti kontennya tanpa merombak struktur.",
                ],
                [
                  "ꦥ",
                  "Polish & Launch",
                  "Spacing, motion, kontras, dan performa dicek sampai halaman terasa matang dan siap tayang.",
                ],
              ].map(([aksara, title, text]) => (
                <div
                  key={title}
                  className="reveal group border-t border-[#f7efe0]/10 py-6 first:border-t-0"
                >
                  <div className="flex gap-5">
                    <span className="mt-0.5 shrink-0 font-black text-[#d6a44b]/50 text-2xl leading-none group-hover:text-[#d6a44b] transition-colors">
                      {aksara}
                    </span>
                    <div>
                      <h3 className="font-black text-[#fff7ea]">{title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-[#9b8f7d]">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────── */}
      <section
        id="kontak"
        className="relative overflow-hidden border-t border-[#f7efe0]/8 bg-[#0d0b09] px-5 py-20 md:px-8 lg:py-28"
      >
        {/* WebGL: animated batik GLSL shader background */}
        <BatikShaderBg />

        <div
          className="pointer-events-none absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none font-black leading-none text-[#a73522] opacity-[0.05]"
          style={{ fontSize: "clamp(14rem,28vw,32rem)" }}
          aria-hidden="true"
        >
          ꦱ
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="reveal grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d6a44b]">
                ꦱꦩ꧀ꦧꦸꦁꦫꦱ · Sambung rasa
              </p>
              <h2 className="mt-5 font-black leading-[0.96]" style={{ fontSize: "clamp(2.2rem,6.5vw,5.8rem)" }}>
                Mari bangun web yang punya karakter.
              </h2>
              <p className="mt-6 max-w-[44ch] text-[0.96rem] font-medium leading-8 text-[#9b8f7d]">
                Terbuka untuk proyek freelance, kolaborasi, posisi frontend,
                atau sekadar ngobrol soal web dan budaya Jawa.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  className="btn-shimmer bg-[#d6a44b] px-7 py-3.5 text-sm font-black text-[#100d0a]"
                  href="mailto:faisalakmal2105@gmail.com"
                >
                  faisalakmal2105@gmail.com
                </a>
                <a
                  className="border border-[#f7efe0]/14 bg-[#f7efe0]/6 px-7 py-3.5 text-sm font-black text-[#f7efe0] backdrop-blur transition-colors hover:border-[#f7efe0]/30"
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className="border border-[#f7efe0]/14 bg-[#f7efe0]/6 px-7 py-3.5 text-sm font-black text-[#f7efe0] backdrop-blur transition-colors hover:border-[#f7efe0]/30"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* right panel */}
            <div className="self-end">
              <div className="border border-[#f7efe0]/8 bg-[#18120e] p-7">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a44b]">
                  Response time
                </p>
                <p className="mt-2 text-2xl font-black text-[#fff7ea]">
                  {"< 24 jam"}
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    ["Status", "Available for work"],
                    ["Lokasi", "Indonesia · Remote ok"],
                    ["Waktu", "WIB (UTC+7)"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between border-b border-[#f7efe0]/6 pb-3 text-xs"
                    >
                      <span className="font-black uppercase tracking-[0.16em] text-[#4b3f30]">
                        {k}
                      </span>
                      <span className="font-medium text-[#c9b99d]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────── */}
      <footer className="border-t border-[#f7efe0]/8 bg-[#0a0806] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center border border-[#d6a44b]/30 bg-[#2a1710] text-sm font-black text-[#d6a44b]">
              ꦗ
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#4b3f30]">
              Abiyyu Faisal Akmal · 2026
            </span>
          </div>
          <p className="text-[10px] font-medium text-[#4b3f30]">
            ꦲꦤꦕꦫꦏ · Built with Next.js · Yogyakarta, Indonesia
          </p>
        </div>
      </footer>
    </main>
  );
}
