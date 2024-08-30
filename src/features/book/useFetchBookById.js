import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchBookById = (id) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const bookResponse = await axiosInstance.get(`/books/${id}`);
      return bookResponse.data.data.book;
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    enabled: !!id,
  });
};
