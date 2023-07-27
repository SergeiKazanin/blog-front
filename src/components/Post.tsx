import React, { FC } from "react";
import { Post } from "../models/postModels";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDeletePostMutation } from "../store/postApi";
import { IconButton } from "@mui/material";
import { useAppSelector } from "../hooks/redux";

interface PostProps {
  post: Post;
}

export const PostRender: FC<PostProps> = ({ post }) => {
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.posts);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await deletePost(post._id);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="text-lg mr-4">{post.viewsCount}</div>
            {user?.user?.id === post?.user?._id ? (
              <>
                <Link to={`/post/${post._id}/edit`}>
                  <IconButton>
                    <EditOutlinedIcon className="hover:text-emerald-600" />
                  </IconButton>
                </Link>
                <IconButton onClick={(e) => handleDelete(e)}>
                  <DeleteOutlinedIcon className="hover:text-red-600" />
                </IconButton>{" "}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
