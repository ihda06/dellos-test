import { MyArticle } from "@/types/dto/articles";

import { useEffect, useMemo, useState } from "react";

import { getCookie } from "cookies-next";
import ArticleCard from "./_components/article-card";
import { BiCoinStack } from "react-icons/bi";
import { GiBookshelf, GiEmptyWoodBucket } from "react-icons/gi";
import Link from "next/link";

export default function MyArticlePage({}) {
  const my_coin = getCookie("my_coin");
  const my_articles = getCookie("my_articles");
  const [isLoading, setIsLoading] = useState(true);

  const memoizeArticles: MyArticle[] = useMemo(() => {
    if (!my_articles) return [];
    return JSON.parse(my_articles) as MyArticle[];
  }, [my_articles]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="w-full space-y-6">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-blue-800">My Articles</h1>
          <div className="flex gap-2 items-center">
            <BiCoinStack className="text-yellow-500" size={30} />
            <span className="font-bold text-blue-700">
              {Intl.NumberFormat().format(Number(my_coin))}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div
            className="w-full h-10 bg-gray-300 animate-pulse rounded-full"
            data-testid="loading"
          ></div>
        ) : memoizeArticles.length > 0 ? (
          memoizeArticles.map((article: MyArticle) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
              image={article.image}
              date={article.date}
              abstract={article.abstract}
              price={article.price}
              author={article.author}
              url={article.url}
            />
          ))
        ) : (
          <div className="items-center flex flex-col justify-center gap-7 text-blue-800">
            <GiBookshelf size={200} />
            <h3 className=" text-5xl font-bold">Your article is empty</h3>
            <Link href="/articles" className="underline cursor-pointer">
              Buy an article
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
