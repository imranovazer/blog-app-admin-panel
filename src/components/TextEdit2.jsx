import React, { useState } from "react";
import ReactQuill from "react-quill";

function TextEdit2({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="bg-white">
      <ReactQuill modules={modules} value={value} onChange={onChange} />
    </div>
  );
}

export default TextEdit2;
