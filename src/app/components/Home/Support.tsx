"use client";
import Image from "next/image";

export default function Support() {
  interface Pict {
    src: string;
  }
  const picts: Pict[] = [
    {
      src: "Support_1",
    },
    {
      src: "Support_2",
    },
    {
      src: "Support_3",
    },
    {
      src: "Support_4",
    },
    {
      src: "Support_5",
    },
    {
      src: "Support_6",
    },
  ];

  return (
    <>
      <section className="min-h-screen flex items-center">
        <div className="flex flex-col mx-auto p-10 md:p-20 w-3/4 gap-8 ">
          <div className="flex">
            <h1 className="text-2xl md:text-3xl text-black font-bold text-center mx-auto">
              Siap Menjadi Bagian & Mendukung SDGs
            </h1>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            {picts.map((pict, index) => (
              <Image
                key={index}
                src={`/img/${pict.src}.png`}
                alt={`Support ${index + 1}`}
                width={500}
                height={500}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
