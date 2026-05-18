import Image from "next/image";

const projects = [
  {
    num: "01",
    javaNum: "꧑",
    aksara: "ꦱ",
    title: "Batik Design System",
    type: "UI Component Library",
    text: "Koleksi komponen React dengan bahasa visual kawung, grid editorial, dan motion ringan yang terinspirasi batik klasik Jawa.",
    image: "/assets/batik-kawung.jpg",
    tags: ["React", "Tailwind", "Storybook"],
    featured: true,
    flip: false,
  },
  {
    num: "02",
    javaNum: "꧒",
    aksara: "ꦏ",
    title: "JogjaTech Blog",
    type: "Web Platform",
    text: "Platform blog teknologi berbasis Next.js dengan MDX, dark mode, dan animasi scroll halus.",
    image: "/assets/kraton-yogyakarta.jpg",
    tags: ["Next.js", "MDX"],
    featured: false,
    flip: true,
  },
  {
    num: "03",
    javaNum: "꧓",
    aksara: "ꦠ",
    title: "Candi Archive",
    type: "Creative Web Experiment",
    text: "One-page immersive untuk menampilkan arsip budaya Nusantara dengan parallax dan sticky panels.",
    image: "/assets/borobudur-java.jpg",
    tags: ["Next.js", "GSAP"],
    featured: false,
    flip: false,
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="karya"
      className="relative overflow-hidden bg-[#0d0b08] px-5 py-20 md:px-8 lg:py-32"
    >
      {/* vertical sidebar tape */}
      <div
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-10 xl:flex items-center justify-center"
        aria-hidden="true"
      >
        <p
          className="select-none font-black text-[#d6a44b] opacity-[0.08]"
          style={{
            writingMode: "vertical-rl",
            letterSpacing: "0.3em",
            fontSize: "0.6rem",
            textTransform: "uppercase",
          }}
        >
          PILIHAN · KARYA · PROYEK · KARYA
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ── Section header ── */}
        <div className="reveal mb-20 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.28em] text-[#d6a44b]">
              <span className="h-px w-8 bg-[#d6a44b]/60" />
              ꦥꦶꦭꦶꦃꦏꦂꦪ · Pilihan Karya
            </p>
            <h2
              className="mt-5 font-black leading-[0.92] text-[#fff7ea]"
              style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}
            >
              Visual kuat,{" "}
              <span className="text-[#d6a44b]">tetap fungsional.</span>
            </h2>
          </div>
          {/* project index dots */}
          <div className="flex items-center gap-5">
            {projects.map((p) => (
              <div key={p.num} className="flex flex-col items-center gap-1.5">
                <span className="text-[8px] font-black text-[#4b3f30]">{p.num}</span>
                <span className="h-px w-4 bg-[#d6a44b]/20" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Project list ── */}
        {projects.map((project, i) => (
          <div key={project.title}>
            <article
              className={`group relative flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:gap-0 lg:py-0 ${
                project.flip ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* ── Giant Javanese numeral watermark ── */}
              <p
                className="pointer-events-none absolute inset-0 flex select-none items-center font-black leading-none text-[#d6a44b]"
                style={{
                  fontSize: "clamp(10rem,24vw,20rem)",
                  opacity: 0.028,
                  justifyContent: project.flip ? "flex-end" : "flex-start",
                  paddingLeft: project.flip ? 0 : "0.1em",
                  paddingRight: project.flip ? "0.1em" : 0,
                }}
                aria-hidden="true"
              >
                {project.javaNum}
              </p>

              {/* ── Image column ── */}
              <div
                className={`relative shrink-0 lg:w-[48%] ${
                  project.flip ? "lg:pl-16" : "lg:pr-16"
                }`}
              >
                {/* image wrapper with angular clip-path (prasasti stone feel) */}
                <div
                  className="relative overflow-hidden transition-transform duration-700 group-hover:scale-[1.01]"
                  style={{
                    clipPath: project.flip
                      ? "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 0)"
                      : "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
                    aspectRatio: "16 / 10",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover opacity-50 saturate-[0.55] transition-all duration-700 group-hover:opacity-82 group-hover:saturate-[0.85] group-hover:scale-[1.06]"
                  />

                  {/* batik texture overlay — fades on hover */}
                  <div className="absolute inset-0 batik-overlay opacity-[0.35] transition-opacity duration-600 group-hover:opacity-0" />

                  {/* bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08]/60 via-transparent to-transparent" />

                  {/* inner border */}
                  <div className="absolute inset-0 border border-[#d6a44b]/12 transition-all duration-500 group-hover:border-[#d6a44b]/30" />

                  {/* aksara corner badge */}
                  <div
                    className={`absolute bottom-4 ${project.flip ? "left-4" : "right-4"} select-none font-black text-[#d6a44b] transition-all duration-500 group-hover:opacity-80`}
                    style={{ fontSize: "2.2rem", opacity: 0.22 }}
                    aria-hidden="true"
                  >
                    {project.aksara}
                  </div>

                  {/* featured flag */}
                  {project.featured && (
                    <div className="absolute left-4 top-4 border border-[#a73522]/40 bg-[#a73522]/15 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.22em] text-[#a73522]">
                      Featured
                    </div>
                  )}
                </div>

                {/* corner-bracket decoration outside image */}
                <div
                  className={`pointer-events-none absolute -bottom-2 ${
                    project.flip ? "-left-2" : "-right-2"
                  } h-8 w-8 opacity-30`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
                    <path
                      d={
                        project.flip
                          ? "M32 0 H8 V8 M32 32 H8 V24"
                          : "M0 0 H24 V8 M0 32 H24 V24"
                      }
                      stroke="#d6a44b"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>

              {/* ── Content column ── */}
              <div
                className={`relative flex flex-1 flex-col justify-center ${
                  project.flip ? "lg:pr-16" : "lg:pl-16"
                }`}
              >
                {/* num + type label */}
                <div className="reveal flex items-center gap-3">
                  <span className="font-black text-[#4b3f30] text-[10px]">
                    {project.num}
                  </span>
                  <span className="h-px w-6 bg-[#d6a44b]/35" />
                  <span className="text-[9px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
                    {project.type}
                  </span>
                </div>

                {/* title */}
                <h3
                  className="reveal mt-3 font-black leading-[0.94] text-[#fff7ea] transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: "clamp(2rem,4vw,3.4rem)" }}
                >
                  {project.title}
                </h3>

                {/* thin batik rule */}
                <div className="reveal java-rule my-6 max-w-[200px]" />

                {/* description */}
                <p className="reveal max-w-[44ch] text-[0.9rem] font-medium leading-7 text-[#6b5f4f] transition-colors duration-300 group-hover:text-[#9b8f7d]">
                  {project.text}
                </p>

                {/* tags */}
                <div className="reveal mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#f7efe0]/8 bg-[#18120e] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#4b3f30] transition-all duration-300 group-hover:border-[#d6a44b]/18 group-hover:text-[#9b8f7d]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="reveal mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2.5 border border-[#f7efe0]/10 px-6 py-3 text-[9px] font-black uppercase tracking-[0.22em] text-[#f7efe0]/40 transition-all duration-300 hover:border-[#d6a44b]/40 hover:text-[#d6a44b]"
                  >
                    Lihat Proyek
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
            </article>

            {/* ── Divider between projects ── */}
            {i < projects.length - 1 && (
              <div className="relative my-8 h-px overflow-visible lg:my-14">
                <div className="h-px bg-gradient-to-r from-transparent via-[#d6a44b]/18 to-transparent" />
                {/* center ornament */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d0b08] px-5">
                  <span className="font-black text-[#d6a44b]/22 text-xs">✦</span>
                </div>
                {/* side marks */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#0d0b08] pr-3">
                  <span className="text-[8px] font-black text-[#d6a44b]/15">
                    {project.num}
                  </span>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0d0b08] pl-3">
                  <span className="text-[8px] font-black text-[#d6a44b]/15">
                    {projects[i + 1].num}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* ── Bottom strip ── */}
        <div className="reveal mt-16 border border-[#f7efe0]/8 bg-[#18120e]/60 px-6 py-5 backdrop-blur md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#4b3f30]">
              ꦠꦩ꧀ꦧꦃꦭꦒꦶ · Masih ada lagi
            </p>
            <p className="mt-1 text-sm font-medium text-[#9b8f7d]">
              Lebih banyak proyek sedang dikerjakan. Ikuti perkembangannya.
            </p>
          </div>
          <a
            className="mt-4 inline-flex items-center gap-2 border border-[#f7efe0]/14 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#f7efe0] transition-colors hover:border-[#d6a44b]/40 hover:text-[#d6a44b] md:mt-0"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
