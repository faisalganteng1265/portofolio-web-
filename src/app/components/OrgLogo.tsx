"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

type Status = "idle" | "loaded" | "failed";

type Props = {
  /** Path logo di /public. Boleh kosong / file-nya belum ada. */
  src?: string;
  alt: string;
  /** Glyph aksara yang tampil selama logo belum tersedia */
  fallback: string;
  accent: string;
  /** Ukuran sisi tile dalam px */
  size?: number;
  className?: string;
};

/**
 * Tile logo instansi dengan fallback anggun.
 *
 * Glyph aksara selalu dirender sebagai lapisan dasar dan logo di-fade masuk
 * hanya setelah benar-benar berhasil dimuat — jadi selama file logo belum ada
 * di /public/logos/, yang terlihat adalah glyph yang rapi, bukan ikon gambar
 * rusak. Begitu file-nya ditaruh dengan nama sesuai data, logo langsung muncul
 * tanpa perlu ubah kode.
 */
export default function OrgLogo({
  src,
  alt,
  fallback,
  accent,
  size = 56,
  className = "",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");

  // Gambar yang sudah ada di cache bisa selesai dimuat sebelum React sempat
  // memasang handler-nya, jadi status dicek langsung dari elemennya.
  const captureImg = useCallback((node: HTMLImageElement | null) => {
    if (!node?.complete) return;
    setStatus(node.naturalWidth > 0 ? "loaded" : "failed");
  }, []);

  const showImage = Boolean(src) && status !== "failed";
  const isLoaded = status === "loaded";
  // Potongan sudut ikut ukuran tile supaya proporsinya konsisten dari 38–72px.
  const notch = Math.max(6, Math.round(size * 0.13));

  return (
    <span
      className={`org-logo relative grid shrink-0 place-items-center overflow-hidden bg-[#15110d] ${className}`}
      style={{
        width: size,
        height: size,
        border: `1px solid ${accent}2e`,
        // sudut terpotong ala stempel — bikin tile terasa "dicetak"
        clipPath: `polygon(0 0, calc(100% - ${notch}px) 0, 100% ${notch}px, 100% 100%, ${notch}px 100%, 0 calc(100% - ${notch}px))`,
      }}
    >
      {/* lapisan dasar: aksara + sorotan lembut */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isLoaded ? 0 : 1,
          background: `radial-gradient(circle at 30% 20%, ${accent}1f, transparent 68%)`,
        }}
      />
      <span
        aria-hidden={isLoaded}
        className="absolute font-display leading-none transition-opacity duration-500"
        style={{ color: accent, fontSize: size * 0.44, opacity: isLoaded ? 0 : 1 }}
        title={isLoaded ? undefined : alt}
      >
        {fallback}
      </span>

      {/* kilau diagonal saat kartu induk di-hover */}
      <span
        aria-hidden
        className="org-logo-sheen pointer-events-none absolute inset-0 z-10 opacity-0"
        style={{
          background: `linear-gradient(115deg, transparent 34%, ${accent}38 50%, transparent 66%)`,
        }}
      />

      {showImage && (
        <Image
          ref={captureImg}
          src={src as string}
          alt={alt}
          width={size}
          height={size}
          unoptimized
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
          className="relative h-full w-full object-contain p-[18%] transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </span>
  );
}
