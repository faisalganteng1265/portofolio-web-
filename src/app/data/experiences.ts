export type ExperienceKind = "Magang" | "Akademik" | "Organisasi" | "Kepanitiaan";

export type Experience = {
  id: string;
  role: string;
  /** Nama instansi/organisasi utama */
  company: string;
  /** Keterangan tambahan: program, fakultas, dsb. */
  unit?: string;
  kind: ExperienceKind;
  location: string;
  mode: string;
  period: string;
  year: string;
  /** Ditampilkan di chip kanan — versi ringkas dari period */
  periodShort: string;
  duration: string;
  desc: string;
  wins: string[];
  tags: string[];
  /**
   * Logo instansi. Taruh file-nya di /public/logos/ dengan nama persis seperti
   * di bawah. Kalau file belum ada, tile otomatis menampilkan glyph aksara —
   * jadi tampilan tetap rapi sambil menunggu logo asli. Lihat public/logos/README.md.
   */
  logo?: string;
  aksara: string;
  accent: string;
  spotlight: boolean;
};

export const experiences: Experience[] = [
  {
    id: "01",
    role: "Fullstack Developer Intern",
    company: "eSize",
    unit: "Program Hibah Magang Berdampak · esize.id",
    kind: "Magang",
    location: "Surakarta",
    mode: "Hybrid",
    period: "Feb 2026 — Jun 2026",
    year: "2026",
    periodShort: "Feb 2026",
    duration: "5 bulan",
    desc: "Membangun halaman katalog produk dan profil perusahaan eSize, lalu menyambungkannya ke REST API berbasis Go agar data produk, layanan, dan platform tampil dinamis.",
    wins: [
      "Membangun halaman katalog produk dan profil perusahaan dengan Next.js, TypeScript, dan Tailwind CSS",
      "Mengintegrasikan REST API berbasis Go untuk data produk, layanan, dan platform secara dinamis",
      "Melacak dan menuntaskan masalah respons API, loading state, serta rendering UI dinamis",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API", "Go"],
    logo: "/logos/esize.png",
    aksara: "ꦩ",
    accent: "#a73522",
    spotlight: true,
  },
  {
    id: "02",
    role: "Teaching Assistant",
    company: "Data Structures & Algorithms Laboratory",
    unit: "FATISDA UNS",
    kind: "Akademik",
    location: "Surakarta",
    mode: "On-site · Part-time",
    period: "Mar 2025 — Jul 2025",
    year: "2025",
    periodShort: "Mar 2025",
    duration: "5 bulan",
    desc: "Mengajar Java, struktur data, dan algoritma untuk 30 mahasiswa S1 — dari sesi kelas, pendampingan proyek akhir, sampai review kode tiap mahasiswa.",
    wins: [
      "Mengajar Java, struktur data, dan algoritma kepada 30 mahasiswa S1",
      "Membimbing proyek akhir yang menuntut tiap mahasiswa merancang dan mengimplementasikan solusi berbasis algoritma",
      "Mereview submission kode serta mengasah logika, implementasi, dan kemampuan debugging mahasiswa",
    ],
    tags: ["Java", "Data Structures", "Algorithms", "Mentoring", "Code Review"],
    logo: "/logos/fatisda-uns.png",
    aksara: "ꦒ",
    accent: "#d6a44b",
    spotlight: true,
  },
  {
    id: "03",
    role: "Chairperson",
    company: "PKKMB FATISDA 2025",
    unit: "Pengenalan Kehidupan Kampus Mahasiswa Baru",
    kind: "Kepanitiaan",
    location: "Surakarta",
    mode: "On-site",
    period: "Mar 2025 — Ags 2025",
    year: "2025",
    periodShort: "Mar 2025",
    duration: "6 bulan",
    desc: "Memimpin orientasi tingkat fakultas untuk 280 mahasiswa baru sebagai ketua pelaksana, sekaligus mengoordinasikan 80 anggota panitia lintas divisi.",
    wins: [
      "Memimpin orientasi tingkat fakultas untuk 280 mahasiswa baru dan mengoordinasikan 80 anggota panitia",
      "Mengelola divisi lintas fungsi, operasional acara, dan eksekusi seluruh rangkaian onboarding mahasiswa",
    ],
    tags: ["Leadership", "Event Operations", "Coordination", "Teamwork"],
    logo: "/logos/pkkmb-fatisda.png",
    aksara: "ꦧ",
    accent: "#a73522",
    spotlight: false,
  },
  {
    id: "04",
    role: "Coordinator of Talent and Interest Affairs",
    company: "BEM FATISDA UNS",
    unit: "Badan Eksekutif Mahasiswa",
    kind: "Organisasi",
    location: "Surakarta",
    mode: "Hybrid",
    period: "Jan 2025 — Des 2025",
    year: "2025",
    periodShort: "Jan 2025",
    duration: "12 bulan",
    desc: "Mengoordinasikan 11 anggota di dua kementerian yang menaungi program olahraga, akademik, budaya, dan pengembangan bakat mahasiswa FATISDA UNS.",
    wins: [
      "Mengoordinasikan 11 anggota lintas dua kementerian di program olahraga, akademik, budaya, dan pengembangan bakat",
      "Mengelola perencanaan, komunikasi, dan eksekusi kegiatan pengembangan mahasiswa tingkat fakultas",
    ],
    tags: ["Leadership", "Coordination", "Communication", "Program Management"],
    logo: "/logos/bem-fatisda.png",
    aksara: "ꦥ",
    accent: "#d6a44b",
    spotlight: false,
  },
  {
    id: "05",
    role: "Staff Minat & Bakat",
    company: "HIMASTER UNS",
    unit: "Himpunan Mahasiswa Informatika",
    kind: "Organisasi",
    location: "Surakarta",
    mode: "On-site",
    period: "Feb 2024 — Des 2024",
    year: "2024",
    periodShort: "Feb 2024",
    duration: "11 bulan",
    desc: "Berkontribusi di Divisi Minat dan Bakat HIMASTER UNS dalam perencanaan serta pelaksanaan program untuk mahasiswa informatika.",
    wins: [
      "Menyusun dan menjalankan program divisi sepanjang satu kepengurusan",
      "Menjadi penghubung antara pengurus dan peserta kegiatan",
    ],
    tags: ["Communication", "Teamwork", "Organization"],
    logo: "/logos/himaster.png",
    aksara: "ꦲ",
    accent: "#d6a44b",
    spotlight: false,
  },
  {
    id: "06",
    role: "Staff PKKMB Wonder Quest 2024",
    company: "HIMASTER UNS",
    unit: "PKKMB Wonder Quest 2024",
    kind: "Kepanitiaan",
    location: "Surakarta",
    mode: "On-site",
    period: "Sep 2024 — Okt 2024",
    year: "2024",
    periodShort: "Sep 2024",
    duration: "2 bulan",
    desc: "Bagian dari tim pelaksana PKKMB Wonder Quest 2024 — menangani kebutuhan acara dan koordinasi lapangan selama seluruh rangkaian kegiatan.",
    wins: [
      "Menangani koordinasi lapangan selama rangkaian acara",
      "Menyiapkan kebutuhan teknis harian bersama tim panitia",
    ],
    tags: ["Communication", "Teamwork", "Event"],
    logo: "/logos/himaster.png",
    aksara: "ꦮ",
    accent: "#a73522",
    spotlight: false,
  },
  {
    id: "07",
    role: "Staff General Affair",
    company: "PINGFEST",
    unit: "Pekan Informasi dan Teknologi",
    kind: "Kepanitiaan",
    location: "Surakarta",
    mode: "On-site",
    period: "Mar 2024 — Sep 2024",
    year: "2024",
    periodShort: "Mar 2024",
    duration: "7 bulan",
    desc: "Bergabung di Divisi General Affair PINGFEST untuk mendukung kebutuhan operasional, logistik, dan koordinasi internal acara teknologi.",
    wins: [
      "Mengurus kebutuhan operasional dan logistik acara",
      "Menjaga koordinasi internal antar divisi selama persiapan",
    ],
    tags: ["General Affair", "Operations", "Communication", "Teamwork"],
    logo: "/logos/pingfest.png",
    aksara: "ꦠ",
    accent: "#d6a44b",
    spotlight: false,
  },
];

export const experienceRoles = [
  "Fullstack Developer Intern",
  "Teaching Assistant",
  "Chairperson PKKMB",
  "Coordinator of Talent & Interest",
  "Staff Minat & Bakat",
  "Staff General Affair",
  "Event Coordinator",
];
