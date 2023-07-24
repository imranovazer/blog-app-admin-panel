import { Button, Input } from "@mui/joy";
import MyModal from "../../../components/MyModal";

import React, { useEffect, useState } from "react";
import DropFileInput from "../../../components/drop-file-input/DropFileInput";
import ProfileApi from "../api";
import Loading from "../../../components/Loading";
import axios from "axios";

function EditSkillModal({
  open,
  setOpen,
  setAlertDisplay,
  setAlertContent,
  setAlertType,
  skillToEdit,
  setSkillToEdit,
  fetchSkills,
}) {
  const [file, setFile] = useState();

  const handleEditSkillName = async () => {
    try {
      const res = await ProfileApi.editSkillName(skillToEdit.id, {
        name: skillToEdit.name,
      });
      fetchSkills();
      setAlertType(true);
      setAlertContent("Skill name edited successfully");
      setAlertDisplay(true);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to edit skill name");
      setAlertDisplay(true);
    }
  };
  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("image", file);
      const res = await ProfileApi.editSkillImage(skillToEdit.id, dataToSend);
      fetchSkills();
      setAlertType(true);
      setAlertContent("Skill image edited successfully");
      setAlertDisplay(true);
      setOpen(false);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to edit skill image");
      setAlertDisplay(true);
      setOpen(false);
    }
  };
  return (
    <MyModal open={open} setOpen={setOpen} title={"Edit skill"}>
      <div className=" relative flex flex-col gap-3 items-center">
        <Input
          sx={{ width: "400px" }}
          placeholder="Company name"
          value={skillToEdit?.name}
          onChange={(e) =>
            setSkillToEdit((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        ></Input>
        <Button fullWidth onClick={handleEditSkillName}>
          Edit name
        </Button>
        <DropFileInput file={file} setFile={setFile} />
        <Button fullWidth onClick={handleSubmit}>
          Edit image
        </Button>
      </div>
    </MyModal>
  );
}

export default EditSkillModal;
