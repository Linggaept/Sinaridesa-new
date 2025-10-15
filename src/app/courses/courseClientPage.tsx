'use client';

import CoursesList from "@/components/courses/couses-list";
import { PaginationComp } from "@/components/pagination";
import { useCourses } from "@/hooks/use-courses";
import { usePage } from "@/hooks/use-page";


const CourseClientPage = () => {
  const { page, setPage, limit } = usePage();
  const { courses, totalPages, loading } = useCourses(page, limit);

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">
          Program Pembelajaran bersama{" "}
          <span className="text-purple-700">SkillUpKids</span> by{" "}
          <span className="text-green-700">Sinari Desa</span>
        </h1>
        <h1 className="text-md font-normal text-center">All Courses</h1>
      </div>

      <CoursesList courses={courses} loading={loading} />
      <PaginationComp page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
};
export default CourseClientPage;
