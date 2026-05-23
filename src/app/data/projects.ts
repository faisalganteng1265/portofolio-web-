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
  { num: "01", title: "Verifund",          type: "Blockchain for Transparent Donations", tags: ["Next.js", "Tailwind", "Solidity", "Web3"], accent: "#d6a44b", featured: false,  image: "/projects/verifund.png",      href: "#" },
  { num: "02", title: "Tethra",          type: "Tap Trading Platform", tags: ["Next.js", "Tailwind", "Solidity", "Web3"], accent: "#a73522", featured: false,  image: "/projects/tethra.png",      href: "#" },
  { num: "03", title: "Ryvyn",   type: "Creative Experiment",     tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                         accent: "#d6a44b", featured: false, image: "/projects/ryvyn.png",       href: "#" },
  { num: "04", title: "Insurai",   type: "Animation Library",       tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                           accent: "#a73522", featured: false, image: "/projects/insurai.png",      href: "#" },
  { num: "05", title: "Tacit",type: "Design System",           tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                         accent: "#d6a44b", featured: false, image: "/projects/tacit.png",   href: "#" },
  { num: "06", title: "Orlance",type: "Interactive Story",       tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                        accent: "#a73522", featured: false, image: "/projects/orlance.png",   href: "#" },
  { num: "07", title: "Verity",      type: "Web Typography",          tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                    accent: "#d6a44b", featured: false, image: "/projects/verity.png",       href: "#" },
  { num: "08", title: "Shield Yield",type: "Admin Panel",            tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                       accent: "#a73522", featured: false, image: "/projects/shield.png",     href: "#" },
  { num: "09", title: "AI Campus",   type: "Audio Experiment",        tags: ["Next.js", "Tailwind", "Supabase", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/aicampus.png",     href: "#" },
  { num: "10", title: "Brainwave",   type: "Audio Experiment",        tags: ["Next.js", "Tailwind", "Supabase", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/kumon.png",     href: "#" },
  { num: "11", title: "Batik AR Filter", type: "AR / WebXR",              tags: ["WebXR", "Spark AR"],                       accent: "#d6a44b", featured: false, image: "/assets/batik-ar.png",    href: "#" },
];
