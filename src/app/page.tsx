import ProjectsSection from "./components/ProjectsSection";
import BatikShaderBg from "./components/BatikShaderBg";
import ScrollHero from "./components/ScrollHero";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import NameMark from "./components/NameMark";
import AchievementsSection from "./components/AchievementsSection";
import ExperienceSection from "./components/ExperienceSection";

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

      {/* ─── EXPERIENCE ───────────────────────────────── */}
      <ExperienceSection />

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
