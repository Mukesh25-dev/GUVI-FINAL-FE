import { configureStore } from "@reduxjs/toolkit";
import registerreducer from "../features/auth/registerSlice";
import loginreducer from "../features/auth/loginSlice";
import userreducer from "../features/auth/userSlice";
import { registerverificationSlice } from "../features/auth/registerverificationSlice";
const store = configureStore({
  reducer: {
    register: registerreducer,
    registerverification: registerverificationSlice.reducer,
    login: loginreducer,
    user: userreducer,
  },
});

export default store;
