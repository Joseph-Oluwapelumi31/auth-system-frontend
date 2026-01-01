import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL:  import.meta.env.VITE_API_URL || "http://localhost:5000/api", // fallback to local if env not set
  withCredentials: true, // include cookies if needed
});

export default API;
