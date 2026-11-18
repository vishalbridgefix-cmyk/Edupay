import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/getProfile");
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.patch("/users/updateProfile", userData);
  return response.data;
};
