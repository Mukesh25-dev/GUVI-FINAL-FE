import { createSlice } from "@reduxjs/toolkit";

export const registerverificationSlice = createSlice({
  name: "registerverification",
  initialState: {
    email: "",
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = registerverificationSlice.actions;

export const selectEmail = (state) => state.registerverification.email;

export default registerverificationSlice.reducer;
