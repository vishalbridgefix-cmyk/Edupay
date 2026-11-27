import { createSlice } from "@reduxjs/toolkit";
import api from "../../service/api";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  success: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },

    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.error = null;
      state.success = true;
    },

    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    resetAuthStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  authRequest,
  authSuccess,
  authFailure,
  resetAuthStatus,
  clearAuth,
} = slice.actions;

// Register
export const registerUser = (registerData) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const response = await api.post("/auth/register", registerData);

    dispatch(authSuccess({ user: response.data.user }));

    return response.data;
  } catch (error) {
    dispatch(
      authFailure(error.response?.data?.message || "Registration failed."),
    );
    throw error;
  }
};

// Login
export const loginUser = (loginData) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const response = await api.post("/auth/login", loginData);

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    dispatch(authSuccess({ user, token }));

    return response.data;
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Login failed."));
    throw error;
  }
};
// Logout
export const logoutUser = () => async (dispatch) => {
  dispatch(authRequest());

  try {
    await api.post("/auth/logout");

    localStorage.removeItem("token");

    dispatch(clearAuth());
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || "Logout failed."));
    throw error;
  }
};

export default slice.reducer;
