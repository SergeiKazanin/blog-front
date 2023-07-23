import { configureStore } from "@reduxjs/toolkit";
import { sliceReducer } from "./slice";
import { postsApi } from "./postApi";
import { userApi } from "./userApi";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    posts: sliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
