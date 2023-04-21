import { useEffect, useState } from 'react';
import { getPost } from '../api';
import { Home } from '../pages';
import Loader from './Loader';

function App() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const posts = await getPost();

      if (posts.success) {
        setPosts(posts.data.posts);
      }

      setLoading(false);
    }

    loadPost();
  }, []);

  if (loader) {
    return <Loader />
  }

  // console.log(posts);

  return (
    <>
      <Home posts={posts} />
    </>
  )
}

export default App
