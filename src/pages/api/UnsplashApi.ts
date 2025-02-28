import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const client = new QueryClient();

const apikey = process.env.NEXT_PUBLIC_API_KEY;

export const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
});

export const fetchApi = async (search: string, page: number) => {
  try {
    const res = await instance.get(`/search/photos`, {
      params: {
        query: search || "random",
        client_id: apikey,
        per_page: 20,
        page, 
        order_by: "latest",
      },
    });

    const shuffledResults = res.data.results.sort(() => Math.random() - 0.5);

    return {
      results: shuffledResults,  
      nextPage: res.data.total_pages > page ? page + 1 : null,  
    };
    
  } catch (error) {
    console.error("Error fetching images:", error);
    return { results: [], nextPage: null };
  }
};


 