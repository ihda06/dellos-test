import { useCallback, useMemo } from "react";

const DEFAULT_OFFSET = 0;
const DEFAULT_PAGINATION_LIMIT = 10;

import useAppendSearchParams from "@/hooks/useAppendSearchParams";

function isNumberValid(num: number) {
  return !Number.isNaN(num) && Number.isFinite(num);
}
export default function usePaginationQuery() {
  const { router, appendSearchParams } = useAppendSearchParams();
  const {
    q,
    offset: qOffset,
    limit: qLimit,
  } = router.query as {
    q: string;
    offset: string;
    limit: string;
  };

  const offset = isNumberValid(Number(qOffset))
    ? Number(qOffset)
    : DEFAULT_OFFSET;
  const limit = isNumberValid(Number(qLimit))
    ? Number(qLimit)
    : DEFAULT_PAGINATION_LIMIT;

  const page = useMemo(() => {
    if (isNumberValid(offset) && isNumberValid(limit)) {
      return Math.floor(Number(offset) / Number(limit)) + 1;
    }

    return 1;
  }, [offset, limit]);

  const setPage = useCallback(
    (page: number) => {
      appendSearchParams({
        offset: (page - 1) * Number(limit),
      });
    },
    [limit, appendSearchParams]
  );

  /* set default value if there is no limit query params  */

  const setKeywords = useCallback(
    (keywords: string) => {
      appendSearchParams({
        q: keywords,
        // offset: DEFAULT_OFFSET,
      });
    },
    [appendSearchParams]
  );

  const setLimit = useCallback(
    (limit: number) => {
      appendSearchParams({
        limit,
        offset: DEFAULT_OFFSET,
      });
    },
    [appendSearchParams]
  );

  return {
    offset,
    keywords: q,
    setKeywords,
    page,
    setPage,
    limit,
    setLimit,
  };
}
