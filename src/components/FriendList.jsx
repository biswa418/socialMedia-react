import React, { useState } from "react";
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
      height: "100%",
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial={mobile ? "hidden" : "show"}
        animate={opened ? "show" : "hidden"}
        transition={{ type: "tween" }}
        className="w-full md:w-2/12 min-w-max border h-max max-h-80 overflow-hidden overflow-y-scroll border-teal-500 box-border rounded-md mt-[20px] bg-slate-100 p-2 md:p-4 me-4"
      >
        <div className="flex justify-between">
          <div className="text-sm md:text-lg">Friends</div>
          <button
            onClick={() => {
              setOpen(!opened);
            }}
          >
            {opened && (
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
            )}

            {!opened && (
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
            )}
          </button>
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
                className="flex items-center"
                to={`/users/${friend.to_user._id}`}
              >
                <div className="md:w-9 w-5">
                  <img src="../man.png" alt="friend-dp" />
                </div>

                <div className="text-slate-500 text-xs md:text-sm md:ms-2">
                  {friend.to_user.email}
                </div>
              </Link>
            </div>
          ))}
      </motion.div>
    </>
  );
};

export default FriendList;
