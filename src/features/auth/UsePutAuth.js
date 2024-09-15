import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";

export const usePutAuth = () => {
  const { login } = useAuth();
  axiosInstance.defaults.withCredentials = true;
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.put("/authentications");
        console.log(response.data);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || error.message || "An error occurred"
        );
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
    onSuccess: (data) => {
      login(data.data.accessToken);
    },
  });
};

// import axios from "axios";
// import { axiosInstance } from "@/lib/axios";

// const usePutAuth = axiosInstance;

// usePutAuth.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// usePutAuth.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = document.cookie.replace(
//           /(?:(?:^|.*;\s*)refreshToken\s*\=\s*([^;]*).*$)|^.*$/,
//           "$1"
//         );
//         const response = await axios.put("/authentications", { refreshToken });
//         const { accessToken } = response.data;
//         localStorage.setItem("accessToken", accessToken);
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return axiosWithAuth(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default usePutAuth;

// // import { useRouter } from 'next/router';
// // import { useState, useEffect } from 'react';
// // import { axiosInstance } from '@/lib/axios';

// // export const useAxios = () => {
// //   const router = useRouter();
// //   const [accessToken, setAccessToken] = useState(null);

// //   useEffect(() => {
// //     axiosInstance.interceptors.request.use(
// //       (config) => {
// //         if (accessToken) {
// //           config.headers['Authorization'] = `Bearer ${accessToken}`;
// //         }
// //         return config;
// //       },
// //       (error) => Promise.reject(error)
// //     );

// //     axiosInstance.interceptors.response.use(
// //       (response) => response,
// //       async (error) => {
// //         const originalRequest = error.config;

// //         if (error.response.status === 401 && !originalRequest._retry) {
// //           originalRequest._retry = true;

// //           try {
// //             const refreshResponse = await axiosInstance.put('/refresh-token', {}, { withCredentials: true });
// //             const newAccessToken = refreshResponse.data.accessToken;
// //             setAccessToken(newAccessToken);

// //             axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

// //             return axiosInstance(originalRequest);
// //           } catch (refreshError) {
// //             router.push('/login');
// //             return Promise.reject(refreshError);
// //           }
// //         }

// //         return Promise.reject(error);
// //       }
// //     );

// //     return [accessToken, setAccessToken];
// //   }, [accessToken, router]);

// //   return [accessToken, setAccessToken];
// // };
