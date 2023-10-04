import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserToken, UserLogin, UserRegister } from "../models/userModels";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registration: builder.mutation<UserToken, UserRegister>({
      query: (UserRegister) => ({
        url: `/auth/registration`,
        method: "POST",
        body: UserRegister,
      }),
    }),
    login: builder.mutation<UserToken, UserLogin>({
      query: (userLogin) => ({
        url: `/auth/login`,
        method: "POST",
        body: userLogin,
      }),
    }),
    logout: builder.mutation<string, string>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
    // getUsers: builder.query<string, string>({
    //   query: () => `users`,
    // }),
    activate: builder.query<string, string>({
      query: (link) => `/auth/activate/${link}`,
    }),
    refresh: builder.query<UserToken, string>({
      query: () => `/auth/refresh`,
    }),
  }),
});

export const {
  useLazyActivateQuery,
  useRegistrationMutation,
  //useLazyGetUsersQuery,
  useLazyRefreshQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
