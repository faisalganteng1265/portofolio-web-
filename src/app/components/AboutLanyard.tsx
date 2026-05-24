"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function AboutLanyard() {
  const lastPoint = useRef<Point | null>(null);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const card = {
    x: 200 + offset.x,
    y: 308 + offset.y,
  };

  const cordPath = `M 200 18 C ${176 + offset.x * 0.18} 124, ${
    card.x - 54
  } 162, ${card.x - 46} ${card.y - 126}`;
  const cordPathRight = `M 200 18 C ${224 + offset.x * 0.18} 124, ${
    card.x + 54
  } 162, ${card.x + 46} ${card.y - 126}`;

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    lastPoint.current = { x: event.clientX, y: event.clientY };
    setDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || !lastPoint.current) return;

    const dx = event.clientX - lastPoint.current.x;
    const dy = event.clientY - lastPoint.current.y;

    lastPoint.current = { x: event.clientX, y: event.clientY };
    setOffset((current) => ({
      x: clamp(current.x + dx * 0.8, -86, 86),
      y: clamp(current.y + dy * 0.8, -52, 84),
    }));
  }

  function release() {
    lastPoint.current = null;
    setDragging(false);
    setOffset({ x: 0, y: 0 });
  }

  return (
    <div className="absolute inset-0 z-20 overflow-hidden">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 520"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lanyardCord" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f7efe0" stopOpacity="0.74" />
            <stop offset="100%" stopColor="#d6a44b" stopOpacity="0.86" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="18" r="7" fill="#d6a44b" />
        <path
          d={cordPath}
          fill="none"
          stroke="url(#lanyardCord)"
          strokeLinecap="round"
          strokeWidth="7"
          style={{ transition: dragging ? "none" : "d 520ms cubic-bezier(.2,.8,.2,1)" }}
        />
        <path
          d={cordPathRight}
          fill="none"
          stroke="url(#lanyardCord)"
          strokeLinecap="round"
          strokeWidth="7"
          style={{ transition: dragging ? "none" : "d 520ms cubic-bezier(.2,.8,.2,1)" }}
        />
        <rect
          x={card.x - 38}
          y={card.y - 132}
          width="76"
          height="18"
          rx="7"
          fill="#100d0a"
          stroke="#d6a44b"
          strokeOpacity="0.7"
          strokeWidth="2"
          style={{ transition: dragging ? "none" : "all 520ms cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>

      <div
        className="absolute left-1/2 top-1/2 w-[min(58vw,15rem)] cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        style={{
          transform: `translate(calc(-50% + ${offset.x}px), calc(-39% + ${offset.y}px)) rotate(${offset.x * 0.035}deg)`,
          transition: dragging
            ? "none"
            : "transform 520ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        <div className="overflow-hidden border border-[#d6a44b]/36 bg-[#100d0a]/92 shadow-[0_28px_70px_rgba(0,0,0,0.46)] backdrop-blur-md">
          <div className="relative aspect-[4/3] border-b border-[#d6a44b]/20 bg-[#f7efe0]">
            <Image
              src="/assets/faisal-hero.png"
              alt="Foto Faisal Akmal"
              fill
              sizes="15rem"
              className="object-cover"
              style={{ objectPosition: "50% 12%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#100d0a]/46 via-transparent to-transparent" />
          </div>

          <div className="p-4">
            <p className="text-[8px] font-black uppercase tracking-[0.22em] text-[#d6a44b]">
              Student ID
            </p>
            <h3 className="mt-1 text-xl font-black uppercase leading-none text-[#fff7ea]">
              Faisal Akmal
            </h3>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#9b8f7d]">
              Frontend · UNS
            </p>

            <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-3 border-t border-[#f7efe0]/10 pt-3">
              <p className="text-[9px] font-medium leading-4 text-[#6b5f4f]">
                Learning blockchain and building portfolio-grade web projects.
              </p>
              <span className="grid h-8 w-8 place-items-center border border-[#d6a44b]/35 text-sm font-black text-[#d6a44b]">
                ꦄ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
