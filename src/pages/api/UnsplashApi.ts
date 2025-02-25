import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const client = new QueryClient();

const apikey = process.env.NEXT_PUBLIC_API_KEY;

export const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
});

export const fetchApi = async (search: string) => {
  try {
    const res = await instance.get(`/search/photos`, {
      params: {
        query: search || "random",
        client_id: apikey,
        per_page: 20,
      },
    });
    
    return res.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
