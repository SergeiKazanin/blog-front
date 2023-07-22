import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserToken, UserLogin, UserRegister } from "../models/userModels";
import { User } from "../models/postModels";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
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
    logout: builder.mutation<UserToken, UserLogin>({
      query: () => ({ url: `/auth/logout`, method: "POST" }),
    }),
    getUsers: builder.query<User, string>({
      query: () => `users`,
    }),
    activate: builder.query<string, string>({
      query: (link) => `/auth/activate/${link}`,
    }),
    refresh: builder.query<undefined, undefined>({
      query: () => `/auth/refresh`,
    }),
  }),
});

export const {
  useLazyActivateQuery,
  useLazyGetUsersQuery,
  useLazyRefreshQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApi;
