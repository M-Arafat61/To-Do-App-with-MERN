import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://task-management-server-coral-chi.vercel.app",
  // baseURL: "http://localhost:5000",
});
