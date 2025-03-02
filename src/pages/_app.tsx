import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { client } from "./api/UnsplashApi";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(false)
  return (
    <QueryClientProvider client={client}>
        <Component {...pageProps} />
    </QueryClientProvider>
  )
}
