import Image from "next/image";
import ProjectsSection from "./components/ProjectsSection";
import BatikShaderBg from "./components/BatikShaderBg";
import ScrollHero from "./components/ScrollHero";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import NameMark from "./components/NameMark";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#100d0a] text-[#f7efe0]">
      <NameMark />
      {/* ─── HERO ─────────────────────────────────────── */}
      <ScrollHero />

      {/* ─── ABOUT ────────────────────────────────────── */}
      <AboutSection />

      {/* ─── PROJECTS ─────────────────────────────────── */}
      <ProjectsSection />

      {/* ─── SKILLS ───────────────────────────────────── */}
      <SkillsSection />

      {/* ─── PROCESS ──────────────────────────────────── */}
      <section className="relative z-20 min-h-screen overflow-hidden bg-[#0e0c0a] px-5 py-20 md:px-8 lg:py-28" style={{ boxShadow: "0 -12px 48px rgba(0,0,0,0.28)", borderRadius: "28px 28px 0 0" }}>
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
        className="relative z-30 min-h-screen overflow-hidden bg-[#0d0b09] px-5 py-20 md:px-8 lg:py-28"
        style={{ boxShadow: "0 -12px 48px rgba(0,0,0,0.32)", borderRadius: "28px 28px 0 0" }}
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
