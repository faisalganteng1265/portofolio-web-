import Image from "next/image";

const MARQUEE_ITEMS = [
  "ꦗ  Juara 1 — Web Design Competition UTI",
  "ꦤ  Juara 3 — Hackathon Base Indonesia",
  "ꦒ  Top 50 Global — Base Build Hackathon",
  "ꦭ  Most Favorite — Lisk Builder Program 2",
];

// TODO: Ganti src dengan foto asli kamu
const GALLERY_SLOTS = [
  { label: "Workshop Base Indonesia", src: "/assets/borobudur-java.jpg" },
  { label: "Hackathon Base", src: "/assets/kraton-yogyakarta.jpg" },
  { label: "Dev Web3 Jogja", src: "/assets/wayang-kulit.jpg" },
  { label: "Award Ceremony", src: "/assets/borobudur-java.jpg" },
  { label: "Team at Work", src: "/assets/kraton-yogyakarta.jpg" },
  { label: "Demo Day", src: "/assets/wayang-kulit.jpg" },
  { label: "Web Design UTI", src: "/assets/borobudur-java.jpg" },
  { label: "Lisk Builder 2", src: "/assets/kraton-yogyakarta.jpg" },
];

export default function AchievementsSection() {
  return (
    <section
      id="perjalanan"
      className="relative z-20 overflow-hidden bg-[#0e0c0a]"
      style={{
        boxShadow: "0 -12px 48px rgba(0,0,0,0.28)",
        borderRadius: "28px 28px 0 0",
      }}
    >
      {/* bg aksara watermark */}
      <p
        className="pointer-events-none absolute -right-10 top-16 select-none font-black leading-none text-[#d6a44b] opacity-[0.03]"
        style={{ fontSize: "30vw" }}
        aria-hidden="true"
      >
        ꦥ
      </p>

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">

        {/* ─── HEADER ─────────────────────────────────── */}
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="reveal flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
              <span className="h-px w-6 bg-[#d6a44b]/60" />
              04 · Karya & Capaian
            </p>
            <h2
              className="reveal mt-5 font-black leading-[0.9]"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
            >
              Dari layar,
              <br />
              <span className="font-display italic" style={{ color: "#d6a44b" }}>
                ke panggung.
              </span>
            </h2>
          </div>
          <div className="reveal flex gap-12 lg:flex-col lg:items-end lg:gap-5">
            {[["4", "Penghargaan"], ["2", "Bootcamp"]].map(([n, l]) => (
              <div key={l} className="lg:text-right">
                <p className="text-[2.6rem] font-black leading-none text-[#d6a44b]">{n}</p>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.2em] text-[#4b3f30]">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── MARQUEE TICKER ─────────────────────────── */}
        <div className="mb-16 overflow-hidden border-y border-[#f7efe0]/6 py-4">
          <div className="marquee-track flex items-center">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="mx-14 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.26em] text-[#3b3028]"
              >
                <span className="mr-4 text-[#d6a44b]/40">ꦱ</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ─── ACHIEVEMENT BENTO GRID ─────────────────── */}
        <div className="mb-20">

          {/* Top row: hero (left) + 2 stacked (right) */}
          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">

            {/* HERO — Top 50 Global */}
            <div
              className="group relative overflow-hidden border border-[#f7efe0]/8"
              style={{ minHeight: "520px", background: "#0d0b09" }}
            >
              {/* TODO: Ganti dengan foto kegiatan Base Build Hackathon */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/borobudur-java.jpg"
                  alt="Base Build Hackathon Global"
                  fill
                  sizes="(min-width: 1024px) 57vw, 90vw"
                  className="object-cover opacity-[0.28] saturate-[0.4] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0b09]/30 via-transparent to-[#0d0b09]/20" />
              </div>
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#d6a44b] via-[#d6a44b]/40 to-transparent" />

              <div
                className="relative flex h-full flex-col justify-between p-8 md:p-10"
                style={{ minHeight: "520px" }}
              >
                <div className="flex items-start justify-between">
                  <span className="border border-[#d6a44b]/35 bg-[#1e1508]/80 px-3.5 py-1.5 text-[8px] font-black uppercase tracking-[0.22em] text-[#d6a44b] backdrop-blur-sm">
                    2025 · Base Build Hackathon
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#4b3f30]">
                    Base · Coinbase
                  </span>
                </div>

                <div>
                  <p
                    className="font-black leading-none text-[#d6a44b]"
                    style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                  >
                    Top
                  </p>
                  <p
                    className="font-black leading-[0.82] text-[#fff7ea]"
                    style={{ fontSize: "clamp(6rem, 18vw, 14rem)" }}
                  >
                    50
                  </p>
                  <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-base font-black text-[#c9b99d]">
                        Winner · Global Competition
                      </p>
                      <p className="mt-1 max-w-[36ch] text-xs font-medium leading-6 text-[#5a4f40]">
                        Salah satu dari 50 tim terbaik di hackathon global Base yang diselenggarakan oleh Coinbase.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {["Web3", "Blockchain", "Global"].map((t) => (
                        <span
                          key={t}
                          className="border border-[#d6a44b]/20 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.16em] text-[#d6a44b]/55"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT col — Juara 1 + Juara 3 stacked */}
            <div className="flex flex-col gap-3">

              {/* Juara 1 */}
              <div
                className="group relative flex-1 overflow-hidden border border-[#f7efe0]/8"
                style={{ minHeight: "252px", background: "#100e0c" }}
              >
                {/* TODO: Ganti dengan foto Web Design Competition UTI */}
                <div className="absolute inset-0">
                  <Image
                    src="/assets/kraton-yogyakarta.jpg"
                    alt="Web Design Competition UTI"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover opacity-[0.28] saturate-[0.4] transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c] via-[#100e0c]/55 to-transparent" />
                </div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#d6a44b]/70 to-transparent" />
                <div
                  className="relative flex h-full flex-col justify-between p-6"
                  style={{ minHeight: "252px" }}
                >
                  <div className="flex items-start justify-between">
                    <span className="border border-[#d6a44b]/25 bg-[#100e0c]/70 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#d6a44b]/70 backdrop-blur-sm">
                      Juara 1 · Pertama
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-[0.18em] text-[#3b3028]">
                      2025
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-black leading-[1.12] text-[#fff7ea]">
                      Web Design
                      <br />
                      Competition
                    </p>
                    <p className="mt-1.5 text-[10px] font-medium text-[#5a4f40]">
                      Universitas Teknokrat Indonesia
                    </p>
                    <span className="mt-3 inline-block border border-[#f7efe0]/10 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]">
                      Design
                    </span>
                  </div>
                </div>
              </div>

              {/* Juara 3 */}
              <div
                className="group relative flex-1 overflow-hidden border border-[#f7efe0]/8"
                style={{ minHeight: "252px", background: "#0d0b09" }}
              >
                {/* TODO: Ganti dengan foto Hackathon Base Indonesia */}
                <div className="absolute inset-0">
                  <Image
                    src="/assets/wayang-kulit.jpg"
                    alt="Hackathon Base Indonesia"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover opacity-[0.22] saturate-[0.35] transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/55 to-transparent" />
                </div>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#a73522]/80 to-transparent" />
                <div
                  className="relative flex h-full flex-col justify-between p-6"
                  style={{ minHeight: "252px" }}
                >
                  <div className="flex items-start justify-between">
                    <span className="border border-[#a73522]/30 bg-[#0d0b09]/70 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.2em] text-[#a73522]/75 backdrop-blur-sm">
                      Juara 3 · Ketiga
                    </span>
                    <span className="text-[7px] font-black uppercase tracking-[0.18em] text-[#3b3028]">
                      2025
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-black leading-[1.12] text-[#fff7ea]">
                      Hackathon Base
                      <br />
                      Indonesia
                    </p>
                    <p className="mt-1.5 text-[10px] font-medium text-[#5a4f40]">
                      Base Indonesia Community
                    </p>
                    <div className="mt-3 flex gap-1.5">
                      {["Blockchain", "Web3"].map((t) => (
                        <span
                          key={t}
                          className="border border-[#f7efe0]/10 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row — Most Favorite full width */}
          <div
            className="group relative mt-3 overflow-hidden border border-[#f7efe0]/8"
            style={{ background: "#0c0a08" }}
          >
            {/* TODO: Ganti dengan foto Lisk Builder Program */}
            <div className="absolute right-0 top-0 h-full w-[45%]">
              <Image
                src="/assets/borobudur-java.jpg"
                alt="Lisk Builder Program 2"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover opacity-[0.28] saturate-[0.35] transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08] via-[#0c0a08]/70 to-transparent" />
            </div>
            <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#a73522] via-[#a73522]/40 to-transparent" />

            <div className="relative flex flex-col gap-6 px-8 py-9 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-10">
              <div>
                <span className="border border-[#a73522]/30 bg-[#150606]/70 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.22em] text-[#a73522]/80">
                  Most Favorite Project
                </span>
                <p
                  className="mt-4 font-black leading-[1.05] text-[#fff7ea]"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
                >
                  Lisk Builder
                  <br />
                  Program 2
                </p>
                <p className="mt-2 text-sm font-medium text-[#5a4f40]">
                  Dipilih sebagai proyek paling disukai komunitas · Lisk · 2025
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end lg:gap-2.5">
                {["Community Choice", "Lisk L2", "Blockchain"].map((t) => (
                  <span
                    key={t}
                    className="border border-[#f7efe0]/10 bg-[#f7efe0]/4 px-3.5 py-1.5 text-[7px] font-black uppercase tracking-[0.16em] text-[#3b3028]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── BOOTCAMP ────────────────────────────────── */}
        <div className="mb-20">
          <div className="mb-8 flex items-end justify-between border-b border-[#f7efe0]/8 pb-6">
            <div>
              <p className="reveal flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
                <span className="h-px w-6 bg-[#d6a44b]/60" />
                Bootcamp · Pendidikan
              </p>
              <h3
                className="reveal mt-4 font-black leading-[1.1]"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
              >
                Dua program intensif
                <br />
                <span style={{ color: "rgba(247,239,224,0.35)" }}>di Yogyakarta.</span>
              </h3>
            </div>
            <p className="reveal hidden text-right text-[9px] font-black uppercase tracking-[0.2em] text-[#3b3028] lg:block">
              2025 · Jogja
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">

            {/* Bootcamp 1 — Base Indonesia */}
            <div
              className="group overflow-hidden border border-[#f7efe0]/8"
              style={{ background: "#100e0c" }}
            >
              {/* TODO: Ganti dengan foto kegiatan Base Indonesia Workshop */}
              <div className="relative overflow-hidden" style={{ height: "270px" }}>
                <Image
                  src="/assets/borobudur-java.jpg"
                  alt="Base Indonesia Workshop Batch 2"
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover opacity-[0.38] saturate-[0.4] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#100e0c] via-[#100e0c]/30 to-transparent" />
                <div className="absolute left-5 top-5 flex gap-2">
                  <span className="border border-[#d6a44b]/35 bg-[#100e0c]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#d6a44b]/80 backdrop-blur-sm">
                    Batch 2
                  </span>
                  <span className="border border-[#f7efe0]/12 bg-[#100e0c]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#6b5f4f] backdrop-blur-sm">
                    Workshop
                  </span>
                </div>
                <p
                  className="pointer-events-none absolute bottom-4 right-5 select-none font-black text-[#d6a44b] opacity-[0.15]"
                  style={{ fontSize: "5rem" }}
                  aria-hidden="true"
                >
                  ꦧ
                </p>
              </div>
              <div className="p-6 lg:p-7">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#d6a44b]/60">
                  September – Oktober 2025
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#fff7ea]">
                  Base Indonesia
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-6 text-[#5a4f40]">
                  Workshop intensif Web3 di Jogja bersama komunitas Base Indonesia,
                  mengeksplorasi pengembangan smart contract dan ekosistem Layer 2.
                </p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {["Web3", "Smart Contract", "Base L2"].map((t) => (
                      <span
                        key={t}
                        className="border border-[#f7efe0]/10 bg-[#f7efe0]/4 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.18em] text-[#2e2620]">
                    ꦗꦒꦗ
                  </span>
                </div>
              </div>
            </div>

            {/* Bootcamp 2 — Dev Web3 Jogja */}
            <div
              className="group overflow-hidden border border-[#f7efe0]/8"
              style={{ background: "#0d0b09" }}
            >
              {/* TODO: Ganti dengan foto kegiatan Dev Web3 Jogja */}
              <div className="relative overflow-hidden" style={{ height: "270px" }}>
                <Image
                  src="/assets/wayang-kulit.jpg"
                  alt="Dev Web3 Jogja Batch 5"
                  fill
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="object-cover opacity-[0.38] saturate-[0.4] transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b09] via-[#0d0b09]/30 to-transparent" />
                <div className="absolute left-5 top-5 flex gap-2">
                  <span className="border border-[#d6a44b]/35 bg-[#0d0b09]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#d6a44b]/80 backdrop-blur-sm">
                    Batch 5
                  </span>
                  <span className="border border-[#f7efe0]/12 bg-[#0d0b09]/75 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.2em] text-[#6b5f4f] backdrop-blur-sm">
                    Bootcamp
                  </span>
                </div>
                <p
                  className="pointer-events-none absolute bottom-4 right-5 select-none font-black text-[#d6a44b] opacity-[0.15]"
                  style={{ fontSize: "5rem" }}
                  aria-hidden="true"
                >
                  ꦮ
                </p>
              </div>
              <div className="p-6 lg:p-7">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#d6a44b]/60">
                  November – Desember 2025
                </p>
                <h3 className="mt-2 text-2xl font-black text-[#fff7ea]">
                  Dev Web3 Jogja
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-6 text-[#5a4f40]">
                  Bootcamp full-stack Web3 di Yogyakarta, membangun aplikasi
                  terdesentralisasi dari dasar hingga deployment ke mainnet.
                </p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {["DeFi", "Solidity", "dApp"].map((t) => (
                      <span
                        key={t}
                        className="border border-[#f7efe0]/10 bg-[#f7efe0]/4 px-2.5 py-1 text-[7px] font-black uppercase tracking-[0.14em] text-[#3b3028]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.18em] text-[#2e2620]">
                    ꦗꦒꦗ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PHOTO GALLERY STRIP ─────────────────────── */}
        <div>
          <p className="reveal mb-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-[#d6a44b]">
            <span className="h-px w-6 bg-[#d6a44b]/60" />
            Dokumentasi · Galeri
          </p>

          {/* horizontal scroll */}
          <div
            className="flex gap-3 overflow-x-auto pb-3"
            style={{ scrollbarWidth: "none" }}
          >
            {GALLERY_SLOTS.map((slot, i) => (
              <div
                key={i}
                className="group relative shrink-0 overflow-hidden border border-[#f7efe0]/8 bg-[#120f0c]"
                style={{ width: "200px", height: "280px" }}
              >
                {/* TODO: Ganti src dengan foto asli */}
                <Image
                  src={slot.src}
                  alt={slot.label}
                  fill
                  sizes="200px"
                  className="object-cover opacity-[0.32] saturate-[0.4] transition-all duration-500 group-hover:opacity-[0.5] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120f0c]/90 via-transparent to-transparent" />

                {/* number */}
                <p className="absolute left-4 top-4 text-[7px] font-black uppercase tracking-[0.22em] text-[#2e2620]">
                  {String(i + 1).padStart(2, "0")}
                </p>

                {/* label */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[8px] font-black text-[#4b3f30]">{slot.label}</p>
                </div>

                {/* hover hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="border border-[#d6a44b]/30 bg-[#0e0c0a]/80 px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.16em] text-[#d6a44b]/60 backdrop-blur-sm">
                    Ganti foto
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[8px] font-medium text-[#2e2620]">
            ← geser · {GALLERY_SLOTS.length} slot foto dokumentasi
          </p>
        </div>

      </div>
    </section>
  );
}
