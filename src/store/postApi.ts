import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts, Post, CreatePost, UrlImg } from "../models/postModels";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { actionsPosts } from "../store/slice";
import { UserToken } from "../models/userModels";

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
    try {
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "GET", credentials: "include" },
        api,
        extraOptions
      );
      const data = refreshResult.data as UserToken;
      localStorage.setItem("accessToken", data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } catch (error) {
      api.dispatch(actionsPosts.setIsAuth(false));
      api.dispatch(actionsPosts.userDel());
      localStorage.removeItem("accessToken");
      window.location.replace(`${process.env.REACT_APP_CLIENT_URL}/posts`);
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
    getPost: builder.query<Post, string | undefined>({
      query: (id) => `posts/${id}`,
    }),
    createPost: builder.mutation<Post, CreatePost>({
      query: (post) => ({ url: `posts`, method: "POST", body: post }),
    }),
    deletePost: builder.mutation<Post, string>({
      query: (id) => ({ url: `posts/${id}`, method: "DELETE" }),
    }),
    updatePost: builder.mutation<
      Post,
      { id: string | undefined; post: CreatePost }
    >({
      query: ({ id, post }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: post,
      }),
    }),
    uploadFile: builder.mutation<UrlImg, FormData>({
      query: (data) => ({ url: `uploads`, method: "POST", body: data }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useLazyGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useUploadFileMutation,
  useGetPostQuery,
} = postsApi;
