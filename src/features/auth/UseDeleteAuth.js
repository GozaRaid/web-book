import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAuth = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.delete("/authentications");
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
  });
};
