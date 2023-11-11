import { useEffect } from "react";
import { useAuth } from "../hooks";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../components";
import { motion } from "framer-motion";

const Landing = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/home");
    }
  }, []);

  if (auth.user) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="absolute top-0 w-full">
      <div className="relative -z-10 w-full h-full overflow-x-clip">
        <div className="absolute left-[45%] -top-44 h-72 w-72 rounded-full blur-3xl bg-green-300 "></div>
        <div className="absolute left-28 top-60 h-80 w-80 rounded-full blur-3xl bg-purple-300 "></div>
        <div className="absolute -right-20 top-60 h-96 w-96 rounded-full blur-3xl bg-cyan-200 "></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute flex flex-col text-center items-center backdrop-blur-lg top-0 z-10 w-full mx-auto p-4 h-[92vh] md:h-[80vh]"
      >
        <h1 className="text-5xl md:text-7xl tracking-tight font-black text-black mt-24">
          Connect with{" "}
          <span className="text-purple-500 underline-offset-8">
            Developers!
          </span>
        </h1>

        <p className="mt-8 md:leading-relaxed md:tracking-wider px-6 sm:px-4 md:px-0 text-lg text-slate-700 text-center max-w-3xl mx-auto dark:text-slate-500">
          where developers post, comment, and follow seamlessly. Join now to
          amplify your coding experience, share ideas, explore diverse
          technologies, find project collaborators and connect with a vibrant
          community of fellow developers!
        </p>

        <div className="w-full md:space-x-6 flex flex-col md:flex-row justify-center items-center mt-2">
          <button className="mt-6 md:mt-16 w-8/12 md:w-60 hover:bg-purple-600 border border-purple-500 transition-colors delay-100 text-white bg-purple-500 font-normal p-2 md:p-3 px-4 md:px-6 rounded-lg">
            <Link className="" to="/register">
              Create an account
            </Link>
          </button>

          <button className="mt-4 md:mt-16 w-8/12 md:w-60 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors delay-100 font-normal p-2 md:p-3 px-4 md:px-6 rounded-lg">
            <a
              className=""
              href="https://www.github.com/biswa418/socialMedia-React/#readme"
            >
              Learn more
            </a>
          </button>
        </div>

        <div className="absolute -z-10 bg-dotted-spacing-4 bg-dotted-gray-300 w-full h-screen -mt-28" />
      </motion.div>
    </div>
  );
};

export default Landing;
