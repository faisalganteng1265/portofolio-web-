"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#tentang", label: "Tentang" },
  { href: "#stack", label: "Keahlian" },
  { href: "#karya", label: "Karya" },
  { href: "#kontak", label: "Kontak" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#f7efe0]/10 bg-[#100d0a]/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
        <a
          className="group flex items-center gap-3"
          href="#home"
          aria-label="Kembali ke awal"
        >
          <span className="grid h-9 w-9 place-items-center border border-[#d6a44b]/40 bg-[#2a1710] text-lg font-black text-[#d6a44b] transition-colors duration-200 group-hover:border-[#d6a44b]/80">
            ꦗ
          </span>
          <span className="text-sm font-black uppercase tracking-[0.22em] text-[#f7efe0]">
            AFA
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              className="nav-link text-[10px] font-black uppercase tracking-[0.24em] text-[#9b8f7d] hover:text-[#f7efe0]"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          className="hidden border border-[#d6a44b]/35 px-5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a44b] transition-all duration-200 hover:border-[#d6a44b] hover:bg-[#d6a44b]/10 md:block"
          href="mailto:faisalakmal2105@gmail.com"
        >
          Hire Me
        </a>

        <button
          className="flex flex-col gap-[5px] p-1 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          <span
            className={`block h-[1.5px] w-6 bg-[#f7efe0] transition-all duration-300 origin-center ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-[#f7efe0] transition-all duration-200 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-[#f7efe0] transition-all duration-300 origin-center ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 border-t border-[#f7efe0]/10" : "max-h-0"
        } bg-[#0d0b09]/96 backdrop-blur-md`}
      >
        <div className="px-5 py-5">
          {links.map((link) => (
            <a
              key={link.href}
              className="block border-b border-[#f7efe0]/8 py-4 text-sm font-black uppercase tracking-[0.24em] text-[#9b8f7d] transition-colors hover:text-[#f7efe0]"
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mt-5 block border border-[#d6a44b]/35 py-3 text-center text-[10px] font-black uppercase tracking-[0.22em] text-[#d6a44b]"
            href="mailto:faisalakmal2105@gmail.com"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
}
