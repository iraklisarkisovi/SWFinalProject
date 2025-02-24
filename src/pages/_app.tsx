import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { client } from "./api/UnsplashApi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
       <Component {...pageProps} />
    </QueryClientProvider>
  )
}
