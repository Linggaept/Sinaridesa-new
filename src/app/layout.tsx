import ConditionalLayout from "@/components/layout/conditionalLayout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { Toaster } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { cookies } from "next/headers";

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
  icons: "/favicon.ico",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
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
        <ConditionalLayout token={token}>
          {children}
        </ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}