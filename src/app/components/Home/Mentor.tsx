"use client";
import MentorClientPage from "../mentor/mentorClientPage";

const Mentor = () => {
  interface mentor {
    img: string;
    name: string;
    role: string[];
    eks: string;
  }

  interface team {
    img: string;
    name: string;
    eks: string;
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
      eks: "jpg",
    },
    {
      img: "Mentor_2",
      name: "Grishandy Rifqi Ardiyanto",
      role: [
        "COO Sinari Desa, SkillUpkids.id",
        "Mentoring Python",
        "Cyber Security & Docker Infrastruktur",
      ],
      eks: "jpg",
    },
    {
      img: "Mentor_3",
      name: "Lingga Eka Praditya Tama",
      role: [
        "CTO Sinari Desa, SkillUpkids.id",
        "Programming NextJS, ReacT, Typescript, Python, PHP",
      ],
      eks: "jpeg",
    },
    {
      img: "Mentor_4",
      name: "M. Gusbayu Aji",
      role: [
        "CMO Sinari Desa, SkillUpkids.id",
        "Konten Creator",
        "Pengurus Pondok Pesantren",
      ],
      eks: "jpg",
    },
    {
      img: "Mentor_5",
      name: "Afrian Dicky Prasetya",
      role: [
        "CFO Sinari Desa, SkillUpkids.id",
        "Konten Creator",
        "Programing PHP & Cloud Enginer",
      ],
      eks: "jpg",
    },
    {
      img: "Mentor_6",
      name: "Azhar Surya Pratama S. Kom",
      role: [
        "CTO Unveil, Atmanio",
        "Programer Logika Python, JS, Docker",
        "Cyber Security & Cloud Enginer",
        "DPO Himtekk 2024",
      ],
      eks: "jpg",
    },
  ];

  const team: team[] = [
    {
      img: "Mentor_7",
      name: "Safira Nur Hidayah",
      eks: "png",
    },
    {
      img: "Mentor_8",
      name: "Hafidatul ilmi",
      eks: "png",
    },
    {
      img: "Mentor_9",
      name: "Riki Nur Indra Putra",
      eks: "png",
    },
    {
      img: "Mentor_10",
      name: "Naufal Azhar",
      eks: "png",
    },
    {
      img: "Mentor_11",
      name: "Ridho Karunia Setiawan",
      eks: "png",
    },
    {
      img: "Mentor_12",
      name: "Faud Dwi Hasan",
      eks: "png",
    },
  ];

  return (
    <>
      <section className="p-10 md:p-32 scroll-mt-14 md:scroll-mt-0" id="Mentor">
        <MentorClientPage />
      </section>
    </>
  );
};

export default Mentor;
