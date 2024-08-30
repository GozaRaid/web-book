import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const booksResponse = await axiosInstance.get("/books");
      return booksResponse.data.data.books;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
