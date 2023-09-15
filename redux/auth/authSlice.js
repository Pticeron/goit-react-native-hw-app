import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut } from "../auth/authOperations";

const initialState = {
  user: { nickName: null, email: null, password: null },
  uid: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.uid = action.payload.uid;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { nickName: null, email: null, password: null };
        state.uid = null;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user.nickName = action.payload.displayName;
        state.user.email = action.payload.email;
        state.uid = action.payload.uid;
        state.isLoggedIn = true;
      });
  },
});

export const authReducer = authSlice.reducer;
