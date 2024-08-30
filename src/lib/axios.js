import axios from "axios";
import { apiurl } from "./config";

export const axiosInstance = axios.create({
  baseURL: apiurl.baseUrl,
});
