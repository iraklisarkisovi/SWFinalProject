import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchApi } from "./UnsplashApi";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { Android12Switch } from "./Switch";
import { fredoka } from "..";

const MainPage = () => {
  const [handler, setHandler] = useState("");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stored");
      if (stored) setHandler(stored);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(handler);
      if (typeof window !== "undefined") {
        localStorage.setItem("stored", handler);
      }
    }, 1000);

    return () => clearTimeout(delay);
  }, [handler]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    
  } = useInfiniteQuery({
    queryKey: ["querM", search],
    queryFn: ({ pageParam = 1 }) => fetchApi(search, pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage?.nextPage || pages.length + 1,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

useEffect(() => {
  const handleScroll = () => {
    const totalImages =
      data?.pages?.reduce((acc, page) => acc + page.results.length, 0) || 0;

    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200 &&
      hasNextPage &&
      !isFetchingNextPage &&
      totalImages > 10
    ) {
      fetchNextPage();
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [fetchNextPage, hasNextPage, isFetchingNextPage, data]);


  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  if (error) return <h1>Error occurred while requesting data</h1>;

  return (
    <>
      <div
        className={`w-screen h-full flex items-center justify-center min-h-screen ${
          theme ? "bg-white text-black" : "bg-black text-white"
        }`}
        style={{ fontFamily: fredoka.style.fontFamily }}
      >
        <div
          className={`flex mt-10 flex-col w-max ${
            theme ? "bg-zinc-200 text-black" : "bg-zinc-800 text-white"
          } py-3 px-10 rounded-2xl items-center justify-center min-h-screen`}
        >
          <div className="text-start m-10 flex flex-col items-center justify-around gap-3">
            <h1 className="text-3xl">Welcome! 👋</h1>
            <p>On this website, you can search for photos by your request.</p>
            <div
              className={`relative top-0 float-right max-sm:gap-0 max-sm:p-1 p-2 flex flex-row gap-2 rounded-lg ${
                theme ? "bg-zinc-300" : "bg-zinc-600"
              } right-0`}
            >
              <Android12Switch onClick={() => setTheme((prev) => !prev)} />
              <h1 className="mt-2">
                <strong className="max-sm:hidden font-medium">Theme:</strong>{" "}
                {theme ? (
                  <>
                    <strong className="max-sm:hidden font-thin">light</strong>{" "}
                    ☀️
                  </>
                ) : (
                  <>
                    <strong className="max-sm:hidden font-thin">dark</strong> 🌑
                  </>
                )}
              </h1>
            </div>
            <div className="mt-10">
              <p className="text-sm font-thin ml-5 mb-1">Search photos</p>
              <input
                type="text"
                value={handler}
                onChange={(e) => {
                  e.preventDefault();
                  setHandler(e.target.value);
                }}
                className={`outline-none text-white border-none transition-all ${
                  theme
                    ? "bg-zinc-300 focus:bg-zinc-400 text-black"
                    : "bg-zinc-600"
                }  rounded-full p-2 px-5 focus:border-2 focus:outline-zinc-700 focus:bg-zinc-800`}
              />
              <button className="ml-3" onClick={() => setHandler('')}>
                Clear
              </button>
            </div>
          </div>
          <main className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full max-w-screen-xl">
            {data?.pages &&
            data.pages.length > 0 &&
            data.pages.some((page) => page.results.length > 0) ? (
              data.pages.flatMap((page) =>
                page.results.map((item: any) => (
                  <Link href={`/${item.id}`} key={item.id}>
                    <img
                      className="w-full mb-4 rounded-sm shadow-lg break-inside-avoid"
                      src={item.urls.regular}
                      alt={item.alt_description || "Unsplash Image"}
                      loading="lazy"
                    />
                  </Link>
                ))
              )
            ) : (
              <h1 className="max-sm:ml-36">No images found</h1>
            )}
          </main>

          {isFetchingNextPage && <CircularProgress />}
        </div>
      </div>
    </>
  );
};

export default MainPage;
