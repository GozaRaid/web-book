import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const usePostBook = () => {
  return useMutation({
    mutationFn: async ({
      title,
      published,
      author,
      genre,
      format,
      isbn,
      description,
      image,
    }) => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axiosInstance.post(
          "/books",
          {
            title,
            published,
            author,
            genre,
            format,
            isbn,
            description,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const bookId = response.data.data.bookId;

        if (image && bookId) {
          const formData = new FormData();
          formData.append("cover", image);

          await axiosInstance.post(`/books/${bookId}/covers`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onError: (error) => {
      // throw new Error(error.message);
      console.error(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
