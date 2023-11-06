import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth, usePost } from "../hooks";
import { createComment, toggleLike } from "../api";
import { toast } from "react-hot-toast";
import Comment from "./Comment";
import { timeDiff } from "../utils";

const Post = ({ post }) => {
  const auth = useAuth();
  const [likes, setLikes] = useState(post?.likes?.length);
  const [comBox, toggleCommentBox] = useState(false);

  const handleLikePost = async () => {
    if (!auth.user) {
      toast.error("You have to login first to interact.");
      return;
    }

    const response = await toggleLike(post._id, "Post");

    if (response.success) {
      if (response.data.deleted) {
        toast.success("Like removed successfully");
        setLikes(likes - 1);
      } else {
        toast.success("Like added successfully");
        setLikes(likes + 1);
      }
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="rounded-md my-[20px] py-3 bg-white hover:cursor-pointer">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center px-3">
            <img className="h-[50px]" src="/man.png" alt="user-pic" />
            <div className="flex flex-col pl-[12px]">
              {/* from link also we can pass the state -- to = {{ pathname: `/users/${post.user._id}`, state: {user: post.user}}}  -- But it wont load when someone access the url without the below link*/}
              <Link
                to={`/users/${post?.user?._id}`}
                className="text-gray-600 hover:underline font-semibold text-base leading-6 capitalize"
              >
                {post?.user?.name}
              </Link>
              <span className="not-italic font-normal text-[14px] leading-3 text-gray-400">
                {timeDiff(post?.createdAt) > 0
                  ? `${timeDiff(post?.createdAt)} hours ago`
                  : `less than a hour ago`}
              </span>
            </div>
          </div>

          {/*
          <button className="mx-4 text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </button>

           <div className="absolute rounded-md bg-gray-200 p-3 text-sm w-1/4 flex justify-center">
            <button className="flex text-sm items-center w-max">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              <span className="mx-2">Delete</span>
            </button>
          </div> */}
        </div>

        <div className="font-normal px-4 mb-3 not-italic text-base text-slate-700 mt-4">
          {post?.content}
        </div>

        <div className="mx-3 mt-5 mb-2 border border-solid border-slate-100 border-x-0 border-b-0" />
        <div className="p-1 mb-2 mx-1 flex px-[10px] font-normal text-base text-gray-600">
          <div className="flex items-center">
            <button
              onClick={(e) => handleLikePost(e)}
              value={post?.likes?.length}
            >
              <img
                className="h-4 cursor-pointer"
                src="/like.svg"
                alt="likes-icon"
              />
            </button>

            <span className="ml-2">
              {likes} {likes > 1 ? "Likes" : "Like"}
            </span>
          </div>

          <div className="ml-4 flex items-center ">
            <img
              onClick={(e) => {
                toggleCommentBox(!comBox);
              }}
              className="h-4 cursor-pointer"
              src="/chat.png"
              alt="comments-icon"
            />
            <span className="ml-2">
              {post?.comments?.length}{" "}
              {post?.comments?.length > 1 ? "Comments" : "Comment"}
            </span>
          </div>
        </div>

        <Comment comments={post?.comments} post={post} />
      </div>
    </div>
  );
};

export default Post;
