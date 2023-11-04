import { useState } from "react";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FriendList = (props) => {
  const auth = useAuth();
  const { friendships = [] } = auth.user;
  const { mobile } = props;
  const [opened, setOpen] = useState(!mobile);

  const container = {
    hidden: { height: "2.5rem" },
    show: {
      height: "15rem",
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial={mobile ? "hidden" : "show"}
        animate={opened ? "show" : "hidden"}
        transition={{ type: "tween" }}
        className="w-full min-w-max max-h-80 max-w-[298px] overflow-hidden overflow-y-scroll scrollbar-none rounded-md mt-[20px] bg-white p-2 md:p-4 me-4"
      >
        <div className="flex justify-between">
          <div className="text-sm uppercase text-slate-400 tracking-widest">
            Friends
          </div>

          {mobile && (
            <button
              onClick={() => {
                setOpen(!opened);
              }}
            >
              {opened && (
                <div className="text-xs text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                </div>
              )}

              {!opened && (
                <div className="text-sm text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              )}
            </button>
          )}
        </div>

        {friendships && friendships.length === 0 && (
          <div>No friends found!</div>
        )}

        {friendships &&
          friendships.map((friend) => (
            <div
              className="mt-2 hover:bg-slate-200 rounded md:p-1"
              key={`friend-${friend._id}`}
            >
              <Link
                className="flex items-center justify-between"
                to={`/users/${friend.to_user._id}`}
              >
                <div className="flex items-center">
                  <div className="md:w-9 w-5">
                    <img src="../man.png" alt="friend-dp" />
                  </div>

                  <div className="text-slate-500 capitalize text-xs md:text-sm md:ms-2">
                    {friend.to_user?.name}
                  </div>
                </div>

                <div className="text-slate-500">
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
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

export default FriendList;
