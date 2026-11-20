import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else if (status === 403) {
      console.error("Access denied. You don't have permission.");
    } else if (status === 404) {
      console.error("Requested resource not found.");
    } else if (status === 500) {
      console.error("Internal server error. Please try again later.");
    } else if (!error.response) {
      console.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  },
);

export default api;
