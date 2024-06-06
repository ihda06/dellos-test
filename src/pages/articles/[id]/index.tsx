import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { ArticlesResponse, MyArticle } from "@/types/dto/articles";

import { decompressFromEncodedURIComponent } from "lz-string";
import { useRouter } from "next/router";
import Sidebar from "../_components/sidebar";
import { useMemo, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { BiCoinStack } from "react-icons/bi";
import { getCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";

export default function ArticlesPage({}) {
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const my_coin = getCookie("my_coin");
  const my_articles = getCookie("my_articles");

  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading, isFetching, isRefetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["articles"],
    queryFn: () => {
      return axios.get<ArticlesResponse>(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
        {
          params: {
            fq: `_id:("${decompressFromEncodedURIComponent(id)}")`,
            "api-key": process.env.NEXT_PUBLIC_NEWS_API_KEY,
          },
        }
      );
    },
    enabled: !!id,
    retryDelay: 12000,
  });

  const myArticles = useMemo(() => {
    if (!my_articles) return [];
    return JSON.parse(my_articles) as MyArticle[];
  }, [my_articles]);

  const price = useMemo(() => {
    if (!data) return 0;

    const pubDate = dayjs(data.data.response.docs[0].pub_date);

    if (dayjs().diff(pubDate, "day") <= 1) {
      return 50000;
    } else if (dayjs().diff(pubDate, "day") <= 7) {
      return 20000;
    } else {
      return 0;
    }
  }, [data]);

  const isDisabledBuy = useMemo(() => {
    if (!!my_coin && Number(my_coin) < price) {
      return true;
    }
    if (!!my_articles) {
      const articles = JSON.parse(my_articles) as MyArticle[];
      const totalFreeArticles = articles.filter(
        (article) => article.price === "0"
      ).length;

      if (totalFreeArticles >= 3) {
        return true;
      }
      if (articles.findIndex((article) => article.id === id) !== -1) {
        return true;
      }
    }
  }, [my_articles, my_coin, price, id]);

  if (isRefetching) {
    return <div className="w-full">Loading, Refetching</div>;
  }

  if (!data || isLoading || isFetching) {
    return <div className="w-full">Loading</div>;
  }

  const handleConfirm = () => {
    setConfirmationDialog(false);
    const newArticle: MyArticle = {
      id,
      title: data.data.response.docs[0].headline.main,
      image: data.data.response.docs[0].multimedia
        ? data.data.response.docs[0].multimedia[0].url
        : null,
      date: data.data.response.docs[0].pub_date,
      abstract: data.data.response.docs[0].abstract,
      price: price.toString(),
      author: data.data.response.docs[0].byline.original,
      url: data.data.response.docs[0].web_url,
    };
    if (my_articles) {
      const articles = JSON.parse(my_articles) as MyArticle[];
      const newArticles = [...articles, newArticle];
      setCookie("my_articles", JSON.stringify(newArticles));
    } else {
      setCookie("my_articles", JSON.stringify([newArticle]));
    }

    setCookie("my_coin", (Number(my_coin) - price).toString());
    if (price === 50000) {
      const reedem_ticket = getCookie("reedem_ticket");
      if (reedem_ticket) {
        setCookie("reedem_ticket", (Number(reedem_ticket) + 3).toString());
      } else {
        setCookie("reedem_ticket", "3");
      }
      toast.success(" Congratulations! You got 3 reedem tickets 🎉🎉🤟🤟");
    }
  };

  return (
    <>
      <div className="w-full space-y-6">
        <h1 className="text-3xl font-bold text-blue-800">Details Article</h1>
        <div className="w-full flex gap-6">
          <div className="w-[80%] flex flex-col gap-10 border rounded-lg p-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <div className="space-y-6">
                  <div className="">
                    <h1 className="font-bold">
                      {data.data.response.docs[0].headline.main}
                    </h1>
                    <div className="flex items-center gap-3">
                      <small className="text-sm">
                        {data.data.response.docs[0].byline.original} -{" "}
                        {dayjs(data.data.response.docs[0].pub_date).format(
                          "DD MMM YYYY"
                        )}
                      </small>
                    </div>
                  </div>
                  <p>{data.data.response.docs[0].abstract}</p>
                </div>
                <div className="flex-1 flex items-end ">
                  <div className=" flex gap-2">
                    <div className="flex gap-0.5 items-center">
                      <BiCoinStack className="text-yellow-500" size={30} />
                      <h4 className="text-lg font-bold text-blue-500">
                        {price}
                      </h4>
                    </div>
                    <button
                      disabled={isDisabledBuy}
                      onClick={() => setConfirmationDialog(true)}
                      className="py-2 px-4 text-white bg-black rounded-full hover:bg-blue-800 duration-300 hover:text-white font-semibold disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500"
                    >
                      {myArticles.findIndex((article) => article.id === id) !==
                      -1
                        ? "Purchased"
                        : "Buy Now"}
                    </button>
                  </div>
                </div>
              </div>
              {isFetching || isLoading ? (
                <div className="w-full h-72 border rounded-lg  bg-gray-300  animate-pulse"></div>
              ) : (
                <Image
                  src={
                    data.data.response.docs[0].multimedia[0]
                      ? `https://static01.nyt.com/${data.data.response.docs[0].multimedia[0].url}`
                      : "/nytimes-default.png"
                  }
                  className="w-full h-72 object-cover"
                  alt="article-image"
                  width={300}
                  height={300}
                />
              )}
            </div>
          </div>
          <Sidebar></Sidebar>
        </div>
      </div>
      <Transition
        show={confirmationDialog}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          onClose={() => setConfirmationDialog(false)}
          className="relative z-50 transition"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 bg-white p-7 rounded-lg">
              <DialogTitle className="font-bold">Confirmation</DialogTitle>
              <Description>
                Are you sure you want to buy this article?
              </Description>
              <p>
                You will exchange {price} for&nbsp;&quot;
                <b>{data.data.response.docs[0].headline.main}</b>&quot; article
                . Proceed?
              </p>
              <div className="flex gap-1.5 justify-end">
                <button
                  onClick={() => setConfirmationDialog(false)}
                  className="text-red-500 px-4 py-2 rounded-lg hover:bg-gray-200 font-bold duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 duration-300"
                >
                  Confirm
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
