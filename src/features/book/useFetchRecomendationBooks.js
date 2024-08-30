import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchRecomendationBooks = () => {
  return useQuery({
    queryKey: ["upcomingbooks"],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get("/books/recomendation");
      return booksResponse.data.data.books;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
