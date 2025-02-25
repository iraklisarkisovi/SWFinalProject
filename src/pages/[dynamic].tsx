import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  console.log(router.query.imag);

  const { data, isLoading, error } = useQuery({
    queryKey: ["image", dynamic],
    queryFn: () => fetchImageById(dynamic as string),
    enabled: !!dynamic,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading image</h1>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-4">
      <div>
        <img
          src={data.urls.regular}
          alt={data.alt_description || "Unsplash Image"}
          className="w-full max-w-lg rounded-md shadow-md"
        />
        <h1 className="text-xl font-bold mt-4">
          {data.description || "Image Details"}
        </h1>
        <p className="text-sm text-gray-500">By {data.user.name}</p>
        <p className="text-sm text-gray-500">{data.description ? `desciption: ${data.description}` : 'no description'}</p>
      </div>
    </div>
  );
};

export default Dpage;
