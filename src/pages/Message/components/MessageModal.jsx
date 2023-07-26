import React from "react";
import MyModal from "../../../components/MyModal";
import { DeleteOutline } from "@mui/icons-material";

function MessageModal({ open, setOpen, message, handleDelete }) {
  return (
    <MyModal open={open} setOpen={setOpen}>
      <div className="m-4">
        <h2>Name: {message?.name}</h2>
        <small>Email: {message?.email}</small>
        <h4>Subject: {message?.subject}</h4>
        <div className="mt-2 mb-5">{message?.description}</div>
        <div
          onClick={() => handleDelete(message.id)}
          className="absolute bottom-2 left-[50%] -translate-x-[50%] flex justify-center items-center bg-red-500 rounded-full w-6 h-6 cursor-pointer hover:bg-red-600 duration-200"
        >
          <DeleteOutline className="text-white !w-4 !h-4" />
        </div>
      </div>
    </MyModal>
  );
}

export default MessageModal;
