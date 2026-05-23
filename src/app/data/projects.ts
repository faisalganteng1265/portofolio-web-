export type Project = {
  num: string;
  title: string;
  type: string;
  tags: string[];
  accent: string;
  featured: boolean;
  image: string;
  href?: string;
};

// Taruh screenshot di /public/assets/ lalu isi field image tiap project
export const projectList: Project[] = [
  { num: "01", title: "Verifund",          type: "Blockchain for Transparent Donations", tags: ["Next.js", "Tailwind", "Solidity", "Web3"], accent: "#d6a44b", featured: true,  image: "/projects/verifund.png",      href: "#" },
  { num: "02", title: "Tethra",          type: "Tap to Trading Platform", tags: ["Next.js", "Tailwind", "Solidity", "Web3"], accent: "#a73522", featured: true,  image: "/projects/tethra.png",      href: "#" },
  { num: "03", title: "Candi Archive",   type: "Creative Experiment",     tags: ["GSAP", "Next.js"],                         accent: "#d6a44b", featured: false, image: "/assets/candi.png",       href: "#" },
  { num: "04", title: "Wayang Motion",   type: "Animation Library",       tags: ["SVG", "Motion"],                           accent: "#a73522", featured: false, image: "/assets/wayang.png",      href: "#" },
  { num: "05", title: "Nusantara UI Kit",type: "Design System",           tags: ["Figma", "Tokens"],                         accent: "#d6a44b", featured: false, image: "/assets/nusantara.png",   href: "#" },
  { num: "06", title: "Prambanan Scroll",type: "Interactive Story",       tags: ["Three.js", "GLSL"],                        accent: "#a73522", featured: false, image: "/assets/prambanan.png",   href: "#" },
  { num: "07", title: "Sogan Type",      type: "Web Typography",          tags: ["CSS", "Variable Font"],                    accent: "#d6a44b", featured: false, image: "/assets/sogan.png",       href: "#" },
  { num: "08", title: "Pendopo Dashboard",type: "Admin Panel",            tags: ["React", "Recharts"],                       accent: "#a73522", featured: false, image: "/assets/pendopo.png",     href: "#" },
  { num: "09", title: "Gamelan Synth",   type: "Audio Experiment",        tags: ["Web Audio", "Tone.js"],                    accent: "#d6a44b", featured: false, image: "/assets/gamelan.png",     href: "#" },
  { num: "10", title: "Kris NFT Gallery",type: "Web3 Frontend",           tags: ["Ethers.js", "Next.js"],                    accent: "#a73522", featured: false, image: "/assets/kris.png",        href: "#" },
  { num: "11", title: "Batik AR Filter", type: "AR / WebXR",              tags: ["WebXR", "Spark AR"],                       accent: "#d6a44b", featured: false, image: "/assets/batik-ar.png",    href: "#" },
];
