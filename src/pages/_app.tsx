import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { hasCookie, setCookie } from "cookies-next";
import type { AppProps } from "next/app";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!hasCookie("my_coin")) {
      setCookie("my_coin", "100000");
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
