import React, { useEffect, useState } from "react";
import { useGetAllPostsQuery } from "../store/postApi";
import { CircularProgress, Pagination } from "@mui/material";
import PostRender from "../components/Post";
import { useNavigate, useParams } from "react-router-dom";

export default function Posts() {
  const {
    data: posts,
    isFetching,
    isError,
  } = useGetAllPostsQuery("", { refetchOnMountOrArgChange: true });
  const { numberPage } = useParams();
  let page: number = 1;
  if (numberPage) {
    page = parseInt(numberPage);
  }
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState(0);
  const totalElementOnPage = 8;

  useEffect(() => {
    if (posts?.length) {
      const x = posts.length / totalElementOnPage;
      x - Math.floor(x) > 0
        ? setTotalPage(Math.floor(x) + 1)
        : setTotalPage(Math.floor(x));
    }
    return () => {};
  }, [posts]);

  return (
    <div className="p-6 w-full flex flex-col items-center">
      <div className="flex-1">
        {isFetching && <CircularProgress />}
        {!isFetching && (
          <ul>
            {posts
              ?.slice(
                page * totalElementOnPage - totalElementOnPage,
                page * totalElementOnPage
              )
              .map((post) => (
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
            fontSize: "1.2rem",
          },
        }}
        count={totalPage}
        page={page}
        onChange={(_, numPage) => navigate(`/posts/${numPage}`)}
        className="mt-3"
      />
    </div>
  );
}
