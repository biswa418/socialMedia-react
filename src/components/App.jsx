import { useEffect, useState } from 'react';
import { getPost } from '../api';

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
      <div className='border-2 border-sky-500'>Hello world</div>
    </>
  )
}

export default App
