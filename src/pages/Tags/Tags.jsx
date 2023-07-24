import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import { useNavigate } from "react-router-dom";
import tagsApi from "./api";
import TagModal from "./components/TagModal";
import { Close } from "@mui/icons-material";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [tagHover, setTagHover] = useState(-1);

  const navigate = useNavigate();
  const getData = async () => {
    const res = await tagsApi.getTags();
    setTags(res);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await tagsApi.deleteTagById(id);
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    } catch (error) {
      console.error("Error deleting tag or fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Button onClick={() => setIsModalActive(true)}>Create new tag</Button>
      <h1 className="text-[32px] font-bold">Tags</h1>
      <div className="flex gap-2 rounded-xl shadow-lg bg-slate-100  p-3 ">
        {tags?.length
          ? tags?.map((tag) => (
              <div
                key={tag.id}
                onMouseEnter={() => setTagHover(tag.id)}
                onMouseLeave={() => setTagHover(-1)}
                className="relative rounded-full text-white bg-gray-400 hover:bg-gray-500 border-[0.5px] border-gray-500 py-1 px-3 cursor-default duration-200"
              >
                {tag.name}
                {tagHover === tag.id && (
                  <div
                    onClick={() => handleDelete(tag.id)}
                    className="absolute flex items-center justify-center -right-1 -top-1 w-[15px] h-[15px] z-50 rounded-full bg-red-400 duration-200 cursor-pointer"
                  >
                    <Close fontSize="10" />
                  </div>
                )}
              </div>
            ))
          : "There is no tag"}
      </div>

      <TagModal
        open={isModalActive}
        setOpen={setIsModalActive}
        fetchTags={getData}
      />
    </div>
  );
};

export default Tags;
