import React, { useEffect, useState } from "react";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import axiosInstance from "../../axios";

import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { Button } from "@mui/joy";
import JoditEditor from "jodit-react";
import AlertInvertedColors from "../../components/AlertInvertedColors";
import { useParams } from "react-router-dom";
import editBlogApi from "./api";
import Loading from "../../components/Loading";

function EditPost() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [alert, setAlert] = useState();
  const [alertType, setAlertType] = useState();
  const [alertContent, setAlertContent] = useState();
  const [select, setSelect] = useState("null");
  const [file, setFile] = useState();
  const [date, setDate] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [categoryInput, setCategoryInput] = useState();
  const [locales, setLocales] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeLocale, setActiveLocale] = useState(locales[0]);

  useEffect(() => {
    const getData = async () => {
      const res = await editBlogApi.getBlogById(id);
      console.log(res);
      const localesToset = res.locales.map((item) => ({
        ...item,
        languageId: item.language.id,
      }));
      setLocales(localesToset);
      const fetchedCategories = res.categories.map((item) => item.name);
      console.log(fetchedCategories);
      setCategories(fetchedCategories);
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
      const categoryTosend = categories.map((item) => ({ name: item }));
      const jsonToSend = {
        locales: dataToSend,
        categories: categoryTosend,
        date: date,
      };
      const res = await axiosInstance.patch(`/blog/${id}`, jsonToSend);
      setAlertType(true);
      setAlertContent("Blog updated successfully!");
      setAlert(true);

      console.log(res);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to create blog please fill all data!");
      setAlert(true);
      console.log(error);
    }
  };

  const hadleImageUpdate = async () => {
    try {
      const data = new FormData();

      data.append("image", file);
      const res = await editBlogApi.editPhotoOfBlog(id, data);
      setAlertType(true);
      setAlertContent("Blog updated successfully!");
      setAlert(true);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to create blog please fill all data!");
      setAlert(true);
      console.log(error);
    }
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
  return loading ? (
    <Loading />
  ) : (
    <div className="container mx-auto flex flex-col gap-2">
      <AlertInvertedColors
        display={alert}
        type={alertType}
        setDisplay={setAlert}
        content={alertContent}
      />
      <div className="rounded-xl shadow-md bg-slate-200 p-3 flex justify-between gap-3">
        <div className="w-1/2 flex flex-col gap-3">
          <DropFileInput file={file} setFile={setFile} />

          <Button onClick={hadleImageUpdate}>Update image </Button>
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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

export default EditPost;
