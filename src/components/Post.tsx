import React from "react";
import { Post } from "../models/postModels";

export default function PostRender({ post }: { post: Post }) {
  return <div>{post.title}</div>;
}
