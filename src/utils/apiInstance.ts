import axios from "axios";
import { apiToken, baseUrl } from "./constants";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: { common: { Authorization: apiToken } },
});

export default axiosInstance;
