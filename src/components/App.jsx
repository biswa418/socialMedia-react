import { useEffect, useState } from 'react';
import { getPost } from '../api';
import { Home } from '../pages';

function App() {
  useEffect(() => {
    async function loadPost() {
      const posts = await getPost();

      console.log(posts);
    }

    loadPost();
  }, []);

  return (
    <>
      <Home />
    </>
  )
}

export default App
