"use client";
import CoursesList from "@/components/courses/couses-list";
import { useCourses } from "@/hooks/use-courses";
import Link from "next/link";

const LearningBook = () => {
  const { courses, loading } = useCourses(1, 3);

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

        <CoursesList courses={courses} loading={loading} />
        <Link href={"/courses"}>
          <div className="mt-4 bg-green-700 rounded-md w-full  cursor-pointer hover:bg-green-600 duration-300">
            <h1 className="text-sm text-white font-normal text-center p-2 md:p-4">
              See All Courses
            </h1>
          </div>
        </Link>
      </section>
    </>
  );
};

export default LearningBook;