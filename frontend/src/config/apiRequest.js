import axios from "axios";
import DeletedParkingSlots from "../pages/AddSlotForm";


const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const DeleteSlot = async (slotId) => {
  try {
    const response = await axios.delete(`/slots/${slotId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting slot:", error);
    throw error;
  }
};

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