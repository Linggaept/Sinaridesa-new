import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    title: "Muhammad Ikhsan",
    text: "Ini adalah program yang sangat menarik. Sinari Desa, yang selalu memberikan pelayanan yang baik. Sinari Desa, yang selalu memberikan pelayanan yang baik.",
  },
  {
    title: "Arip Santoso",
    text: "Kami sangat senang dengan program ini. Kami sangat senang dengan program ini. Sinari Desa, yang selalu memberikan pelayanan yang baik. Sinari Desa, yang selalu memberikan pelayanan yang baik.",
  },
  {
    title: "Dwi Aris Setiawan",
    text: "Program ini sangat menarik. Sinari Desa, yang selalu memberikan pelayanan yang baik. Sinari Desa, yang selalu memberikan pelayanan yang baik.",
  },
  {
    title: "Siti Aminah",
    text: "Saya merasa sangat terbantu dengan adanya Sinari Desa. Programnya tidak hanya membantu ekonomi desa, tetapi juga meningkatkan kualitas hidup kami.",
  },
  {
    title: "Bambang Sugiharto",
    text: "Sinari Desa adalah inisiatif yang luar biasa. Programnya membantu kami dalam pengelolaan sumber daya desa dengan lebih efektif dan efisien.",
  },
  {
    title: "Rina Wahyuni",
    text: "Pelayanan dari Sinari Desa sangat baik! Timnya selalu siap membantu dan memberikan solusi terbaik bagi masyarakat desa.",
  },
];

const firstRow = reviews.slice(reviews.length / 6);

const ReviewCard = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <figure
        className={cn(
          "relative w-full max-w-md cursor-pointer overflow-hidden rounded-xl border p-4 shadow-md shadow-black/30 transition-all duration-300",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01]"
          // dark styles
        )}
      >
        <div className="flex flex-row items-center gap-2 w-full">
          <div className="flex flex-col justify-center items-center justify-items-center w-full">
            <figcaption className="text-lg font-medium dark:text-white">
              {title}
            </figcaption>
            <blockquote className="mt-2 text-sm text-gray-800 text-justify">
              {text}
            </blockquote>
          </div>
        </div>
      </figure>
    </div>
  );
};

export default function Testimonial() {
  return (
    <>
      <Header />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review, index) => (
            <ReviewCard key={`${review.title}-${index}`} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </>
  );
}

const Header = () => {
  return (
    <div className="w-3/4 md:w-1/2 flex flex-col mx-auto text-center mt-20">
      <h1 className="text-gray-800 font-bold text-4xl">Testimonial</h1>
      <p className="text-sm font-normal text-gray-700 py-4">
        Pendapat mereka yang telah merasakan manfaat Sinari Desa dalam
        meningkatkan kesejahteraan masyarakat, memberikan solusi inovatif, dan
        mendukung perkembangan desa menuju masa depan yang lebih baik.
      </p>
    </div>
  );
};
