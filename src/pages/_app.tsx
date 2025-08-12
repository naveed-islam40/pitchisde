import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import { Oswald, Noticia_Text, Lato } from "next/font/google";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const noticiaText = Noticia_Text({
  variable: "--font-noticia-text",
  subsets: ["latin"],
  style: "italic",
  weight: ["400", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

import "@/styles/globals.css";
import "react-day-picker/dist/style.css";
import "react-tooltip/dist/react-tooltip.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@splidejs/react-splide/css";
import "react-day-picker/dist/style.css";
import clsx from "clsx";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          favourites: { matches: [], leagues: [], teams: [] },
          notify: { matches: [] },
        })
      );
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main
        id="main"
        className={clsx(
          lato.variable,
          noticiaText.variable,
          oswald.variable,
          "font-sans"
        )}
      >
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
      <ProgressBar
        height="3px"
        color="#00985F"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </QueryClientProvider>
  );
}
