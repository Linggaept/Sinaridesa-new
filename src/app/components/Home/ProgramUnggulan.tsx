import Image from "next/image";

export default function ProgramUnggulan() {
  const programs = [
    {
      title: "SinariDesa AI Bootcamp",
      description: "Pelatihan AI praktis untuk ide bisnis, & penghasilan nyata",
      icon: "/img/program-unggulan/1.png",
    },
    {
      title: "SinariDesa Digitalpreneur",
      description: "Wirausaha digital, jualan online, freelancing",
      icon: "/img/program-unggulan/2.png",
    },
    {
      title: "SinariDesa Tech for Village",
      description: "Inovasi digital untuk solusi lokal",
      icon: "/img/program-unggulan/3.png",
    },
    {
      title: "SinariDesa Connect & SkillUp",
      description: "Pelatihan skill praktis + mentoring komunitas",
      icon: "/img/program-unggulan/1.png",
    },
  ];

  return (
    <section className="py-16 px-4 min-h-[95vh] bg-green-700 mx-auto flex items-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-28">
          <div
            className="inline-block px-8 py-4 rounded-2xl text-2xl md:text-6xl font-bold"
            style={{ backgroundColor: "#FFD54F", color: "#2E7D32" }}
          >
            Program Unggulan
          </div>
        </div>

        {/* Program Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <div key={index} className="p-6 rounded-2xl bg-green-900">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={program.icon}
                    width={50}
                    height={50}
                    alt={program.title}
                  />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {program.title}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
