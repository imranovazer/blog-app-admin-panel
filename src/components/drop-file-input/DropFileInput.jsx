import React, { useRef, useState } from "react";

import "./drop-file-input.css";

import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../assets/cloud-upload-regular-240.png";

const DropFileInput = ({ file, setFile }) => {
  const wrapperRef = useRef(null);
  const [fileUrl, setFileUrl] = useState();
  // const [file, setFile] = useState();
  // console.log(file);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    setFileUrl(URL.createObjectURL(newFile));
    setFile(newFile);
  };

  const fileRemove = () => {
    setFile(null);
    setFileUrl(null);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input overflow-hidden"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          {fileUrl ? (
            <img
              src={fileUrl}
              style={{ width: "100%" }}
              className="object-cover"
            />
          ) : (
            <>
              <img src={uploadImg} alt="preview" />
              <p>Drag & Drop your files here</p>
            </>
          )}
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {file ? (
        <div className="drop-file-preview w-full">
          <p className="drop-file-preview__title">Ready to upload</p>
          {
            <div className="drop-file-preview__item ">
              <img
                src={
                  ImageConfig[file.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{file.name}</p>
                <p>{file.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove()}
              >
                x
              </span>
            </div>
          }
        </div>
      ) : null}
    </>
  );
};

export default DropFileInput;
