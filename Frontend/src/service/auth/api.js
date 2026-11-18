import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized. Please login.");
    } else if (status === 403) {
      console.log("Forbidden. Access denied.");
    } else if (status >= 500) {
      console.log("Internal server error.");
    }

    return Promise.reject(error);
  },
);

export default api;
