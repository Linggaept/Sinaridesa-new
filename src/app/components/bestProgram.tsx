"use client";

import { ShineBorder } from "@/components/magicui/shine-border";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import Image from "next/image";

export function BestProgram() {
  const theme = useTheme();
  return (
    <>
      <h1 className="text-gray-900 text-2xl md:text-4xl mb-10 font-bold text-center mt-10 md:mt-10">
        Program Unggulan Kami
      </h1>
      <Card className="relative overflow-hidden max-w-3/4 mx-auto p-0">
        <ShineBorder shineColor={theme.theme === "dark" ? "white" : "black"} />
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent className=" py-2 px-4 w-full">
          <div className="flex gap-10 px-10 items-center">
            <p className="text-gray-900 font-semibold text-xs md:text-sm  text-justify">
              SINARI DESA melalui Platform SINARI DESA Corp memiliki Program
              Mentoring Unggulan  “Program Cipta Maha Karya” Yaitu Program
              Mentoring Exclusive Selama 2-3 Bulan (6x Meeting) dengan fokus
              melatih 5 Skills yang sangat berpengaruh pada proses pengembangan
              diri  serta karir. Baik saat menjadi pelajar/mahasiswa, maupun
              bekal saat terjun di dunia professional dan wirausaha. Berbasis
              Kurikulum Merdeka
            </p>
            <Image
              src="/img/logo/logo.png"
              alt="Logo PNB Sinaridesa"
              width={150}
              height={150}
              className="shadow-md shadow-black/30 bg-black rounded-md"
            ></Image>
          </div>
        </CardContent>
        <CardFooter className="bg-yellow-500 w-full rounded-b-2xl p-4 text-white font-semibold text-sm flex justify-end">
          Ayo Jadi “The Problem Solver” & Tumbuh Bersama SINARI DESA
        </CardFooter>
      </Card>
    </>
  );
}
