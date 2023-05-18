// import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home, Login, Page404 } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';



function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />
  }

  // console.log(posts);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home posts={[]} />} />
          <Route path='/login' element={<Login />} />

          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
