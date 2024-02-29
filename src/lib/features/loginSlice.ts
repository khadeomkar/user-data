import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  loginData: any;
  isLoggedin: boolean;
}

const initialState: LoginState = {
  loginData: [],
  isLoggedin: false
};

export const loginSlice = createSlice({
  name: "LoginData",
  initialState,
  reducers: {
    addLoginData: (state, action: PayloadAction<any>) => {
      const data = action.payload;
      state.loginData = data;
      state.isLoggedin = true;
    },

    removeLoginData: (state) => {
      state.loginData = [];
      state.isLoggedin = false;
    },
  },
});

export const { addLoginData, removeLoginData } = loginSlice.actions;
export default loginSlice.reducer;
