import { ReactNode, useMemo } from "react";
import Header from "./header/header";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { capitalize } from "@/utils/formatter";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  console.log(router.pathname);

  const title = useMemo(() => {
    if (router.pathname !== "/") {
      return router.pathname.split("/")[1];
    } else {
      return "Dellos News";
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>{capitalize(title)}</title>
      </Head>
      <Header />
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-24 pb-24 pt-14 bg-white ${inter.className}`}
      >
        {children}
      </main>
    </>
  );
}
