import { configureStore } from "@reduxjs/toolkit";
import { sliceReducer } from "./slice";
import { postsApi } from "./postApi";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    diction: sliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
