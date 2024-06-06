import { MyArticle } from "@/types/dto/articles";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCoin, BiCoinStack } from "react-icons/bi";

export default function Sidebar({}) {
  const my_coin = getCookie("my_coin");
  const my_articles = getCookie("my_articles");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <aside className="w-[20%] ">
      <div className="sticky top-[100px] flex flex-col gap-10 bg-white rounded-lg border p-6">
        <div className="">
          <h6 className="text-xl font-bold">My Coin</h6>
          {isLoading ? (
            <div
              className="w-full h-10 bg-gray-300 animate-pulse rounded-full"
              data-testid="loading"
            ></div>
          ) : (
            <div className="flex gap-2 items-center">
              <BiCoinStack className="text-yellow-500" size={30} />
              <h4 className="text-3xl font-bold text-blue-500">
                {Intl.NumberFormat().format(Number(my_coin))}
              </h4>
            </div>
          )}
        </div>
        <div className="">
          <h6 className="text-xl font-bold">My Articles</h6>
          {isLoading ? (
            <div className="w-full h-10 bg-gray-300 animate-pulse rounded-full"></div>
          ) : (
            <>
              {my_articles ? (
                <div className="w-full overflow-hidden">
                  {JSON.parse(my_articles).map(
                    (article: MyArticle, index: number) => (
                      <div
                        key={article.id}
                        className="p-1 border gap-1 rounded-lg"
                      >
                        <Link
                          className="text-xs truncate font-bold underline"
                          href={`/articles/${article.id}`}
                        >
                          {index + 1}. {article.title}
                        </Link>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <h4>{`Oh! You don't have any article 😅`}</h4>
              )}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
