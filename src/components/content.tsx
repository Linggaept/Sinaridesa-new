import Image from "next/image";

interface BlogContentProps {
  description: string;
  image?: string;
}

export const Content = ({ description, image }: BlogContentProps) => {
  return (
    <article className="space-y-8">
      {image && (
        <div className="bg-muted aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={`https://api.sinaridesa.com/${image}`}
            alt="Blog cover"
            className="h-full w-full object-cover"
            width={800}
            height={450}
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {description.split("\n").map((paragraph, index) => (
          <p key={index} className="text-blog-content mb-6 leading-relaxed text-justify">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};
