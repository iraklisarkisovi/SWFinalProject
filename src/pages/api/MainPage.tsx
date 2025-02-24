import { useQuery } from '@tanstack/react-query';
import { Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import React from 'react'
import { fetchApi } from './UnsplashApi';

const MainPage = () => {

  const {data, isLoading, error} = useQuery({
    queryKey: ["querM"],
    queryFn: fetchApi,
  });
 

  if (isLoading) return <h1>Loading...</h1>
  if (error) return  <h1>Error accured while requesting data</h1>

  return (
    <>
      <div>
        <div
          className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-10 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data?.results?.map((item: any) => (
              <img
                key={item.id}
                className="w-full h-auto shadow-lg"
                src={item.urls.regular}
                alt={item.alt_description || "Unsplash Image"}
              />
            ))}
          </main>
        </div>
      </div>
    </>
  );
}

export default MainPage
