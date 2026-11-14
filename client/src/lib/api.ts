import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API + "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor — redirect to login on 401
// Guards against SSR where window is not available
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/login")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
