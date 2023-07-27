import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import blogApi from "./api";
import { Table } from "@mui/joy";
import { AlertContex } from "../../contex/AlertContex";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const { displayAlert } = useContext(AlertContex);
  const navigate = useNavigate();
  const getData = async () => {
    const res = await blogApi.getAll();
    setBlogs(res);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await blogApi.deleteById(id);
      getData();
      displayAlert(true, "Blog deleted successfully");
    } catch (error) {
      displayAlert(false, "Unable to delete blog");
    }
  };
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Button onClick={() => navigate("/create-blog")}>Create new blog</Button>
      <h1 className="text-[32px] font-bold">Blogs</h1>
      <div className="rounded-xl shadow-lg bg-slate-100  p-3 ">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {blogs?.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog?.locales[0].title}</td>
                  <td>{blog?.date}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => {
                        navigate(`/blog/${blog.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={5}>Blogs not found</th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Blogs;
