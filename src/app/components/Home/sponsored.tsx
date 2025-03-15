import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const reviews = [
  {
    img: "/img/sponsor/ieee-blue.png",
  },
  {
    img: "/img/sponsor/ieee-orange.png",
  },
  {
    img: "/img/sponsor/amikom.png",
  },
  {
    img: "/img/sponsor/IEEE Amikom.png",
  },
  {
    img: "/img/sponsor/IEEE Pusat.png",
  },
  {
    img: "/img/sponsor/IEEE women.png",
  },
  {
    img: "/img/sponsor/IEEE indo.png",
  },
  {
    img: "/img/sponsor/IEEE Amikom.png",
  },
  {
    img: "/img/sponsor/sinaridesa.jpg",
  },
  {
    img: "/img/sponsor/CyberAi.png",
  },
];

const firstRow = reviews.slice(reviews.length / 10);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-full cursor-pointer overflow-hidden rounded-xl border p-4 shadow-md shadow-black/30 transition-all duration-300 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] "
        // dark styles
      )}
    >
      <div className="flex justify-center items-center w-full h-full">
        <Image
          className="w-full h-auto object-contain"
          width={150} // Bisa sesuaikan width & height sebagai default ukuran
          height={120}
          alt={img}
          src={img}
        />
      </div>
    </figure>
  );
};

const Header = () => {
  return (
    <div className="w-1/2 flex flex-col mx-auto text-center mt-10">
      <h1 className="text-gray-800 font-bold text-4xl">Support</h1>
      <p className="text-sm font-normal text-gray-700 py-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
        quisquam fugit sint, tempore enim aspernatur fuga asperiores voluptate,
        error ex excepturi similique iste odio et ipsum quibusdam commodi sit
        distinctio!
      </p>
    </div>
  );
};

export function Sponsored() {
  return (
    <>
      <Header />
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review, index) => (
            <ReviewCard key={`${review.img}-${index}`} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </>
  );
}
