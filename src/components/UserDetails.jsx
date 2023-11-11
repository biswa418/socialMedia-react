import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { useEffect } from "react";

const UserDetails = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="p-3 mt-[20px] rounded-lg bg-white">
      <div className="relative flex justify-center">
        <div className="absolute w-full h-20 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-50 rounded-md"></div>
        <div className="z-10 mt-10 flex justify-center h-16 w-16 lg:h-20 lg:w-20 rounded-full p-1 bg-[#F3F5F7]">
          <div className="h-full w-full overflow-clip rounded-full bg-slate-200">
            <Link to={`/settings`}>
              <img src="../man.png" alt="profile_picture" />
            </Link>
          </div>
        </div>
      </div>

      <div className="user-details flex w-full justify-center space-x-1">
        <span>{auth.user?.name}</span>
        <button
          className="text-slate-400"
          onClick={() => {
            navigate("/settings");
          }}
        >
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>

      <div className="text-xs w-full flex justify-center text-slate-400">
        {auth.user.email}
      </div>

      <div className="text-sm space-x-1 w-full flex justify-center my-2">
        <span className="font-semibold">{auth.user.friendships.length}</span>
        <span className="text-slate-500">following</span>
      </div>
    </div>
  );
};

export default UserDetails;
