// import PropTypes from 'prop-types';
import { Loader, FriendList, CreatePost, Post } from "../components";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth, usePost } from "../hooks";

const Home = () => {
    const auth = useAuth();
    const posts = usePost();

    if (posts.loading) {
        return <Loader />
    }

    return (
        <div className='flex md:w-3/4 mx-auto'>
            <div className='w-9/12 mx-4'>
                {auth.user && <CreatePost />}
                {posts.data.map(post => {
                    return <Post key={post._id} post={post} />
                })}

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div >
            {
                auth.user &&
                <FriendList />
            }
        </div>
    );
};

// Home.propTypes = {
//     posts: PropTypes.array.isRequired
// }

export default Home;
