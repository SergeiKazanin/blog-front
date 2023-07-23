import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserToken } from "../models/userModels";

const slice = createSlice({
  name: "posts",
  initialState: { user: {} as UserToken, isAuth: false },
  reducers: {
    userAdd(state, action: PayloadAction<UserToken>) {
      state.user = action.payload;
    },
    userDel(state) {},
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const actionsPosts = slice.actions;
export const sliceReducer = slice.reducer;
