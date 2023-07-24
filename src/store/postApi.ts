import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts, Post, CreatePost } from "../models/postModels";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { actionsPosts } from "../store/slice";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      //api.dispatch(actionsPosts.userAdd(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      //api.dispatch(loggedOut());
    }
  }
  return result;
};

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryWithReauth,
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
