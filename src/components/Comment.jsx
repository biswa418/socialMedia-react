import {  useState } from "react";
import { useAuth, usePost } from "../hooks";
import toast from "react-hot-toast";
import { createComment } from "../api";
import SingleCom from "./SingleCom";

const Comment = ({comments, post}) => {
  const [comm, setComm] = useState(comments);
  const auth = useAuth();
  const posts = usePost();
  const [comment, setComment] = useState("");
  const [creatingComm, setCreatingComm] = useState(false);

  const handleComment = async (e) => {
    if (!auth.user) {
      toast.error("You have to login first to interact.");
      return;
    }

    if (e.keyCode === 13) {
      setCreatingComm(true);
      const response = await createComment(comment, post._id);

      if (response.success) {
        posts.addComment(response.data.comment, post._id);
        setComm([...comm, response.data.comment]);
        setComment("");
        toast.success("Comment created successfully.");
      } else {
        toast.error(response.message);
      }

      setCreatingComm(false);
    }
  };

  return (
    <div>
      {auth.user && (
        <div className="mt-2 flex items-center md:p-3 transition-all ease-in-out duration-300">
          <img className="h-8 mr-2" src="../man.png" alt="userDP" />
          <input
            value={comment}
            onKeyDown={handleComment}
            disabled={creatingComm}
            onChange={(e) => setComment(e.target.value)}
            className=" bg-gray-100 rounded-md text-xs h-9 my-0 mx-auto w-full md:text-sm box-border p-2 px-3 focus:outline-none focus-visible:outline-0"
            placeholder="Write your comment"
          />
        </div>
      )}

      {comm?.map((comment) => {
        return (
          <SingleCom key={`comment-${comment._id}`} comment={comment}/>
        );
      })}
    </div>
  );
};

export default Comment;
