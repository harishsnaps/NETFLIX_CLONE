import axios from "axios";
import queryString from "query-string";

const baseURL = "https://netflix-clone-api-psi.vercel.app/api/v1/";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

publicClient.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": "application/json",
      ...config.headers
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error.response?.data || {
      message: "Network error or server unavailable",
      status: error.response?.status || 500
    };
  }
);

export default publicClient;
