import { MyArticle } from "@/types/dto/articles";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({
  abstract,
  date,
  id,
  image,
  title,
  author,
  url,
}: MyArticle) {
  return (
    <div className="grid grid-cols-2 gap-5 bg-white border rounded-lg">
      <div className="flex flex-col">
        <div className="space-y-6">
          <div className="">
            <h1 className="font-bold">{title}</h1>
            <div className="flex items-center gap-3">
              <small className="text-sm">
                {author} - {dayjs(date).format("DD MMM YYYY")}
              </small>
            </div>
          </div>
          <p>{abstract}</p>
        </div>
        <div className="flex-1 flex items-end ">
          <div className=" flex gap-2">
            <Link
              href={url || "#"}
              className="py-2 px-4 text-white bg-black rounded-full hover:bg-blue-800 duration-300 hover:text-white font-semibold disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500"
            >
              Access the article
            </Link>
          </div>
        </div>
      </div>

      <Image
        src={
          image ? `https://static01.nyt.com/${image}` : "/nytimes-default.png"
        }
        className="w-full h-72 object-cover"
        alt="article-image"
        width={300}
        height={300}
      />
    </div>
  );
}
