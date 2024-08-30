import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useAddBookReviewById = () => {
  return useMutation({
    mutationFn: async ({ bookId, review }) => {
      try {
        const response = await axiosInstance.post(
          `/books/${bookId}/review`,
          { review },
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
      console.error("Error adding review:", error);
      throw error;
    },
  });
};
