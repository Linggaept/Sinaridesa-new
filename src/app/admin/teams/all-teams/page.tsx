"use client";

import { TeamsTable } from "@/app/components/table/tableTeams";
import { Suspense } from "react";

const AllTeamsPage = () => {
  return (
    <main className="p-6">
      <section className="mx-auto w-full space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-pretty text-2xl font-semibold tracking-tight">
              Manajemen Team Data
            </h1>
            <p className="text-muted-foreground">
              Kelola semua data team yang tersedia di platform sinari desa.
            </p>
          </div>
        </header>

        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Memuat tabel...</div>
          }
        >
          <TeamsTable />
        </Suspense>
      </section>
    </main>
  );
};
export default AllTeamsPage;
