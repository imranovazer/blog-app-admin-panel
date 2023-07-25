import React, { useEffect, useState } from "react";
import MyModal from "../../../components/MyModal";
import { DeleteOutline } from "@mui/icons-material";

function GalleryModal({ image, open, setOpen, handleDelete }) {
  const [isHover, setIsHover] = useState(false);

  useEffect(()=>{
    setIsHover(false)
  },[open])

  return (
    <MyModal open={open} setOpen={setOpen} title={image?.name}>
      <div
        onMouseLeave={() => setIsHover(false)}
        onMouseEnter={() => setIsHover(true)}
        className="relative"
      >
        <img src={image?.imageUrl} alt={image?.name} />
        {isHover && (
          <div>
            <div
              onClick={() => handleDelete(image.id)}
              className="absolute bottom-2 left-[50%] -translate-x-[50%] flex justify-center items-center bg-red-500 rounded-full w-9 h-9 cursor-pointer hover:bg-red-600 duration-200"
            >
              <DeleteOutline className="text-white" />
            </div>
          </div>
        )}
      </div>
    </MyModal>
  );
}

export default GalleryModal;
