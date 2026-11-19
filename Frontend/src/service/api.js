import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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

    switch (status) {
      case 401:
        localStorage.removeItem("token");
        window.location.href = "/";
        break;

      case 403:
        console.error("Access denied. You don't have permission.");
        break;

      case 404:
        console.error("Requested resource not found.");
        break;

      case 500:
        console.error("Internal server error. Please try again later.");
        break;

      default:
        if (!error.response) {
          console.error("Network error. Please check your connection.");
        }
    }
    return Promise.reject(error);
  },
);

export default api;
