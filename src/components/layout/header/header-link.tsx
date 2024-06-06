import clsx from "clsx";

import { useRouter } from "next/router";

export default function HeaderLink({
  text,
  href,
  active,
}: {
  text: string;
  href: string;
  active: boolean;
}) {
  const router = useRouter();
  return (
    <button
      className={clsx(
        "hover:text-white hover:bg-blue-500 rounded-full duration-300 px-3 py-0.5 font-bold",
        active && "text-white bg-blue-500"
      )}
      onClick={() => {
        router.push(href);
      }}
    >
      {text}
    </button>
  );
}
