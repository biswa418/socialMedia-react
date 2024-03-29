// import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Home,
  Login,
  Page404,
  Settings,
  Signup,
  UserProfile,
  Landing,
} from "../pages";
import { Loader, Navbar } from "./";
import { useAuth } from "../hooks";

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  // console.log(posts);

  return (
    <>
      <Router>
          <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home posts={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
