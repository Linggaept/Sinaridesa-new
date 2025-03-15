"use client";
import Image from "next/image";
import { useState } from "react";

const SmartAI = () => {

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <section
        className="bg-gray-50 scroll-mt-14 md:scroll-mt-0"
        id="SmartAi"
      >
        <div className="flex flex-col p-10 md:py-20 md:px-44 gap-10">
          <div className="flex flex-col items-center text-center gap-5">
            <h1 className="text-4xl font-bold text-black">
              Belajar Cerdas dengan AI{" "}
              <span className="text-indigo-600">Sinari Desa</span>
            </h1>
            <p className="text-gray-600 text-md">
              AI SINARI DESA menggabungkan kecerdasan buatan yang kuat dengan
              antarmuka yang intuitif untuk mengungkap wawasan kunci dari
              Pelajaran atau materi dalam hitungan detik
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 ">
            <div className="flex flex-col gap-5 w-10/12">
              <div className="flex md:w-10/12 w-10/12 ">
                <h1 className="text-3xl font-bold text-black">
                  <span className="text-indigo-600">Belajar</span> Mudah di{" "}
                  <span className="text-indigo-600">Ujung Jari Anda</span>
                </h1>
              </div>
              <div className="flex flex-col gap-5">
                <div className="bg-indigo-600 p-4 border-l-8 border-indigo-800">
                  <h1 className="text-md text-white font-normal">
                    <span className="font-bold">
                      Peringkasan dengan Satu Klik
                    </span>{" "}
                    - Teknologi AI kami dapat membantu anda belajar yang singkat
                    dengan satu klik.
                  </h1>
                </div>
                <div className="flex flex-col gap-5 ml-6">
                  <h1 className="text-gray-900">
                    <span className="font-bold text-black">
                      Kontrol Kustomisasi
                    </span>{" "}
                    - Sesuaikan jenis ringkasan, bahasa, dan parameter lainnya
                    sesuai kebutuhan Anda.
                  </h1>
                  <h1 className="text-gray-900">
                    <span className="font-bold text-black">
                      Alat Kolaborasi
                    </span>{" "}
                    - Bagikan ringkasan dan diskusikan wawasan kunci dengan
                    anggota tim.
                  </h1>
                  <h1 className="text-gray-900">
                    <span className="font-bold text-black">
                      Akses Cross-Platform
                    </span>{" "}
                    - Aplikasi web memungkinkan akses universal ke dokumen dan
                    ringkasan Anda di mana saja.
                  </h1>
                </div>

                <div
                  className="bg-indigo-600 rounded-md w-full md:w-7/12 hover:bg-white hover:border-2 hover:border-indigo-600 duration-300 cursor-help"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <h1 className="text-sm text-white hover:text-indigo-600 font-normal text-center p-4 hover:font-bold ">
                    {hovered
                      ? "Click Icon Pojok Kanan Bawah"
                      : "Coba Gratis Sekarang"}
                  </h1>
                </div>
              </div>
            </div>

            <div className="">
              <Image
                src={"/img/Ai.png"}
                alt="Smart AI"
                width={500}
                height={500}
                className="object-cover aspect-square"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmartAI;
