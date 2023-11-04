import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Suggest = (props) => {
  const auth = useAuth();
  const { friendships = [] } = auth.user;
  const { posts } = props;
  const [Users, setUsers] = useState([]);

  const container = {
    hidden: { height: "2.5rem" },
    show: {
      height: "16rem",
    },
  };

  useEffect(() => {
    let user = [];
    let uniqueSet = [];

    posts.map((post) => {
      const found = uniqueSet.find((val) => val == post?.user?._id);
      const alrFriend = friendships.find(
        (val) => val.to_user._id == post?.user?._id
      );

      if (!found && !alrFriend) {
        user = [...user, post.user];
        uniqueSet = [...uniqueSet, post?.user?._id];
      }
    });

    //unique user
    setUsers(user);
  }, [posts]);

  return (
    <>
      <motion.div
        variants={container}
        initial={"show"}
        transition={{ type: "tween" }}
        className="w-full min-w-max max-h-96 max-w-[298px] overflow-hidden overflow-y-scroll scrollbar-none rounded-md mt-[20px] bg-white p-2 md:p-4 me-4"
      >
        <div className="flex justify-between">
          <div className="text-sm uppercase text-slate-400 tracking-widest">
            Suggestions
          </div>
        </div>

        {Users && Users.length === 0 && <div>No suggestions found!</div>}

        {Users &&
          Users.map((user) => (
            <div
              className="mt-2 hover:bg-slate-200 rounded md:p-1"
              key={`user-${user?._id}`}
            >
              <Link
                className="flex items-center justify-between"
                to={`/users/${user?._id}`}
              >
                <div className="flex items-center">
                  <div className="md:w-9 w-5">
                    <img src="../man.png" alt="user-dp" />
                  </div>

                  <div className="text-slate-500 capitalize text-xs md:text-sm md:ms-2">
                    {user?.name}
                  </div>
                </div>

                <div className="text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
      </motion.div>
    </>
  );
};

export default Suggest;
