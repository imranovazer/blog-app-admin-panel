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

  const [tagInput, setTagInput] = useState();

  const [languages, setLanguages] = useState([]);
  const [authorSurnameInput, setAuthorSurnameInput] = useState();
  const [authorInput, setAuthorInput] = useState();
  const [locales, setLocales] = useState([
    {
      languageId: 2,
      title: "",
      description: "",
      content: "",
    },
  ]);

  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);

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

      const finalData = languages.map((language, index) => {
        let isExsist = dataToSend.find(
          (data) => data.languageId == language.id
        );
        if (isExsist) {
          return isExsist;
        } else {
          return { ...dataToSend[0], languageId: language.id };
        }
      });

      const formdata = new FormData();
      finalData.forEach((send, index) => {
        formdata.append(`locales[${index}][languageId]`, send.languageId);
        formdata.append(`locales[${index}][title]`, send.title);
        formdata.append(`locales[${index}][content]`, send.content);
        formdata.append(`locales[${index}][description]`, send.description);
      });
      authors.forEach((send, index) => {
        formdata.append(`authors[${index}][firstName]`, send.firstName);
        formdata.append(`authors[${index}][lastName]`, send.lastName);
      });
      tags.forEach((send, index) => {
        formdata.append(`tags[${index}][name]`, send);
      });

      formdata.append("image", file);

      const res = await axiosInstance.post("/article", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const res = await axiosInstance.post("/article", formdata);
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
      setAuthors([]);

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
    if (locales?.length == 1) {
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
              placeholder="Enter author surname"
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
