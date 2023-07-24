import { Button, Input } from "@mui/joy";
import MyModal from "../../../components/MyModal";

import React, { useState } from "react";

import DropFileInput from "../../../components/drop-file-input/DropFileInput";
import ProfileApi from "../api";

function CreateCompanyModal({
  open,
  setOpen,
  setAlertDisplay,
  setAlertContent,
  setAlertType,
  fetchCompanies,
}) {
  const [companyName, setCompanyName] = useState();
  const [file, setFile] = useState();

  const handleSubmit = async () => {
    try {
      const dataToSend = new FormData();

      dataToSend.append("name", companyName);
      dataToSend.append("image", file);
      const res = await ProfileApi.addCompany(dataToSend);
      fetchCompanies();
      setAlertType(true);
      setAlertContent("Company created successfully");
      setAlertDisplay(true);
      setOpen(false);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to create company");
      setAlertDisplay(true);
      setOpen(false);
    }
  };
  return (
    <MyModal open={open} setOpen={setOpen} title={"Add company"}>
      <div className=" relative flex flex-col gap-3 items-center">
        <Input
          sx={{ width: "400px" }}
          placeholder="Company name"
          onChange={(e) => setCompanyName(e.target.value)}
        ></Input>

        <DropFileInput file={file} setFile={setFile} />
        <Button fullWidth onClick={handleSubmit}>
          Add company
        </Button>
      </div>
    </MyModal>
  );
}

export default CreateCompanyModal;
