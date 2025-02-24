import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import MainPage from "./api/MainPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./api/UnsplashApi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
        <MainPage/>
    </>
  );
}
