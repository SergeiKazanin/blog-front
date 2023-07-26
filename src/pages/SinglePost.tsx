import React from "react";
import { useParams } from "react-router";
import { useGetPostQuery } from "../store/postApi";
import { CircularProgress, dividerClasses } from "@mui/material";
import moment from "moment";

export default function SinglePost() {
  const { id } = useParams();
  let page: number = 1;

  const { data: postLoad, isFetching } = useGetPostQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <div className="w-full h-min flex justify-center p-6">
      {isFetching && <CircularProgress />}
      {!isFetching && (
        <div className="flex flex-col gap-2 overflow-hidden rounded-md bg-white w-full h-min">
          <div
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API_URL}${postLoad?.imageUrl})`,
            }}
            className="w-full h-[400px] bg-center  bg-no-repeat bg-cover"
          ></div>
          <div className="p-4 flex flex-col gap-2">
            <div className="">{postLoad?.user.fullName}</div>
            <div className="text-base">
              {moment(postLoad?.createdAt).format(
                "dddd, MMMM Do YYYY, h:mm:ss a"
              )}
            </div>
            <div className="">{postLoad?.title}</div>
            <div className="">{postLoad?.tags.join()}</div>
            <div className="">{postLoad?.text}</div>
          </div>
        </div>
      )}
    </div>
  );
}