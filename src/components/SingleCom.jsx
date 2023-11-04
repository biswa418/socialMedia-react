import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks";
import { toggleLike } from "../api";
import { timeDiff } from "../utils";

const SingleCom = ({ comment }) => {
  const auth = useAuth();
  const [likes, setLikes] = useState(comment?.likes?.length);

  const handleLikeComment = async (id, e) => {
    if (!auth.user) {
      toast.error("You have to login first to interact.");
      return;
    }

    const response = await toggleLike(id, "Comment");

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
    <div key={`comment-${comment?._id}`} className="relative px-3 py-1">
      <div className="rounded-md pt-3 flex">
        <div className="absolute">
          <img className="h-8 mr-2" src="../man.png" alt="userDP" />
        </div>

        <div className="pl-7 ml-4 border border-y-0 border-r-0">
          <span className="font-semibold text-sm capitalize">
            {comment?.user?.name}
          </span>
          <span className="md:ml-2 text-xs text-gray-400">
            {" "}
            {timeDiff(comment?.createdAt) > 0
              ? `${timeDiff(comment?.createdAt)}h`
              : `less than a hour ago`}
          </span>

          <div className="mt-1 text-sm">{comment?.content}</div>

          <div className="p-1 flex mt-2 font-normal text-sm text-gray-600">
            <div className="flex items-center">
              <button
                onClick={(e) => handleLikeComment(comment?._id, e)}
                value={likes}
              >
                <img
                  className="h-4 cursor-pointer"
                  src="/like.svg"
                  alt="likes-icon"
                />
              </button>

              <span className="ml-2">{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCom;
