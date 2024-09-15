import axios from "axios";
import { apiurl } from "./config";
import { getAccessToken, setAccessToken } from "./tokenManager";

const axiosInstance = axios.create({
  baseURL: apiurl.baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response, config } = error;
    if (response && response.status === 401 && !config.__isRetryRequest) {
      config.__isRetryRequest = true;
      try {
        const refreshResponse = await axiosInstance.put("/authentications");
        const newAccessToken = refreshResponse.data.data.accessToken;
        setAccessToken(newAccessToken);
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
