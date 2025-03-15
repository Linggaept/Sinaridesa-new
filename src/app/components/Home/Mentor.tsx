"use client";
import Image from "next/image";
import { CgEditBlackPoint } from "react-icons/cg";

const Mentor = () => {
  interface mentor {
    img: string;
    name: string;
    role: string[];
  }
  const mentors: mentor[] = [
    {
      img: "Mentor_1",
      name: "Rachmat Fachrurrozi",
      role: [
        "CEO - Sinari Desa, SkillUpKids.id",
        "DPO Himtekk 2024",
        "Leadership & Comunication Facilitator",
      ],
    },
    {
      img: "Mentor_2",
      name: "Grishandy Rifqi Ardiyanto",
      role: [
        "COO Sinari Desa, SkillUpkids.id",
        "Mentoring Python",
        "Cyber Security & Docker Infrastruktur",
      ],
    },
    {
      img: "Mentor_3",
      name: "Lingga Eka Praditya Tama",
      role: [
        "CTO Sinari Desa, SkillUpkids.id",
        "Programming NextJS, ReacT, Typescript, Python, PHP",
      ],
    },
    {
      img: "Mentor_4",
      name: "M. Gusbayu Aji",
      role: [
        "CMO Sinari Desa, SkillUpkids.id",
        "Konten Creator",
        "Pengurus Pondok Pesantren",
      ],
    },
    {
      img: "Mentor_5",
      name: "Afrian Dicky Prasetya",
      role: [
        "CFO Sinari Desa, SkillUpkids.id",
        "Konten Creator",
        "Programing PHP & Cloud Enginer",
      ],
    },
    {
      img: "Mentor_6",
      name: "Azhar Surya Pratama S. Kom",
      role: [
        "CTO SkillUpkids, Unveil, Atmanio",
        "Programer Logika Python, JS, Docker",
        "Cyber Security & Cloud Enginer",
        "DPO Himtekk 2024",
      ],
    },
  ];

  return (
    <>
      <section
        className="p-10 md:p-32 scroll-mt-14 md:scroll-mt-0"
        id="Mentor"
      >
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-32">
            Dewan Penasihat, Pelatih Utama, & Mentor
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
            {mentors.map((mentor, index) => (
              <div key={index} className="flex flex-col mx-auto gap-5 w-full">
                <div className="mx-auto bg-green-800 p-2 rounded-full">
                  <Image
                    src={`/img/${mentor.img}.jpg`}
                    alt="Belajar di desa"
                    width={180}
                    height={180}
                    className="rounded-full object-cover object-top aspect-square"
                  />
                </div>
                <div className="mx-auto">
                  <h1 className="text-2xl text-black">{mentor.name}</h1>
                </div>

                <div className="flex flex-col gap-2 mt-4 text-left">
                  {mentor.role.map((role, roleIndex) => (
                    <div key={roleIndex} className="flex items-start gap-2">
                      <CgEditBlackPoint className="text-green-800 w-3 h-3 mt-1.5" />
                      <span className="text-gray-700 w-11/12">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Mentor;
