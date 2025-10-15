import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationComp({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  return (
    <Pagination className="py-10 flex justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={
              page - 1 === 0 ? () => setPage(page) : () => setPage(page - 1)
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="cursor-pointer" onClick={() => setPage(1)}>
            {page - 1 === 0 ? null : page - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={`cursor-pointer ${totalPages == 0 ? "hidden" : null} `}
            onClick={() => setPage(page + 1)}
          >
            {page + 1 > totalPages ? null : page + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={`cursor-pointer ${totalPages == 0 ? "hidden" : null} `}
            onClick={
              page + 1 > totalPages || totalPages == 0
                ? () => setPage(page)
                : () => setPage(page + 1)
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={
              page + 1 > totalPages || totalPages == 0
                ? () => setPage(page)
                : () => setPage(page + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
