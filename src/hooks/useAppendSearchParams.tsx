import { useCallback } from "react";
import { useRouter } from "next/router";

function createUrlWithQueryParams(
  path: string,
  queryParams: {
    [key: string]: string | string[] | number | null | undefined | boolean;
  }
): string {
  const urlParams = new URLSearchParams();

  Object.entries(queryParams).map(([k, v]) => {
    if (v) {
      urlParams.append(k, v.toString());
    }
  });

  const queryString = urlParams.toString();

  return queryString ? `${path}?${queryString}` : path;
}

export default function useAppendSearchParams() {
  const router = useRouter();

  const appendSearchParams = useCallback(
    (key: Record<string, string | number | undefined | null | string[]>) => {
      router.replace(
        createUrlWithQueryParams(router.pathname, {
          ...router.query,
          ...key,
        }),
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );

  return {
    router,
    appendSearchParams,
  };
}
