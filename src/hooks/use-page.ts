import { useState } from "react";

export const usePage = () => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  return { page, setPage, limit, setLimit };
};
