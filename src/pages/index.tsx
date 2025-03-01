import { Fredoka } from "next/font/google";
import MainPage from "./api/MainPage";

export const fredoka = Fredoka({
  variable: "--fredoka",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
        <MainPage/>
    </>
  );
}
