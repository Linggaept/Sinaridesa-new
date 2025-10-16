"use client";

import { getCourseBySlug } from "@/app/services/courseService";
import PdfDetails from "@/components/pdf-details";
import PdfPreview from "@/components/pdf-preview";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

type Product = {
  slug: string;
  title: string;
  description: string;
  filePath: string;
  uploader: string;
  thumbnail: string;
};

export default function ProductPdfPageClient({ slug }: { slug: string }) {
  const [pdf, setPdf] = useState<Product | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchPdf = async () => {
      try {
        const data = await getCourseBySlug(slug);
        setPdf(data.data);
      } catch (error) {
        console.error("Error fetching PDF details:", error);
      }
    };
    fetchPdf();
  }, [slug]);

  const pdfUrl = pdf ? `https://api.sinaridesa.com/${pdf.filePath}` : "";
  const thumbnailUrl = pdf ? `https://api.sinaridesa.com/${pdf.thumbnail}` : "";

  return (
    <main className="container mx-auto max-w-6xl px-4 py-20">
      {/* Header modern dengan Breadcrumb */}
      <header className="mb-6">
        {isClient && pdf ? (
          <>
            <h1 className="text-balance text-2xl font-semibold tracking-tight mt-3">
              {pdf.title}
            </h1>
            <p className="text-muted-foreground mt-2">
              {"Preview PDF di kiri, detail & unduhan di kanan."}
            </p>
          </>
        ) : (
          <>
            <Skeleton className="h-8 w-3/4 mt-3" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </>
        )}
      </header>

      {/* Gunakan Card dari shadcn dan buat panel kanan sticky di desktop */}
      <section
        className="grid grid-cols-1 gap-8 md:grid-cols-2"
        aria-label="Detail produk PDF"
      >
        {/* KIRI: Pratinjau PDF */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {isClient ? (
              <PdfPreview pdfUrl={pdfUrl} title={pdf?.title ?? ""} />
            ) : (
              <Skeleton className="h-[70vh] md:h-[78vh] w-full" />
            )}
          </CardContent>
        </Card>

        {/* KANAN: Info + Deskripsi */}
        <div className="md:sticky md:top-20 h-fit">
          <Card>
            <CardContent className="p-6">
              {isClient && pdf ? (
                <PdfDetails
                  title={pdf.title}
                  description={pdf.description}
                  filePath={pdfUrl}
                  uploader={pdf.uploader}
                  slug={pdf.slug}
                  thumbnail={thumbnailUrl}
                />
              ) : (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Separator className="my-4" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-3 pt-6">
                    <Skeleton className="h-10 w-36" />
                    <Skeleton className="h-10 w-36" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}