"use client";

import { ShineBorder } from "@/components/magicui/shine-border";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function BestProgram() {
  const theme = useTheme();
  return (
    <>
      <div className="flex flex-col w-full mx-auto justify-center">
        <h1 className="text-gray-900 text-2xl md:text-4xl mb-4 font-bold text-center mt-10 md:mt-10">
          Program Unggulan Kami
        </h1>
        <p className="text-sm font-normal text-gray-700 pb-4 items-center justify-center text-center w-1/2 mx-auto">
          Sinari Desa membantu anak muda desa mengembangkan keterampilan untuk
          pendidikan, karir, dan wirausaha.
        </p>
      </div>
      <Card className="relative overflow-hidden max-w-3/4 mx-auto p-0">
        <ShineBorder shineColor={theme.theme === "dark" ? "white" : "black"} />
        <CardContent className="py-10 px-4 w-full bg-gray-800">
          <div className="block md:flex gap-10 px-10 items-center ">
            <p className="text-white font-semibold text-xs md:text-sm text-center md:text-justify">
              <span className="underline">Sinari Desa</span>
               melalui Platform Sinari Desa memiliki Program Mentoring Unggulan 
              “Program Cipta Maha Karya” Yaitu Program Mentoring Exclusive
              Selama 2-3 Bulan (6x Meeting) dengan fokus melatih 5 Skills yang
              sangat berpengaruh pada proses pengembangan diri  serta karir.
              Baik saat menjadi pelajar/mahasiswa, maupun bekal saat terjun di
              dunia professional dan wirausaha. Berbasis Kurikulum Merdeka
            </p>
            <div className="w-full items-center  justify-center mx-auto flex py-4 md:py-0">
              <Image
                src="/img/logo/logo.png"
                alt="Logo PNB Sinaridesa"
                width={150}
                height={150}
                className="shadow-md shadow-white/30 bg-black rounded-md flex items-center"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-yellow-600 w-full rounded-b-2xl p-4 text-white font-semibold text-sm flex justify-end -mt-6">
          Ayo Jadi “The Problem Solver” & Tumbuh Bersama Sinari Desa
        </CardFooter>
      </Card>
    </>
  );
}
