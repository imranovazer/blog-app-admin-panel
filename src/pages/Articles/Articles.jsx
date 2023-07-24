import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";

import { Table } from "@mui/joy";
import articlesApi from "./api/inedx";
function Articles() {
  const [articles, setArticles] = useState([]);
  console.log(articles);
  const navigate = useNavigate();
  const getData = async () => {
    const res = await articlesApi.getArticles();

    setArticles(res);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const res = await articlesApi.deleteArticleById(id);
    getData();
  };
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Button onClick={() => navigate("/create-article")}>
        Create new article
      </Button>
      <h1 className="text-[32px] font-bold">Articles</h1>
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
            {articles?.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td>{article?.locales[0].title}</td>
                  <td>{article?.date}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => {
                        navigate(`/blog/${article.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={5}>Articles not found</th>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Articles;
