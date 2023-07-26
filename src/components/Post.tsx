import React, { FC } from "react";
import { Post } from "../models/postModels";
import moment from "moment";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

interface PostProps {
  post: Post;
}

export const PostRender: FC<PostProps> = ({ post }) => {
  return (
    <Link to={`/post/${post._id}`}>
      <div className="flex gap-4 w-full h-32 rounded-md shadow-md p-2 bg-white hover:border-2 hover:border-purple-500">
        <div
          style={{
            backgroundImage: `url(${process.env.REACT_APP_API_URL}${post.imageUrl})`,
          }}
          className="w-20 h-28 bg-center  bg-no-repeat bg-contain rounded-md"
        ></div>
        <div className="flex flex-col">
          <div>{post.user.fullName}</div>
          <div className="text-sm ">
            {moment(post.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </div>
          <div>{post.title}</div>
          <div className="flex gap-2 items-center">
            <RemoveRedEyeOutlinedIcon />
            <div className="text-lg">{post.viewsCount}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
