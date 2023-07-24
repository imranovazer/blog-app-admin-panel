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
  companyToEdit,
  setCompanyToEdit,
  fetchCompanies,
}) {
  const [file, setFile] = useState();

  const handleEditCompanyName = async () => {
    try {
      const res = await ProfileApi.editCompanyName(companyToEdit.id, {
        name: companyToEdit.name,
      });
      fetchCompanies();
      setAlertType(true);
      setAlertContent("Company name edited successfully");
      setAlertDisplay(true);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to edit company name");
      setAlertDisplay(true);
    }
  };
  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("image", file);
      const res = await ProfileApi.editCompanyPhoto(
        companyToEdit.id,
        dataToSend
      );
      fetchCompanies();
      setAlertType(true);
      setAlertContent("Company image edited successfully");
      setAlertDisplay(true);
      setOpen(false);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to edit company image");
      setAlertDisplay(true);
      setOpen(false);
    }
  };
  return (
    <MyModal open={open} setOpen={setOpen} title={"Edit company"}>
      <div className=" relative flex flex-col gap-3 items-center">
        <Input
          sx={{ width: "400px" }}
          placeholder="Company name"
          value={companyToEdit?.name}
          onChange={(e) =>
            setCompanyToEdit((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        ></Input>
        <Button fullWidth onClick={handleEditCompanyName}>
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
