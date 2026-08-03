# Logo instansi

Taruh logo di folder ini dengan **nama file persis** seperti daftar di bawah.
Begitu file-nya ada, logo langsung muncul di web — tidak perlu ubah kode sama sekali.

Selama file belum ada, tile otomatis menampilkan glyph aksara Jawa sebagai
pengganti, jadi tampilan tetap rapi (bukan kotak kosong / broken image).

## Section Pengalaman (`src/app/data/experiences.ts`)

| File                    | Untuk                                              |
| ----------------------- | -------------------------------------------------- |
| `esize.png`             | PT Esize Surakarta                                  |
| `fatisda-uns.png`       | FATISDA UNS (asisten Data Structure & Algorithm)     |
| `pkkmb-fatisda.png`     | PKKMB FATISDA UNS                                   |
| `bem-fatisda.png`       | BEM FATISDA UNS                                     |
| `himaster.png`          | HIMASTER UNS (dipakai 2 entri)                      |
| `pingfest.png`          | PINGFEST                                            |

## Section Karya & Capaian (`src/app/data/achievements.ts`)

| File             | Untuk                                             |
| ---------------- | ------------------------------------------------- |
| `base.png`       | Base / Coinbase (dipakai 3 entri)                 |
| `teknokrat.png`  | Universitas Teknokrat Indonesia                   |
| `lisk.png`       | Lisk                                              |
| `devweb3.png`    | Dev Web3 Jogja                                    |

## Spesifikasi

- **Format**: `.png` transparan paling aman. `.svg` dan `.webp` juga jalan —
  kalau pakai ekstensi lain, ubah path-nya di file data yang bersangkutan.
- **Ukuran**: minimal 128 × 128 px, persegi. Logo dipasang `object-contain`
  dengan padding 18 %, jadi logo horizontal pun tetap muat tanpa terpotong.
- **Warna**: latar gelap (`#15110d`). Logo berwarna terang / putih paling
  kelihatan. Logo gelap solid sebaiknya diganti versi putihnya dulu.
