import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  thumbnail: string;
  title: string;
  uploader: string;
  slug?: string;
}

const CourseCardSkeleton = () => (
  <div className="bg-gray-100 shadow-md p-2 rounded-md">
    <div className="flex flex-col gap-5">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-12 w-1/2 rounded-md" />
      </div>
    </div>
  </div>
);

const CoursesList = ({ courses, loading }: { courses: Course[], loading: boolean }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
      {loading
        ? Array.from({ length: 6 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))
        : courses.map((card, index) => (
            <Link key={index} href={`/courses/${card.slug}`}>
              <div className="bg-gray-100 shadow-md p-2 rounded-md">
                <div className="flex flex-col gap-5">
                  <Image
                    src={`https://api.sinaridesa.com/${card.thumbnail}`}
                    width={200}
                    height={200}
                    alt={card.title}
                    className="rounded-xl aspect-video object-cover w-full"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-gray-700 text-xs">{card.uploader}</h1>
                    <h1 className="text-gray-700 text-sm md:text-md font-semibold h-16 md:h-20 overflow-y-auto w-full md:w-3/4">
                      {card.title}
                    </h1>
                  </div>
                  <div className="">
                    <Link href={`/courses/${card.slug}`}>
                      <div className="mt-4 bg-green-700 rounded-md w-full md:w-1/2 cursor-pointer hover:bg-green-600 duration-300">
                        <h1 className="text-sm text-white font-normal text-center p-2 md:p-4">
                          Course Detail
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default CoursesList;