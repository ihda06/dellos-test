import usePaginationQuery from "@/hooks/usePagination";
import { Article, ArticlesResponse } from "@/types/dto/articles";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ArticleCard from "./article-card";
import ArticlesCardLoading from "./article-card-loading";
import Pagination from "@/components/ui/pagination";
import Image from "next/image";

export default function AllArticle({ keywords }: { keywords: string }) {
  const { page, setPage } = usePaginationQuery();
  const { data, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["articles", page, keywords],
    queryFn: () => {
      return axios.get<ArticlesResponse>(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
        {
          params: {
            page: page,
            fq: keywords,
            "api-key": process.env.NEXT_PUBLIC_NEWS_API_KEY,
            sort: "newest",
          },
        }
      );
    },
  });

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-5 grid-cols-1 md:grid-cols-3 gap-3">
        <ArticlesCardLoading />
      </div>
    );
  }
  if (!data?.data?.response?.docs?.length) {
    return <h1 className="text-center pt-10">Oops sorry, no article found</h1>;
  }

  return (
    <>
      <div className="grid lg:grid-cols-5 grid-cols-1 md:grid-cols-3 gap-3">
        {data?.data?.response?.docs?.map((article: Article) => (
          <ArticleCard
            key={article._id}
            image={
              <Image
                src={
                  article.multimedia.length > 0
                    ? `https://static01.nyt.com/${article.multimedia[0].url}`
                    : "/nytimes-default.png"
                }
                className="w-full h-36 object-cover"
                alt="article-image"
                width={300}
                height={300}
              />
            }
            title={article.headline.main}
            author={article.byline.original}
            date={article.pub_date}
            id={article._id}
          />
        ))}
      </div>
      {data && data?.data.response.docs.length > 0 && (
        <Pagination
          onChange={(e) => {
            setPage(e);
          }}
          page={page}
          count={data?.data.response.meta.hits}
        />
      )}
    </>
  );
}
