import { Button, Input } from "@mui/joy";
import MyModal from "../../../components/MyModal";

import React, { useState } from "react";

import DropFileInput from "../../../components/drop-file-input/DropFileInput";
import ProfileApi from "../api";
import tagsApi from "../api";

function TagModal({
  open,
  setOpen,
  setAlertDisplay,
  setAlertContent,
  setAlertType,
  fetchTags,
}) {
  const [tagName, setTagName] = useState();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await tagsApi.createTag(tagName);
      fetchTags();
      setOpen(false);
      setAlertType(true);
      setAlertContent("Tag created successfully");
      setAlertDisplay(true);
      setOpen(false);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to create tag");
      setAlertDisplay(true);
      setOpen(false);
    }
  };
  return (
    <MyModal open={open} setOpen={setOpen} title={"Add tag"}>
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col gap-3 items-center"
      >
        <Input
          sx={{ width: "400px" }}
          placeholder="Tag name"
          onChange={(e) => setTagName(e.target.value)}
        ></Input>

        <Button fullWidth type="submit">
          Add tag
        </Button>
      </form>
    </MyModal>
  );
}

export default TagModal;
