import axios from "axios";
import queryString from "query-string";

const baseURL = "/api/v1";
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  }
});

privateClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("actkn");
  
    if (token) {
      config.headers = {
        ...config.headers,
        "Authorization": `Bearer ${token}`
      };
    }

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

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("actkn");
      console.warn("Token expired or invalid. Cleared from storage.");
    }
    
    throw error.response?.data || {
      message: "Network error or server unavailable",
      status: error.response?.status || 500
    };
  }
);

export default privateClient;