import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts } from "../models/models";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<Posts, string>({
      query: () => "posts",
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
