import Link from "next/link";

export default function MainBanner() {
  return (
    <div className=" overflow-hidden bg-blue-500 lg:p-20 p-10 rounded-xl space-y-14 text-center w-full">
      <div className="">
        <h2 className=" text-lg text-blue-100">Welcome to</h2>
        <h2 className="font-bold text-7xl  text-white">Dellos News</h2>
      </div>
      <div className=" w-[50%] mx-auto flex">
        <Link
          className="py-2 px-4 w-full  text-white bg-black rounded-2xl hover:bg-blue-800 duration-300 hover:text-white font-semibold"
          href={"/articles"}
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
