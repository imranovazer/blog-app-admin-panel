import React, { useEffect, useState } from "react";
import useFetching from "../../hooks/useFetching";
import galleryApi from "./api";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
// import { Button } from "@mui/material";
import GalleryModal from "./components/GalleryModal";
// import Select from "@mui/material";

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);
  const [reviewImage, setReviewImage] = useState();
  const [type, setType] = useState(1);

  const [fetchGallery, isLoadingFetch] = useFetching(async () => {
    const res = await galleryApi.getAll();
    setGallery(res);
  });

  const imageSizes = {
    1: "col-span-2",
    2: "col-span-1",
    3: "col-span-3",
  };

  const handleSubmit = async () => {
    if (!!file) {
      const formData = new FormData();
      formData.append("name", file?.name);
      formData.append("imageTypeId", type);
      formData.append("image", file);
      const res = await galleryApi.uploadImage(formData);
      window.location.reload(false);
    }
    return;
  };

  const handleDelete = async (id) => {
    await galleryApi.deleteById(id);
    await fetchGallery();
    setOpen();
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="container mx-auto grid grid-cols-4 gap-4">
      <h1 className="col-span-4 text-[32px] font-bold">Gallery</h1>
      <div className="col-span-3 flex-shrink-0 h-fit grid grid-cols-3 gap-2 rounded-xl shadow-lg bg-slate-100 p-3 ">
        {!isLoadingFetch && gallery.length
          ? gallery.map((image) => (
              <img
                src={image.imageUrl}
                alt={image.name}
                onClick={() => {
                  setReviewImage(image);
                  setOpen(true);
                }}
                className={`cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:rounded-lg hover:scale-[102%] duration-200`}
              />
            ))
          : "There is no image to display"}
      </div>
      <div className="col-span-1 relative">
        <DropFileInput file={file} setFile={setFile} />
        {!!file && (
          <div className="absolute right-0 grid grid-cols-2 gap-2 w-full">
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                className="h-[35px] "
                value={type}
                onChange={(e) => setType(e.target.value)}
                label="Type"
              >
                <MenuItem value={1}>Main</MenuItem>
                <MenuItem value={2}>Simple</MenuItem>
                <MenuItem value={3}>Cover</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handleSubmit}
              className="!bg-blue-200 !rounded-lg !text-white"
            >
              Upload
            </Button>
          </div>
        )}
      </div>
      <GalleryModal
        handleDelete={handleDelete}
        image={reviewImage}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default Gallery;
