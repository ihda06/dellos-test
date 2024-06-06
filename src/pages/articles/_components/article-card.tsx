import dayjs from "dayjs";
import { compressToEncodedURIComponent } from "lz-string";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { BsArrowRight } from "react-icons/bs";

export default function ArticleCard({
  image,
  title,
  author,
  date,
  id,
}: {
  image: ReactNode;
  title: string;
  author: string;
  date: string;
  id: string;
}) {
  return (
    <div className=" border border-gray-200 rounded-2xl shadow p-6 flex flex-col justify-between">
      <div className="space-y-8">
        {image}
        <div className="space-y-3">
          <div className="">
            <div className="font-bold">{title}</div>
            <div className="flex items-center gap-3">
              <div className="text-sm">
                {author} - {dayjs(date).format("DD MMM YYYY")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={`/articles/${compressToEncodedURIComponent(id)}`}
        className="flex justify-between items-end pt-4 mt-2 border-t-2"
      >
        <span>Detail</span>
        <BsArrowRight size={20} />
      </Link>
    </div>
  );
}
