import ProductPdfPageClient from "./ProductPdfPageClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPdfPage({ params }: PageProps) {
  const { slug } = await params;
  
  return <ProductPdfPageClient slug={slug} />;
}