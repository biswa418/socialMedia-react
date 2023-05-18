import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getPost } from '../api';
import { Home, Login, Page404 } from '../pages';
import { Loader, Navbar } from './';


const About = () => {
  return (
    <h1>
      About
    </h1>
  )
}

const UserInfo = () => {
  return (
    <h1>
      User
    </h1>
  )
}

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
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home posts={posts} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/users/afafa' element={<UserInfo />} />

          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
