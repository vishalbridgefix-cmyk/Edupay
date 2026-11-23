import { combineReducers, configureStore } from "@reduxjs/toolkit";

import instructor from "./slice/instructorSlice";
import auth from "./slice/authSlice";

const rootReducer = combineReducers({ instructor, auth });
const store = configureStore({
  reducer: rootReducer,
});

export default store;
