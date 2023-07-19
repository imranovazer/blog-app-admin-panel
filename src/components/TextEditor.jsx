import React, { useCallback, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

var options = {
  debug: "info",

  placeholder: "Compose an epic...",
  // readOnly: true,
  theme: "snow",
};
// sadss
//fwfdwdw
function TextEditor() {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, options);
  }, []);
  return <div id="text-editor" ref={wrapperRef}></div>;
}

export default TextEditor;
