import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor (Optional: Add authentication token)
api.interceptors.request.use(
  (config) => {
    // You can add token here if needed
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Optional: Handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;