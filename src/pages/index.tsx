import { Fredoka } from "next/font/google";
import MainPage from "./api/MainPage";
import Header from "./api/Header";
import { ThemeProvider } from "./api/ThemeProvider";

export const fredoka = Fredoka({
  variable: "--fredoka",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <MainPage />
      </ThemeProvider>
    </>
  );
}
