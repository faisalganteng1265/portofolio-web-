"use client";
import { useEffect, useState } from "react";

export default function NameMark() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      // Hero section adalah 190svh, tampil setelah scroll melewatinya
      setVisible(window.scrollY > window.innerHeight * 1.4);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-5 top-5 z-50 leading-[0.78] mix-blend-difference md:left-8"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
    >
      <p className="font-display text-[1.9rem] font-normal uppercase text-white md:text-[2.4rem]">
        ABIYYU
      </p>
      <p className="text-[1.6rem] font-black uppercase text-white md:text-[2rem]">
        FAISAL
      </p>
    </div>
  );
}
