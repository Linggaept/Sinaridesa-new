import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, ExternalLink } from "lucide-react";
import Image from "next/image";

type PdfDetailsProps = {
  slug: string;
  title: string;
  description: string;
  filePath: string;
  uploader: string;
  thumbnail: string;
};

export default function PdfDetails({
  title,
  description,
  filePath,
  thumbnail,
}: PdfDetailsProps) {
  return (
    <div className="flex h-full flex-col">
      <h2 className="text-pretty text-xl font-semibold tracking-tight">
        {title}
      </h2>

      {/* Metadata ringkas */}
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
        {thumbnail ? (
          <div className="rounded-md border px-3 py-2">
            <dt className="text-muted-foreground">{"Thumbnail"}</dt>
            <Image
              src={thumbnail}
              alt={title}
              width={200}
              height={200}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}
      </dl>

      <Separator className="my-4" />

      {/* Deskripsi */}
      <p className="text-pretty text-sm text-muted-foreground">{description}</p>

      {/* Aksi */}
      <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
        <Button asChild aria-label="Unduh PDF">
          <a href={filePath} download>
            <Download className="mr-2 h-4 w-4" />
            {"Download PDF"}
          </a>
        </Button>
        <Button variant="secondary" asChild aria-label="Buka PDF di tab baru">
          <a href={filePath} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            {"Buka di Tab Baru"}
          </a>
        </Button>
      </div>
    </div>
  );
}
