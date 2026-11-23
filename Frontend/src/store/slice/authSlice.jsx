import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    instructors: [],
  },
  reducers: {},
});

export default slice.reducer;
