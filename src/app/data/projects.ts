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
  { num: "03", title: "Ryvyn",   type: "Every Transfer Grows Value",     tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                         accent: "#d6a44b", featured: false, image: "/projects/ryvyn.png",       href: "#" },
  { num: "04", title: "Insurai",   type: "Insured AI Copy Trading",       tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                           accent: "#a73522", featured: false, image: "/projects/insurai.png",      href: "#" },
  { num: "05", title: "Tacit",type: "Tokenized Minds, Paid Queries",           tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                         accent: "#d6a44b", featured: false, image: "/projects/tacit.png",   href: "#" },
  { num: "06", title: "Orlance",type: "Trade Yield, Unlock Value",       tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                        accent: "#a73522", featured: false, image: "/projects/orlance.png",   href: "#" },
  { num: "07", title: "Verity",      type: "Safer Bets, Cleaner Markets",          tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                    accent: "#d6a44b", featured: false, image: "/projects/verity.png",       href: "#" },
  { num: "08", title: "Shield Yield",type: "Earn Yield, Avoid Rugs",            tags: ["Next.js", "Tailwind", "Solidity", "Web3"],                       accent: "#a73522", featured: false, image: "/projects/shield.png",     href: "#" },
  { num: "09", title: "AI Campus",   type: "Learn Everything in One Place",        tags: ["Next.js", "Tailwind", "Supabase", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/aicampus.png",     href: "#" },
  { num: "10", title: "Brainwave",   type: "AI-Powered Learning Hub",        tags: ["Next.js", "Tailwind", "Supabase", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/kumon.png",     href: "#" },
  { num: "11", title: "growB",   type: "Protect Children From Stunting",        tags: ["Next.js", "Tailwind", "Supabase", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/growb.png",     href: "#" },
  { num: "12", title: "Sinauin",   type: "Learn AI, Automate Everything",        tags: ["Next.js", "Tailwind", "Supabase", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/sinauin.jpeg",     href: "#" },
  { num: "13", title: "Esize",   type: "Konveksi Cerdas, Karya Mahasiswa",        tags: ["Next.js", "Tailwind", "Supabase", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/esize.png",     href: "#" },
  { num: "14", title: "Bin Auf Coffee",   type: "Fresh Coffee, Easy Ordering",        tags: ["Kotlin", "Laravel", "Web2"],                    accent: "#d6a44b", featured: false, image: "/projects/binauf.jpeg",     href: "#" },
];
