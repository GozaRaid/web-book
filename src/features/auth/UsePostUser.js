import usePutAuth from "./UsePutAuth";
import { useMutation } from "@tanstack/react-query";
import { usePostAuth } from "./UsePostAuth";

export const usePostUser = () => {
  const postAuthMutation = usePostAuth();

  return useMutation({
    mutationFn: async ({ username, email, password }) => {
      try {
        const response = await usePutAuth.post("/users", {
          username,
          email,
          password,
        });
        return response.data;
      } catch (error) {
        console.error(
          "User creation error:",
          error.response?.data?.message || error.message
        );
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error.message);
    },
    onSuccess: async (data, variables) => {
      try {
        await postAuthMutation.mutateAsync({
          username: variables.username,
          password: variables.password,
        });
      } catch (error) {
        console.error("Authentication error:", error.message);
      }
    },
  });
};

// import { useMutation } from "@tanstack/react-query";
// import { usePostAuth } from "./UsePostAuth";

// export const usePostUser = () => {
//   const postAuthMutation = usePostAuth();

//   return useMutation({
//     mutationFn: async ({ username, email, password }) => {
//       try {
//         const response = await axiosInstance.post("/users", {
//           username,
//           email,
//           password,
//         });
//         return response.data;
//       } catch (error) {
//         console.error("User creation error:", error.response?.data?.message || error.message);
//         throw new Error(error.response?.data?.message || error.message || "An error occurred");
//       }
//     },
//     onError: (error) => {
//       console.error("Mutation error:", error.message);
//     },
//     onSuccess: async (data, variables) => {
//       try {
//         await postAuthMutation.mutateAsync({
//           username: variables.username,
//           password: variables.password,
//         });
//       } catch (error) {
//         console.error("Authentication error:", error.message);
//       }
//     },
//   });
// };
