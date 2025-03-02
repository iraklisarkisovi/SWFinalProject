import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { fredoka } from ".";
import { CircularProgress } from "@mui/material";

const fetchImageById = async (id: string) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
    params: { client_id: apikey },
  });
  return res.data;
};

const Dpage = () => {
  const router = useRouter();
  const { dynamic } = router.query;

  const { data, isLoading, error } = useQuery({
    queryKey: ["image", dynamic],
    queryFn: () => fetchImageById(dynamic as string),
    staleTime: 1000 * 60 * 10,
    cacheTime: 1000 * 60 * 20,
    enabled: !!dynamic,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  if (error) return <h1>Error loading image</h1>;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-5 p-4"
      style={{ fontFamily: fredoka.style.fontFamily }}
    >
      <div className="flex flex-col gap-3">
        <Link href={"/"}>
          <div className="p-4 bg-zinc-600 absolute top-0 left-0 rounded-br-3xl transition-all ease-in-out hover:rounded-br-lg">
            ↖️ Back
          </div>
        </Link>
        <Link href={data.urls.regular}>
        <img
          src={data.urls.regular}
          alt={data.alt_description || "Unsplash Image"}
          className="w-full max-w-lg rounded-md shadow-md"
        />
        </Link>
        <h1 className="text-xl font-bold mt-4 max-w-xl break-words">
          {data.description || "Image Details"}
        </h1>
        <p className="text-xs max-w-xl break-words">
          <strong className="text-yellow-300">By:</strong> {data.user.name}
        </p>
        <p className="text-sm text-gray-500 max-w-xl break-words">
          {data.description
            ? `description: ${data.description}`
            : "no description"}
        </p>
      </div>
    </div>
  );
};

export default Dpage;
