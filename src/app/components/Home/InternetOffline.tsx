import Image from "next/image";
import Link from "next/link";


const InternetOffline = () => {
  return (
    <>
      <section
        className="w-full bg-gray-200 p-10 scroll-mt-14 md:scroll-mt-0 md:p-20"
        id="produk"
      >
        <div className="flex flex-col gap-10">
          <div className="">
            <h1 className="text-black text-3xl font-bold">
              Internet Offline{" "}
              <span className="text-green-700 text-3xl font-bold">
                Sinari Desa
              </span>
            </h1>
            <p className="text-gray-800 text-md">
              Menyediakan akses ke konten digital dan pendidikan berkualitas di
              daerah terpencil tanpa memerlukan koneksi internet, menggunakan
              teknologi ESP32 untuk mendukung pengembangan komunitas secara
              berkelanjutan.
            </p>
          </div>
          <div className="">
            <Image
              src={"/img/iot-sinaridesa.png"}
              alt="Belajar di desa"
              width={800}
              height={800}
              className="rounded-3xl ratio-square object-cover mx-auto hover:scale-105 cursor-pointer duration-300"
            />
          </div>

          <div className="w-full flex items-center justify-center">
            <Link href="https://wa.me/6285726631291" target="_blank">
              <button className="bg-cyan-400 font-semibold cursor-pointer focus:outline-none hover:bg-cyan-300 duration-300 hover:shadow-lg text-white px-4 py-2 md:py-4 rounded-md shadow-md w-44 md:w-56 md:text-md text-sm">
                Pesan Sekarang
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-x divide-gray-200 bg-white gap-10 rounded-3xl">
            <div className="flex-col md:p-10 p-5">
              <h1 className="text-lg text-green-700 font-semibold">
                The IoT Gateaway
              </h1>
              <p className="text-gray-700 font-normal text-md mt-4">
                Gerbang IoT Sinari Desa menggunakan ESP32 untuk menyediakan
                konten digital offline seperti situs web, modul pembelajaran,
                dan video edukasi. Ini ideal untuk daerah terpencil tanpa akses
                internet, menawarkan akses informasi dan pendidikan berkualitas.
                Perangkat ini juga mudah diintegrasikan dengan perangkat IoT
                lain, mendukung peningkatan literasi digital dan keterampilan
                teknologi di komunitas pedesaan.
              </p>
            </div>
            <div className="flex-col md:p-10 p-5">
              <h1 className="text-lg text-green-700 font-semibold">
                The Industrial IoT gateway
              </h1>
              <p className="text-gray-700 font-normal text-md mt-4">
                Gerbang IoT Industri Sinari Desa, juga berbasis ESP32, dirancang
                untuk kebutuhan industri dengan konektivitas IoT yang handal dan
                aman. Selain mengelola data industri, perangkat ini menyediakan
                konten edukatif offline untuk meningkatkan keterampilan pekerja
                di daerah terpencil. Ini menggabungkan teknologi canggih dengan
                misi pemberdayaan masyarakat, mendukung operasional industri
                serta pendidikan lokal tanpa memerlukan internet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InternetOffline;
