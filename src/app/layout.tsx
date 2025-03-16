import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sinari Desa - Dari Desa Untuk Dunia!",
  description:
    "Sinari Desa adalah sebuah platform TIK inovatif yang berfokus pada peningkatan keterampilan dan pengembangan diri anak-anak muda di desa",
  keywords: [
    "desa",
    "teknologi",
    "pendidikan",
    "blockchain",
    "internet offline",
    "smart ai",
    "desa modern",
    "desa digital",
    "modern",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="!scroll-smooth"
      style={{ scrollBehavior: "smooth" }}
    >
      <title>Sinari Desa - Dari Desa Untuk Dunia!</title>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
