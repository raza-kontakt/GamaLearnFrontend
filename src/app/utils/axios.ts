import axios from "axios";

const baseURL =
  // import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";
import.meta.env.VITE_API_BASE_URL || "https://gamalearn-backend-998894343964.us-central1.run.app/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
