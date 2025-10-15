type PdfPreviewProps = {
  pdfUrl: string;
  title: string;
};

export default function PdfPreview({ pdfUrl, title }: PdfPreviewProps) {
  if (!pdfUrl) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center bg-muted md:h-[78vh]">
        <div className="p-6 text-center text-sm text-muted-foreground">
          {"Memuat pratinjau PDF..."}
        </div>
      </div>
    );
  }

  return (
    <figure>
      <div className="rounded-md overflow-hidden bg-muted">
        {/* Menggunakan <object> agar fallback tampil bila embed tidak didukung */}
        <object
          data={pdfUrl}
          type="application/pdf"
          className="h-[70vh] md:h-[78vh] w-full"
          aria-label={`Pratinjau PDF untuk ${title}`}
        >
          <div className="p-6 text-center text-sm text-muted-foreground">
            {"Pratinjau PDF tidak tersedia di perangkat ini."}
            <br />
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {"Buka PDF di tab baru"}
            </a>
          </div>
        </object>
      </div>
      <figcaption className="sr-only">{`Pratinjau: ${title}`}</figcaption>
    </figure>
  );
}
