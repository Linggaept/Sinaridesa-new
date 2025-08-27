"use client";
import Image from "next/image";
import Link from "next/link";
const LearningBook = () => {
  interface Card {
    img: string;
    owner: string;
    title: string;
  }
  const Cards: Card[] = [
    {
      img: "LearningBook_1",
      owner: "Sinari Desa X SkillUpKids",
      title: "Merancang Strategi Pemasaran Sebagai Praktisi Pemasaran",
    },
    {
      img: "LearningBook_2",
      owner: "Sinari Desa X SkillUpKids",
      title: "Memasarkan Produk bagi calon Spesialis Pemasaran Digital",
    },
    {
      img: "LearningBook_3",
      owner: "Sinari Desa X SkillUpKids",
      title: "Mengelola Toko Online Di Marketplace Bagi Praktisi Pemasaran",
    },
    {
      img: "LearningBook_4",
      owner: "Sinari Desa X SkillUpKids",
      title: "Merancang Copywriting Periklanan Bagi PraktisiPemasaran",
    },
    {
      img: "LearningBook_5",
      owner: "Sinari Desa X SkillUpKids",
      title: "Berjualan online di marketplace bagi praktisi pemasaran",
    },
    {
      img: "LearningBook_6",
      owner: "Sinari Desa X SkillUpKids",
      title: "Membuat Website Dan Toko Online Untuk Para Pelaku UMKM",
    },
  ];

  return (
    <>
      <section
        className="p-10 md:py-20 lg:px-60 xl:px-72 scroll-mt-14 md:scroll-mt-0 text-black"
        id="Courses"
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-center">
            Program Pembelajaran bersama{" "}
            <span className="text-purple-700">SkillUpKids</span> by{" "}
            <span className="text-green-700">Sinari Desa</span>
          </h1>
          <h1 className="text-md font-normal text-center">Top Courses</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
          {Cards.map((card, index) => (
            <div key={index} className="bg-gray-100 shadow-md p-2 rounded-md">
              <div className="flex flex-col gap-5">
                <Image
                  src={`/img/${card.img}.png`}
                  width={200}
                  height={200}
                  alt={card.title}
                  className="rounded-xl aspect-video object-cover w-full"
                />
                <div className="flex flex-col">
                  <h1 className="text-gray-700 text-xs">{card.owner}</h1>
                  <h1 className="text-gray-700 text-sm md:text-md font-semibold h-16 md:h-20 overflow-y-auto w-full md:w-3/4">
                    {card.title}
                  </h1>
                </div>
                <div className="">
                  <Link href={"/#Courses"}>
                    <div className="mt-4 bg-green-700 rounded-md w-full md:w-1/2 cursor-pointer hover:bg-green-600 duration-300">
                      <h1 className="text-sm text-white font-normal text-center p-2 md:p-4">
                        Course Detail
                      </h1>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className=""></div>
        </div>
      </section>
    </>
  );
};

export default LearningBook;
