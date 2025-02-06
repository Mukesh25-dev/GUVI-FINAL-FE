import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => null,
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setUser, clearUser, setEmail } = userSlice.actions;

export const selectUser = (state) => state.user;

export const selectEmail = (state) => state.user?.email;

export default userSlice.reducer;
