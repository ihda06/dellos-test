import usePaginationQuery from "@/hooks/usePagination";
import Sidebar from "./_components/sidebar";
import { useMemo, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import Toggle from "@/components/ui/toggle";
import AllArticle from "./_components/all-article";
import { useRouter } from "next/router";
import FilterMostApi from "./_components/filter-most-api";
import Dropdown from "@/components/ui/dropdown";

export default function ArticlesPage({}) {
  const router = useRouter();
  const { filter = "all", period = "1" } = router.query as {
    filter?: "all" | "most-emailed" | "most-shared" | "most-viewed";
    period?: "1" | "7" | "30";
  };
  const { setPage } = usePaginationQuery();
  const getFilter = useMemo(() => {
    switch (filter) {
      case "most-emailed":
        return "emailed";
      case "most-shared":
        return "shared";
      case "most-viewed":
        return "viewed";
      default:
        return undefined;
    }
  }, [filter]);
  const [keywords, setKeywords] = useState<string>("");
  const periodOptions = [
    { label: "1 Day", value: "1" },
    { label: "7 Days", value: "7" },
    { label: "30 Days", value: "30" },
  ];

  const debouncedKeyword = useDebounce(keywords);

  return (
    <div className="w-full flex gap-6">
      <div className="w-[80%] flex flex-col gap-10">
        <h1 className="text-3xl font-bold text-blue-800">Articles Page</h1>
        <div className="space-y-3 ">
          <div className="flex gap-3 w-full items-end">
            <div className="flex gap-3">
              <input
                className="p-2 border rounded-lg"
                placeholder="Search"
                value={keywords}
                onChange={(e) => {
                  setKeywords(e.target.value);
                  setPage(1);
                }}
              ></input>
              <Toggle
                value={"all"}
                setValue={(e) => {
                  router.replace({ query: { ...router.query, filter: e } });
                }}
                currentValue={filter}
              >
                All
              </Toggle>
              <Toggle
                value={"most-emailed"}
                setValue={(e) => {
                  router.replace({ query: { ...router.query, filter: e } });
                }}
                currentValue={filter}
              >
                Most Emailed
              </Toggle>
              <Toggle
                value={"most-shared"}
                setValue={(e) => {
                  router.replace({ query: { ...router.query, filter: e } });
                }}
                currentValue={filter}
              >
                Most Shared
              </Toggle>
              <Toggle
                value={"most-viewed"}
                setValue={(e) => {
                  router.replace({ query: { ...router.query, filter: e } });
                }}
                currentValue={filter}
              >
                Most Popular
              </Toggle>
            </div>
            {filter !== "all" && (
              <div className="flex-1 flex justify-end items-end">
                <Dropdown
                  label="Period"
                  options={periodOptions}
                  value={periodOptions.find((e) => e.value === period)}
                  onChange={(e) => {
                    router.replace({
                      query: {
                        ...router.query,
                        period: e as unknown as string,
                      },
                    });
                  }}
                />
              </div>
            )}
          </div>
          {getFilter === undefined ? (
            <AllArticle keywords={debouncedKeyword}></AllArticle>
          ) : (
            <FilterMostApi
              period={period ? period : "1"}
              keywords={debouncedKeyword}
              filter={getFilter}
            ></FilterMostApi>
          )}
        </div>
      </div>
      <Sidebar></Sidebar>
    </div>
  );
}
