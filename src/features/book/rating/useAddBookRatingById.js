import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useAddBookRatingById = () => {
  return useMutation({
    mutationFn: async ({ bookId, rating }) => {
      try {
        const response = await axiosInstance.post(
          `/books/${bookId}/rating`,
          {
            rating,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onError: (error) => {
      console.log(error);
      throw new Error(error.message);
    },
  });
};
