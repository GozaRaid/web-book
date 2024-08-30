import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchHomeBook = () => {
  return useQuery({
    queryKey: ["homebooks"],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get("/books/home");
      return booksResponse.data.data;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
