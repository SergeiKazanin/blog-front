import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts, Post, CreatePost } from "../models/postModels";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<Posts, string>({
      query: () => "posts",
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<Post, CreatePost>({
      query: (post) => ({ url: `posts`, method: "POST", body: post }),
    }),
    deletePost: builder.mutation<Post, string>({
      query: (id) => ({ url: `posts/${id}`, method: "DELETE" }),
    }),
    updatePost: builder.mutation<Post, { id: string; post: CreatePost }>({
      query: ({ id, post }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: post,
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useLazyGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApi;
