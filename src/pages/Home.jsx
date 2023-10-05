// import PropTypes from 'prop-types';
import { Loader, FriendList, CreatePost, Post } from "../components";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth, usePost } from "../hooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPost } from "../api";
import { useEffect, useState } from "react";

const Home = () => {
  const auth = useAuth();
  const posts = usePost();
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(true);
  const [Posts, setPosts] = useState(posts?.data);

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

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="p-1 text-sm bg-gradient-to-r to-cyan-600 from-purple-600 text-white flex justify-center">
        Home page - Find posts of fellow developers
      </div>
      <div className="flex">
        <div className="w-9/12 mx-4 ">
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
            {Posts.map((post) => {
              return <Post key={post?._id} post={post} />;
            })}
          </InfiniteScroll>
        </div>
        {auth.user && <FriendList />}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

// Home.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default Home;
