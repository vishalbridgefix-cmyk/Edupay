import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/login", userData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/me");
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.patch("/me", userData);
  return response.data;
};
