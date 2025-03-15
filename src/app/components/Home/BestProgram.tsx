"use client";
import Image from "next/image";

const BestProgram = () => {
  return (
    <>
      <section className="w-full bg-white p-2 md:p-10">
        <div className="bg-white w-3/4 mx-auto rounded-3xl">
          <h1 className="text-red-700 text-xl md:text-4xl mb-10 font-bold text-center mt-10 md:mt-0">
            Program Unggulan Kami
          </h1>
          <div className="bg-gray-700 p-5">
            <div className="flex flex-col">
              <Image
                src={"/img/Logo_PNB_Sinaridesa.png"}
                alt="Logo PNB Sinaridesa"
                width={150}
                height={150}
              />
              <h1 className="text-white font-normal text-xs md:text-sm w-3/4 py-10">
                SINARI DESA melalui Platform SINARI DESA Corp memiliki Program
                Mentoring Unggulan  “Program Cipta Maha Karya” Yaitu Program
                Mentoring Exclusive Selama 2-3 Bulan (6x Meeting) dengan fokus
                melatih 5 Skills yang sangat berpengaruh pada proses
                pengembangan diri  serta karir. Baik saat menjadi
                pelajar/mahasiswa, maupun bekal saat terjun di dunia
                professional dan wirausaha. Berbasis Kurikulum Merdeka
              </h1>
            </div>
          </div>
          <div className="bg-yellow-600 w-full p-5 rounded-b-3xl">
            <div className="block md:flex gap-4 justify-between">
              <h1 className="cursor-pointer text-white font-normal text-xs md:text-sm bg-red-700 py-2 px-4 rounded-xl">
                Selengkapnya
              </h1>
              <h1 className="text-white font-medium text-xs md:text-sm flex items-center mt-4 md:mt-0">
                Ayo Jadi “The Problem Solver” & Tumbuh Bersama SINARI DESA
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestProgram;
