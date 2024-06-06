import { MostApiResponse } from "@/types/dto/articles";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ArticleCard from "./article-card";
import ArticlesCardLoading from "./article-card-loading";
import Image from "next/image";

export default function FilterMostApi({
  filter,
  keywords,
  period = "1",
}: {
  filter: "emailed" | "shared" | "viewed";
  keywords: string;
  period: "1" | "7" | "30";
}) {
  const { data, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    // placeholderData: keepPreviousData,
    queryKey: ["articles", filter, period],
    queryFn: () => {
      return axios.get<MostApiResponse>(
        `https://api.nytimes.com/svc/mostpopular/v2/${filter}/${period}.json`,
        {
          params: {
            // period: period,
            "api-key": process.env.NEXT_PUBLIC_NEWS_API_KEY,
          },
        }
      );
    },
  });

  const filteredData = data?.data?.results.filter((article) => {
    return article.title.toLowerCase().includes(keywords.toLowerCase());
  });

  if (!filteredData || isLoading) {
    return (
      <div className="grid lg:grid-cols-5 grid-cols-1 md:grid-cols-3 gap-3">
        <ArticlesCardLoading />
      </div>
    );
  }
  return (
    <>
      <div className="grid lg:grid-cols-5 grid-cols-1 md:grid-cols-3 gap-3">
        {filteredData.map((article) => (
          <ArticleCard
            key={article.uri}
            image={
              <Image
                src={
                  article.media.length > 0
                    ? article.media[0]["media-metadata"][0].url
                    : "/nytimes-default.png"
                }
                className="w-full h-36 object-cover"
                alt="article-image"
                width={300}
                height={300}
              />
            }
            title={article.title}
            author={article.byline}
            date={article.published_date}
            id={article.uri}
          />
        ))}
      </div>
    </>
  );
}
