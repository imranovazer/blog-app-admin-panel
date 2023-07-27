import React, { useContext, useEffect, useState } from "react";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import axiosInstance from "../../axios";

import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { Button } from "@mui/joy";
import JoditEditor from "jodit-react";

import { useParams } from "react-router-dom";
import EditEventApi from "./api/index";
import Loading from "../../components/Loading";
import { AlertContex } from "../../contex/AlertContex";

function EditEvent() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { displayAlert } = useContext(AlertContex);
  const [file, setFile] = useState();
  const [date, setDate] = useState();
  const [languages, setLanguages] = useState([]);

  const [locales, setLocales] = useState([]);

  const [activeLocale, setActiveLocale] = useState(locales[0]);

  useEffect(() => {
    const getData = async () => {
      const res = await EditEventApi.getEventById(id);

      const localesToset = res.locales.map((item) => ({
        content: item.content,
        title: item.title,
        languageId: item.language.id,
        description: item.description,
      }));
      setLocales(localesToset);
      setDate(res.date);
      setActiveLocale(localesToset[0]);
      setLoading(false);
    };

    getData();
  }, []);

  const saveDataOnLangChange = () => {
    const clonedLocales = [...locales];
    const newLocales = clonedLocales.map((item) => {
      if (activeLocale.languageId === item.languageId) {
        return activeLocale;
      } else {
        return item;
      }
    });
    setLocales(newLocales);
    return newLocales;
  };

  const handleInputChange = (key, value) => {
    const newActiveLocale = { ...activeLocale, [key]: value };
    setActiveLocale(newActiveLocale);
  };

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const res = await axiosInstance.get("/languages");
        setLanguages(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getLanguages();
  }, []);

  const handleSubmit = async () => {
    try {
      const dataToSend = saveDataOnLangChange();

      const jsonToSend = {
        locales: dataToSend,
        date: date,
      };
      const res = await axiosInstance.patch(`/event/${id}`, jsonToSend);
      displayAlert(true, "Event edited successfully");
      console.log(res);
    } catch (error) {
      displayAlert(false, "Unable to edit event");
      console.log(error);
    }
  };

  const hadleImageUpdate = async () => {
    try {
      const data = new FormData();

      data.append("image", file);
      const res = await EditEventApi.editEventImage(id, data);
      displayAlert(true, "Event image edited successfully!");
    } catch (error) {
      displayAlert(false, "Unable to change event image");
      console.log(error);
    }
  };

  const handleSetActiveLocale = (locale) => {
    setActiveLocale(locale);
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="container mx-auto flex flex-col gap-2">
      <div className="rounded-xl shadow-md bg-slate-200 p-3 flex justify-between gap-3">
        <div className="w-1/2 flex flex-col gap-3">
          <DropFileInput file={file} setFile={setFile} />

          <Button onClick={hadleImageUpdate}>Update image </Button>
        </div>
        <div className="w-1/2 flex flex-col gap-3">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></Input>
        </div>
      </div>
      <div className="rounded-xl shadow-md bg-slate-200 p-3 flex flex-col gap-4">
        <div className="rounded-lg  bg-slate-100 p-3 flex gap-1">
          {locales &&
            locales.map((locale, index) => (
              <div
                onClick={() => {
                  saveDataOnLangChange();
                  handleSetActiveLocale(locale);
                }}
                key={index}
                className={` ${
                  activeLocale.languageId == locale.languageId
                    ? "bg-slate-200"
                    : "bg-white"
                } hover:bg-slate-200  cursor-pointer flex w-[130px] justify-center content-center p-2  font-bold  rounded-lg  shadow-sm gap-2 items-center`}
              >
                <p> {languages.find((e) => e.id == locale.languageId)?.name}</p>
              </div>
            ))}
        </div>
        <div className="flex flex-col  rounded-xl  bg-slate-100 p-3import gap-3 p-5">
          <Input
            placeholder="Title "
            value={activeLocale.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <Textarea
            placeholder="Description "
            value={activeLocale.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <JoditEditor
            value={activeLocale.content}
            onBlur={(value) => {
              handleInputChange("content", value);
            }}
          />
          <Button onClick={handleSubmit}>Save changes</Button>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
