"use client";

import { CoursesTable } from "@/app/components/table/tableCourses";
import { Suspense, useState } from "react";
import { CreateCourseDialog } from "@/app/components/courses/CreateCourseDialog";

const AllCoursesPage = () => {
  const [tableKey, setTableKey] = useState(0);

  const handleCourseCreated = () => {
    setTableKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="p-6">
      <section className="mx-auto w-full space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-pretty text-2xl font-semibold tracking-tight">
              Manajemen Course Data
            </h1>
            <p className="text-muted-foreground">
              Kelola semua data course yang tersedia di platform sinari desa.
            </p>
          </div>
          <CreateCourseDialog onCourseCreated={handleCourseCreated} />
        </header>

        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Memuat tabel...</div>
          }
        >
          <CoursesTable key={tableKey} />
        </Suspense>
      </section>
    </main>
  );
};
export default AllCoursesPage;
