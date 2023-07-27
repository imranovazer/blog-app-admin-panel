import React, { useEffect, useState } from "react";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import axiosInstance from "../../axios";

import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import { Button } from "@mui/joy";
import JoditEditor from "jodit-react";
import AlertInvertedColors from "../../components/AlertInvertedColors";
import { useParams } from "react-router-dom";
import EditArticleApi from "./api";
import Loading from "../../components/Loading";

function EditArticle() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [alert, setAlert] = useState();
  const [alertType, setAlertType] = useState();
  const [alertContent, setAlertContent] = useState();

  const [file, setFile] = useState();

  const [languages, setLanguages] = useState([]);

  const [locales, setLocales] = useState([]);

  const [activeLocale, setActiveLocale] = useState(locales[0]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState();
  const [authors, setAuthors] = useState([]);

  const [authorSurnameInput, setAuthorSurnameInput] = useState();
  const [authorInput, setAuthorInput] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await EditArticleApi.getArticleById(id);
      console.log(res);
      const localesToset = res.locales.map((item) => ({
        content: item.content,
        title: item.title,
        languageId: item.language.id,
        description: item.description,
      }));
      setLocales(localesToset);
      const tagsToset = res.tags.map((item) => item.name);
      setTags(tagsToset);
      const AuthorsToSet = res.authors.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
      }));
      setAuthors(AuthorsToSet);
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
      const tagsTosent = tags.map((item) => ({
        name: item,
      }));
      const jsonToSend = {
        locales: dataToSend,
        authors: authors,
        tags: tagsTosent,
      };
      const res = await axiosInstance.patch(`/article/${id}`, jsonToSend);
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

  const handleAuthorAdd = () => {
    const userName = `${authorInput} ${authorSurnameInput}`;
    const fullName = { firstName: authorInput, lastName: authorSurnameInput };

    if (
      authors.some(
        (author) =>
          author.firstName === fullName.firstName &&
          author.lastName === fullName.lastName
      )
    ) {
      // Author already exists, do nothing.
      return;
    } else if (userName.trim() === "") {
      // Empty input, do nothing.
      return;
    } else {
      // Add new author object to the array.
      setAuthors((prev) => [
        ...prev,
        { firstName: authorInput, lastName: authorSurnameInput },
      ]);
      setAuthorInput("");
      setAuthorSurnameInput("");
    }
  };

  const hadleImageUpdate = async () => {
    try {
      const data = new FormData();

      data.append("image", file);
      const res = await EditArticleApi.editArticleImage(id, data);
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
  const handeTagAdd = () => {
    if (tags.includes(tagInput)) {
      return;
    } else if (tagInput.trim() == "") {
      return;
    } else {
      setTags((prev) => [...prev, tagInput]);
      setTagInput("");
    }
  };

  const handleAuthorDelete = (author) => {
    const newCategories = authors.filter((item) => item !== author);
    setAuthors(newCategories);
  };
  const handleTagDelete = (tag) => {
    const newTags = tags.filter((item) => item !== tag);
    setTags(newTags);
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
          <div className="flex gap-3">
            <Input
              type="text"
              AlertInvertedColors
              placeholder="Enter author name"
              className="w-full"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
            />
            <Input
              type="text"
              AlertInvertedColors
              placeholder="Enter author name"
              className="w-full"
              value={authorSurnameInput}
              onChange={(e) => setAuthorSurnameInput(e.target.value)}
            />
            <Button onClick={handleAuthorAdd}>Add</Button>
          </div>

          <div className="flex gap-2">
            {authors &&
              authors.map((author, index) => (
                <div
                  key={index}
                  className="rounded-lg p-2 bg-white  w-fit flex gap-2 items-center"
                >
                  {`${author.firstName} ${author.lastName}`}
                  <div
                    className=" rounded-full w-5 h-5 text-white bg-red-400  flex items-center justify-center p-1 cursor-pointer"
                    onClick={() => handleAuthorDelete(author)}
                  >
                    x
                  </div>
                </div>
              ))}
          </div>
          <div className="flex gap-3">
            <Input
              type="text"
              AlertInvertedColors
              placeholder="Enter tag name"
              className="w-full"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Button onClick={handeTagAdd}>Add</Button>
          </div>
          <div className="flex gap-2">
            {tags &&
              tags.map((tag, index) => (
                <div
                  key={index}
                  className="rounded-lg p-2 bg-white  w-fit flex gap-2 items-center"
                >
                  {tag}
                  <div
                    className=" rounded-full w-5 h-5 text-white bg-red-400  flex items-center justify-center p-1 cursor-pointer"
                    onClick={() => handleTagDelete(tag)}
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

export default EditArticle;
