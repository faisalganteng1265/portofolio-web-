import ProjectsSection from "./components/ProjectsSection";
import BatikShaderBg from "./components/BatikShaderBg";
import ScrollHero from "./components/ScrollHero";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import NameMark from "./components/NameMark";
import AchievementsSection from "./components/AchievementsSection";

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

      {/* ─── ACHIEVEMENTS ─────────────────────────────── */}
      <AchievementsSection />

      {/* ─── CONTACT ──────────────────────────────────── */}
      <section
        id="kontak"
        className="relative z-40 min-h-screen overflow-hidden bg-[#0d0b09] px-5 py-20 md:px-8 lg:py-28"
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
