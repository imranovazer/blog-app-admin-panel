import { Button, Input } from "@mui/joy";
import MyModal from "../../../components/MyModal";

import React, { useState } from "react";

import DropFileInput from "../../../components/drop-file-input/DropFileInput";
import ProfileApi from "../api";

function CreateSkillModal({
  open,
  setOpen,
  setAlertDisplay,
  setAlertContent,
  setAlertType,
  fetchSkills,
}) {
  const [skillName, setSkillName] = useState();
  const [file, setFile] = useState();

  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();

      dataToSend.append("name", skillName);
      dataToSend.append("image", file);
      const res = await ProfileApi.addSkill(dataToSend);
      fetchSkills();
      setAlertType(true);
      setAlertContent("Skill created successfully");
      setAlertDisplay(true);
      setOpen(false);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to create skill");
      setAlertDisplay(true);
      setOpen(false);
    }
  };
  return (
    <MyModal open={open} setOpen={setOpen} title={"Add skill"}>
      <div className=" relative flex flex-col gap-3 items-center">
        <Input
          sx={{ width: "400px" }}
          placeholder="Skill name"
          onChange={(e) => setSkillName(e.target.value)}
        ></Input>

        <DropFileInput file={file} setFile={setFile} />
        <Button fullWidth onClick={handleSubmit}>
          Add skill
        </Button>
      </div>
    </MyModal>
  );
}

export default CreateSkillModal;
