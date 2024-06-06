import { setCookie } from "cookies-next";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function MainBanner() {
  // const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (name) {
  //     setCookie("data", { name: name });
  //   }
  // };
  return (
    <div className=" overflow-hidden bg-blue-500 lg:p-20 p-10 rounded-xl space-y-14 text-center w-full">
      <div className="">
        <h2 className=" text-lg text-blue-100">Welcome to</h2>
        <h2 className="font-bold text-7xl  text-white">Dellos News</h2>
      </div>
      <div className=" w-[50%] mx-auto flex">
        {/* <div className="w-full flex gap-2 items-center ps-2">
          <IoSearch size={20} />
          <input
            className="w-full focus:outline-none"
            type="text"
            placeholder="Type your name here"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div> */}
        <Link
          className="py-2 px-4 w-full  text-white bg-black rounded-2xl hover:bg-blue-800 duration-300 hover:text-white font-semibold"
          href={"/articles"}
          // type="button"
        >
          Start
        </Link>
      </div>
      <dl className="w-[80%] mx-auto">
        <dt className="text-blue-900 font-bold">
          Access Exclusive Articles from NYTimes Most Popular
        </dt>
        <dd className="text-white text-sm">
          {`Unlock the most engaging, insightful, and thought-provoking articles
          from the New York Times' most popular section, all in one place. With
          DelosNews, you can now purchase premium articles effortlessly and stay
          ahead with the latest news and trends.`}
        </dd>
      </dl>
    </div>
  );
}
