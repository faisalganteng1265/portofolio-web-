export type AchievementKind = "kompetisi" | "bootcamp";

export type Achievement = {
  id: string;
  kind: AchievementKind;
  /** Baris kecil di atas angka medali — "Juara", "Top", "Most", "Batch" */
  rankTop: string;
  /** Angka / kata besar di medali — "1", "50", "Fav" */
  rankMain: string;
  title: string;
  org: string;
  /** Penyelenggara singkat untuk baris meta */
  issuer: string;
  period: string;
  year: string;
  desc: string;
  tags: string[];
  /** Screenshot / foto sertifikat */
  image: string;
  /**
   * Logo penyelenggara. Taruh file-nya di /public/logos/ dengan nama persis
   * seperti di bawah — kalau file belum ada, tile otomatis jatuh ke glyph aksara.
   * Lihat public/logos/README.md.
   */
  logo?: string;
  accent: string;
  aksara: string;
  /** Lebar kolom di bento grid (grid 6 kolom di lg) */
  span: string;
  /** Tinggi minimum kartu */
  height: string;
};

export const achievements: Achievement[] = [
  {
    id: "base-global",
    kind: "kompetisi",
    rankTop: "Global",
    rankMain: "Winner",
    title: "Base Build Hackathon",
    org: "Base · Coinbase",
    issuer: "Global Competition",
    period: "2025",
    year: "2025",
    desc: "Winner hackathon global Base yang diselenggarakan Coinbase, bersaing dengan ribuan builder lintas negara. Membawa pulang reward $5.000 USD sekaligus lolos ke program inkubasi Incubase.",
    tags: ["Web3", "Blockchain", "Global", "Incubase"],
    image: "/achievement/baseproject.png",
    logo: "/logos/base.png",
    accent: "#d6a44b",
    aksara: "ꦧ",
    span: "lg:col-span-4",
    height: "min-h-[26rem] lg:min-h-[30rem]",
  },
  {
    id: "uti-webdesign",
    kind: "kompetisi",
    rankTop: "Juara",
    rankMain: "1",
    title: "Web Design Competition",
    org: "Universitas Teknokrat Indonesia",
    issuer: "Nasional",
    period: "2025",
    year: "2025",
    desc: "Juara pertama lomba desain web tingkat nasional — dinilai dari kekuatan visual, struktur informasi, dan kualitas implementasi front-end.",
    tags: ["Design", "Frontend", "UI/UX"],
    image: "/achievement/web2.png",
    logo: "/logos/teknokrat.png",
    accent: "#d6a44b",
    aksara: "ꦗ",
    span: "lg:col-span-2",
    height: "min-h-[26rem] lg:min-h-[30rem]",
  },
  {
    id: "base-indonesia",
    kind: "kompetisi",
    rankTop: "Juara",
    rankMain: "3",
    title: "Hackathon Base Indonesia",
    org: "Base Indonesia Community",
    issuer: "Nasional",
    period: "2026",
    year: "2026",
    desc: "Peringkat ketiga di hackathon komunitas Base Indonesia dengan produk berbasis smart contract yang dibangun dalam waktu terbatas.",
    tags: ["Blockchain", "Web3", "Smart Contract"],
    image: "/achievement/baseindo.png",
    logo: "/logos/base.png",
    accent: "#a73522",
    aksara: "ꦤ",
    span: "lg:col-span-3",
    height: "min-h-[22rem] lg:min-h-[24rem]",
  },
  {
    id: "lisk-favorite",
    kind: "kompetisi",
    rankTop: "Most",
    rankMain: "Fav",
    title: "Lisk Builder Program 2",
    org: "Lisk",
    issuer: "Community Choice",
    period: "2025",
    year: "2025",
    desc: "Dipilih komunitas sebagai proyek paling disukai sepanjang Lisk Builder Program batch 2 — apresiasi langsung dari pengguna, bukan juri.",
    tags: ["Community Choice", "Lisk L2", "Blockchain"],
    image: "/achievement/lisk.png",
    logo: "/logos/lisk.png",
    accent: "#a73522",
    aksara: "ꦭ",
    span: "lg:col-span-3",
    height: "min-h-[22rem] lg:min-h-[24rem]",
  },
  {
    id: "base-workshop",
    kind: "bootcamp",
    rankTop: "Batch",
    rankMain: "2",
    title: "Base Indonesia Workshop",
    org: "Base Indonesia · Yogyakarta",
    issuer: "Workshop Intensif",
    period: "September — Oktober 2025",
    year: "2025",
    desc: "Workshop Web3 intensif di Jogja bersama komunitas Base Indonesia: pengembangan smart contract dan pendalaman ekosistem Layer 2.",
    tags: ["Web3", "Smart Contract", "Base L2"],
    image: "/achievement/basework.png",
    logo: "/logos/base.png",
    accent: "#d6a44b",
    aksara: "ꦧ",
    span: "lg:col-span-3",
    height: "min-h-[21rem] lg:min-h-[23rem]",
  },
  {
    id: "dev-web3-jogja",
    kind: "bootcamp",
    rankTop: "Batch",
    rankMain: "5",
    title: "Dev Web3 Jogja",
    org: "Dev Web3 Jogja · Yogyakarta",
    issuer: "Bootcamp Full-stack",
    period: "November — Desember 2025",
    year: "2025",
    desc: "Bootcamp full-stack Web3 di Yogyakarta — membangun aplikasi terdesentralisasi dari nol sampai deployment ke mainnet.",
    tags: ["DeFi", "Solidity", "dApp"],
    image: "/achievement/devweb3.png",
    logo: "/logos/devweb3.png",
    accent: "#d6a44b",
    aksara: "ꦮ",
    span: "lg:col-span-3",
    height: "min-h-[21rem] lg:min-h-[23rem]",
  },
];

export const achievementFilters = [
  { id: "semua", label: "Semua", aksara: "ꦱ" },
  { id: "kompetisi", label: "Kompetisi", aksara: "ꦏ" },
  { id: "bootcamp", label: "Bootcamp", aksara: "ꦧ" },
] as const;

export type AchievementFilter = (typeof achievementFilters)[number]["id"];
