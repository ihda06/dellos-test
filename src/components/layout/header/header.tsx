import Image from "next/image";
import HeaderLink from "./header-link";
import { FaInstagram, FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCookies, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Articles",
    href: "/articles",
  },
  {
    name: "My Articles",
    href: "/my-articles",
  },
  {
    name: "Lucky Coin",
    href: "/lucky-coin",
  },
];

export default function Header() {
  const router = useRouter();
  return (
    <header className="flex sticky top-0 rounded-b-lg shadow py-7 px-10 justify-between bg-white items-center">
      <div className="flex gap-6">
        <Image
          fetchPriority="high"
          src={"/dellos-logo.png"}
          alt="Dellos Logo"
          width={100}
          height={100}
        />
        <div className="flex gap-1">
          {routes.map((route) => (
            <HeaderLink
              key={route.name}
              text={route.name}
              href={route.href}
              active={router.pathname === route.href}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Link
          href="https://www.instagram.com/dellos.id/"
          className="hover:font-bold hover:bg-gray-200 rounded-full duration-300 w-8 h-8 flex justify-center items-center"
        >
          <FaInstagram size={20} />
        </Link>
        <Link
          href="https://www.instagram.com/dellos.id/"
          className="hover:font-bold hover:bg-gray-200 rounded-full duration-300 w-8 h-8 flex justify-center items-center"
        >
          <FaGithub size={20} />
        </Link>
      </div>
    </header>
  );
}
