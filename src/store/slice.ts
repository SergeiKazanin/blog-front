import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserLogin } from "../models/postModels";

const slice = createSlice({
  name: "posts",
  initialState: { user: {} as UserLogin },
  reducers: {
    userAdd(state, action: PayloadAction<UserLogin>) {
      state.user = action.payload;
    },
    userDel(state) {
      state.user = {
        accessToken: "",
        refreshToken: "",
        user: { email: "", id: "", isActivated: false },
      };
    },
  },
});

export const actionsPosts = slice.actions;
export const sliceReducer = slice.reducer;
