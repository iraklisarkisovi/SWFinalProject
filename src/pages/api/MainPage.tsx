import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { fetchApi } from './UnsplashApi';

const MainPage = () => {
  const [handler, setHandler] = useState('')
  const [search, setSearch] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(handler)
    }, 500)

    return () => {clearTimeout(delay), setSearch('')};
  }, [handler])

  const { data, isLoading, error } = useQuery({
    queryKey: ["querM", search],
    queryFn: () => fetchApi(search),
  });
  console.log(data)

  if (isLoading) return <h1>Loading...</h1>
  if (error) return  <h1>Error accured while requesting data</h1>

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-start m-10 flex flex-col items-center justify-around gap-3">
          <h1 className="text-3xl">Welcome!</h1>
          <p>
            On this website you can search photos <br /> by your request.
          </p>
          <div className="mt-10">
            <p className="text-sm font-thin ml-5 mb-1">search photos</p>
            <input
              type="text"
              value={handler}
              onChange={(e) => setHandler(e.target.value)}
              className="outline-none border-none transition-all bg-zinc-600 rounded-full p-2 px-5 focus:border-2 focus:outline-zinc-700 order-zinc-600  focus:bg-zinc-800"
            />
          </div>
        </div>
        <main className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 w-full max-w-screen-xl">
          {data?.results?.map((item: any) => (
            <img
              key={item.id}
              className="w-full mb-4 rounded-sm shadow-lg break-inside-avoid"
              src={item.urls.regular}
              alt={item.alt_description || "Unsplash Image"}
              loading='lazy'
            />
          ))}
        </main>
      </div>
    </>
  );
}

export default MainPage
