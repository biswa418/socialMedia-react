// import PropTypes from 'prop-types';
import { Loader, FriendList, CreatePost, Post } from "../components";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth, usePost } from "../hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPost } from "../api";
import { useEffect, useState } from "react";
import Suggest from "../components/Suggest";

const Home = () => {
  const auth = useAuth();
  const posts = usePost();
  const [page, setPage] = useState(0);
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

        toast.success("Post updated successfully.");
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

  useEffect(() => {
    if (window.screen.width < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="p-1 text-sm bg-gradient-to-r to-cyan-600 from-purple-600 text-white flex justify-center">
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

      <div className="flex justify-center">
        <div className="w-11/12 md:w-9/12 mx-1 max-w-[790px]">
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
              <p className="flex flex-col mt-5" style={{ textAlign: "center" }}>
                <b>Yay! You have reached the end.</b>
              </p>
            }
            className="md:w-3/4 mx-auto"
          >
            {auth.user && <CreatePost />}
            {auth.user && mobile && <FriendList mobile={mobile} />}
            {Posts.map((post) => {
              return <Post key={post?._id} post={post} />;
            })}
          </InfiniteScroll>
        </div>
        <div className="w-3/12 mx-1 mr-4">
          {auth.user && !mobile && <FriendList mobile={false} />}
          {auth.user && !mobile && <Suggest posts={Posts}/>}
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

// Home.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default Home;
