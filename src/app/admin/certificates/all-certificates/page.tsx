"use client";

import { CertificatesTable } from "@/app/components/table/tableCertificates";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AllCertificatesPage = () => {
  return (
    <main className="p-6">
      <section className="mx-auto w-full space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-pretty text-2xl font-semibold tracking-tight">
              Manajemen Sertifikat
            </h1>
            <p className="text-muted-foreground">
              Kelola semua data sertifikat yang tersedia di platform sinari desa.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/certificates/all-certificates/create">
              Buat Sertifikat Baru
            </Link>
          </Button>
        </header>

        <Suspense
          fallback={
            <div className="text-sm text-muted-foreground">Memuat tabel...</div>
          }
        >
          <CertificatesTable />
        </Suspense>
      </section>
    </main>
  );
};
export default AllCertificatesPage;
