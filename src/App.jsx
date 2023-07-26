import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import RoutesList from "./router/routes";
import ProectedRoute from "./router/ProectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Blogs from "./pages/Blogs/Blogs";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";
import Articles from "./pages/Articles/Articles";
import CreateArticle from "./pages/CreateArticle/CreateArticle";
import Profile from "./pages/Profile/Profile";
import EditArticle from "./pages/EditArticle/EditArticle";
import Tags from "./pages/Tags/Tags";
import Gallery from "./pages/Gallery/Gallery";
import Message from "./pages/Message/Message";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProectedRoute shouldAuth={true} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/create-blog" element={<CreatePost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog/:id" element={<EditPost />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:id" element={<EditArticle />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/message" element={<Message />} />
            <Route path="/create-article" element={<CreateArticle />} />
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
