import React, { useEffect, useState } from "react";

import DropFileInput from "../../components/drop-file-input/DropFileInput";
import axiosInstance from "../../axios";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { Button } from "@mui/joy";
import JoditEditor from "jodit-react";
import AlertInvertedColors from "../../components/AlertInvertedColors";

function CreateArticle() {
  const [alert, setAlert] = useState();
  const [alertType, setAlertType] = useState();
  const [alertContent, setAlertContent] = useState();
  const [select, setSelect] = useState("null");
  const [file, setFile] = useState();
  const [date, setDate] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [categoryInput, setCategoryInput] = useState();
  const [locales, setLocales] = useState([
    {
      languageId: 2,
      title: "",
      description: "",
      content: "",
    },
  ]);

  const [categories, setCategories] = useState([]);

  const [activeLocale, setActiveLocale] = useState(locales[0]);

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

      const formdata = {
        locales: dataToSend,
        file: "Azer",
      };
      //   const formdata = new FormData();
      //   dataToSend.forEach((send, index) => {
      //     formdata.append(`locales[${index}][languageId]`, send.languageId);
      //     formdata.append(`locales[${index}][title]`, send.title);
      //     formdata.append(`locales[${index}][content]`, send.content);
      //     formdata.append(`locales[${index}][description]`, send.description);
      //   });
      //   categories.forEach((category, index) => {
      //     formdata.append(`categories[${index}][name]`, category);
      //   });
      //   formdata.append("File", file);
      //   formdata.append("date", date);
      //   const res = await axiosInstance.post("/article", formdata, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   });
      const res = await axiosInstance.post("/article", formdata);
      setAlertType(true);
      setAlertContent("New article created succesffully!");
      setAlert(true);
      setLocales([
        {
          languageId: 2,
          title: "",
          description: "",
          content: "",
        },
      ]);
      setActiveLocale(locales[0]);

      setFile(null);
      setDate(null);
      setCategories([]);

      console.log(res);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to create article please fill all data!");
      setAlert(true);
      console.log(error);
    }
  };

  const handleDeleteLang = (event, id) => {
    event.stopPropagation();
    if (locales.length == 1) {
      return;
    } else {
      const newLocales = locales.filter((e) => e.languageId != id);
      setLocales(newLocales);
    }
  };
  const handleAddLocale = (language) => {
    setLocales((prevState) => {
      if (prevState.some((e) => e.languageId == language)) {
        return prevState;
      } else {
        return [
          ...prevState,
          {
            languageId: language,
            title: "",
            description: "",
            content: "",
          },
        ];
      }
    });
  };

  const handleCategoryAdd = () => {
    if (categories.includes(categoryInput)) {
      return;
    } else {
      setCategories((prev) => [...prev, categoryInput]);
      setCategoryInput("");
    }
  };

  const handleCategoryDelete = (category) => {
    const newCategories = categories.filter((item) => item !== category);
    setCategories(newCategories);
  };

  const handleSetActiveLocale = (locale) => {
    setActiveLocale(locale);
  };
  return (
    <div className="container mx-auto flex flex-col gap-2">
      <AlertInvertedColors
        display={alert}
        type={alertType}
        setDisplay={setAlert}
        content={alertContent}
      />
      <div className="rounded-xl shadow-md bg-slate-200 p-3 flex justify-between gap-3">
        <div className="w-1/2">
          <DropFileInput file={file} setFile={setFile} />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <Select
            defaultValue="null"
            value={select}
            sx={{ width: "100%" }}
            onChange={(e) => setSelect("null")}
          >
            <Option value="null">Select language to add</Option>
            {languages &&
              languages.map((item) => (
                <Option
                  key={item.id}
                  value={item.id}
                  onClick={() => handleAddLocale(item.id)}
                >
                  {item.name}
                </Option>
              ))}
          </Select>
          <Input type="date" onChange={(e) => setDate(e.target.value)} />
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter category"
              className="w-full"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />
            <Button onClick={handleCategoryAdd}>Add</Button>
          </div>

          <div className="flex gap-2">
            {categories &&
              categories.map((category, index) => (
                <div
                  key={index}
                  className="rounded-lg p-2 bg-white  w-fit flex gap-2 items-center"
                >
                  {category}
                  <div
                    className=" rounded-full w-5 h-5 text-white bg-red-400  flex items-center justify-center p-1 cursor-pointer"
                    onClick={() => handleCategoryDelete(category)}
                  >
                    x
                  </div>
                </div>
              ))}
          </div>
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
                } hover:bg-slate-200  cursor-pointer flex w-[130px] justify-between content-center p-2  font-bold  rounded-lg  shadow-sm gap-2 items-center`}
              >
                <p> {languages.find((e) => e.id == locale.languageId)?.name}</p>
                <button
                  className=" rounded-full w-5 h-5 text-white bg-red-400  flex items-center justify-center p-1 "
                  onClick={(event) =>
                    handleDeleteLang(event, locale.languageId)
                  }
                >
                  x
                </button>
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
          <Button onClick={handleSubmit}>Post</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateArticle;
