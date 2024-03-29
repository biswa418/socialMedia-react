// import PropTypes from 'prop-types';
import {
  Loader,
  FriendList,
  CreatePost,
  Post,
  UserDetails,
  Footer,
  Suggest,
} from "../components";
import { Toaster } from "react-hot-toast";
import { useAuth, usePost } from "../hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPost } from "../api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = useAuth();
  const posts = usePost();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [end, setEnd] = useState(true);
  const [Posts, setPosts] = useState(posts?.data);
  const [mobile, setMobile] = useState(true);

  async function callContent() {
    try {
      const response = await getPost(page);

      if (response.success) {
        posts.addMulPosts(response?.data?.posts);

        if (page == 10) {
          setEnd(false);
        }

        //toast.success("Post updated successfully.");
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    setPosts(posts.data);
    setPage(page + 1);
  }, [posts.data.length]);

  const handleResize = () => {
    if (window.screen.width < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 1000) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    if (window.screen.width < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (posts.loading) {
    return <Loader />;
  }

  if (!auth.user) {
    navigate("/");
  } else {
    return (
      <>
        <div className="p-1 text-sm bg-gradient-to-r to-cyan-500 from-purple-500 text-white flex justify-center">
          Home page - Find posts of fellow developers &nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/biswa418/socialMedia-react#readme"
            className="hover:cursor-pointer underline"
          >
            Details
          </a>
        </div>

        <div className="flex justify-center mx-auto md:w-9/12 max-w-[950px] relative">
          <div className="hidden md:block mx-1 md:w-3/12">
            {auth.user && !mobile && <Suggest posts={Posts} />}

            <Footer />
          </div>
          <div className="w-11/12 md:w-8/12 mx-1 max-w-[600px]">
            <InfiniteScroll
              dataLength={Posts?.length}
              next={() => callContent(page)}
              hasMore={end}
              loader={
                <div className="w-full py-2 min-h-max flex justify-center overflow-y-hidden">
                  Loading...
                </div>
              }
              endMessage={
                <p
                  className="flex flex-col mt-5"
                  style={{ textAlign: "center" }}
                >
                  <b>Yay! You have reached the end.</b>
                </p>
              }
              className="md:px-3 mx-auto"
            >
              {auth.user && <CreatePost />}
              {auth.user && mobile && <FriendList mobile={mobile} />}
              {Posts.map((post) => {
                return <Post key={post?._id} post={post} />;
              })}
            </InfiniteScroll>
          </div>

          <div className="hidden md:block mx-1 md:w-3/12">
            {auth.user && !mobile && <UserDetails mobile={false} />}
            {auth.user && !mobile && <FriendList mobile={false} />}
          </div>

          {showScroll && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="fixed flex top-24 text-sm bg-purple-300 text- p-3 px-5 rounded-full"
              onClick={() => {
                window.scrollTo(0, 0);
                setShowScroll(false);
              }}
            >
              Back to top
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                />
              </svg>
            </motion.button>
          )}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </>
    );
  }
};

// Home.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default Home;
