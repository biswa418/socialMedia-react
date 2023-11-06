import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [showMenu, alterMenu] = useState(false);

  return (
    <nav className="flex h-20 fixed top-0 w-full z-10 bg-white p-3 py-5 items-center justify-between">
      <div className="leftDiv">
        <Link className="flex items-center justify-center" to="/home">
          <img
            className="text-sm h-6 md:h-8 transition-all delay-200 px-3 text-blue-400"
            src="/logo.svg"
            alt="logo"
          />
          <h1 className="text-slate-800 transition-all delay-200 font-black text-xl md:text-3xl">
            DevConnect
          </h1>
        </Link>
      </div>

      <div className="rightDiv flex text-slate-900 font-bold text-base">
        {auth.user && (
          <button
            onClick={() => alterMenu(!showMenu)}
            className="user p-2 rounded-full px-3 hover:bg-slate-200 flex items-center space-x-2"
          >
            <img className="h-10" alt="userDP" src="../man.png" />
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        )}

        <div className="navLinks flex items-center">
          <ul className="flex list-none">
            {auth.user ? (
              <>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 100, y: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute flex flex-col justify-center items-center w-1/2 md:w-1/4 right-5 md:right-6 top-20 md:top-20 p-4 md:p-8 rounded-lg bg-white text-slate-400 text-sm space-y-2"
                  >
                    <button
                      onClick={() => {
                        alterMenu(false);
                        navigate("/settings");
                      }}
                      className="flex items-center justify-between w-11/12 p-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 hover:cursor-pointer"
                    >
                      <div className="flex items-center">
                        <img className="h-10" alt="userDP" src="../man.png" />
                        <span className="mx-2 text-base">{auth.user.name}</span>
                      </div>

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
                          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>

                    <div className="bg-slate-300 w-11/12 h-[1px]" />

                    <button className="w-11/12 flex p-2 px-7 font-semibold items-center">
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
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>

                      <li className="px-1">
                        <button
                          className="hover:underline"
                          onClick={() => {
                            auth.logout();
                            alterMenu(false);
                            navigate("/login");
                          }}
                        >
                          Sign out
                        </button>
                      </li>
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <>
                <li className="px-2 text-sm">
                  <Link className="hover:underline" to="/login">
                    Sign in
                  </Link>
                </li>
                <li className="px-2 text-sm">
                  <Link className="hover:underline" to="/register">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
