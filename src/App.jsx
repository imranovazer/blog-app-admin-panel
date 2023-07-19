import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RoutesList from "./router/routes";
import About from "./pages/About";
import ProectedRoute from "./router/ProectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Blogs from "./pages/Blogs/Blogs";
import CreatePost from "./pages/CreatePost/CreatePost";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProectedRoute shouldAuth={true} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-blog" element={<CreatePost />} />
          </Route>
        </Route>
        <Route element={<ProectedRoute shouldAuth={false} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
