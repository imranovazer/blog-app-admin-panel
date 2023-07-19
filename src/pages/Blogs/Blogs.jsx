import React from "react";
import DataTable from "../../components/DataTable";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function Blogs() {
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="contained" onClick={() => navigate("/create-blog")}>
        Create new blog
      </Button>
      <DataTable />
    </div>
  );
}

export default Blogs;
