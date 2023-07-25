import React from "react";
import { useGetAllPostsQuery } from "../store/postApi";
import { CircularProgress, Pagination } from "@mui/material";
import PostRender from "../components/Post";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const {
    data: posts,
    isFetching,
    isError,
  } = useGetAllPostsQuery("", { refetchOnMountOrArgChange: true });
  const navigate = useNavigate();
  return (
    <div className="p-6 w-full flex flex-col items-center">
      <div className="flex-1">
        {isFetching && <CircularProgress />}
        {!isFetching && (
          <ul>
            {posts?.map((post) => (
              <li key={post._id}>
                <PostRender post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <Pagination
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#000",
            fontSize: "1.5rem",
          },
        }}
        count={2}
        page={1}
        onChange={(_, numPage) => navigate(`/category/${2}/${numPage}`)}
        className="mt-3"
      />
    </div>
  );
}
