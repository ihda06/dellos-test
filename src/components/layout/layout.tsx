import { ReactNode, useMemo } from "react";
import Header from "./header/header";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const title = useMemo(() => {
    if (router.pathname !== "/") {
      return router.pathname.split("/")[1];
    } else {
      return "Dellos News";
    }
  }, [router.pathname]);

  return (
    <>
      <Header />
      <ToastContainer />
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-24 pb-24 pt-14 bg-white ${inter.className}`}
      >
        {children}
      </main>
    </>
  );
}
