import MyModal from "../../../components/MyModal";
import { useContext, useEffect, useState } from "react";
import { AlertContex } from "../../../contex/AlertContex";
import { Button, Input, Option, Select, Textarea } from "@mui/joy";
import axiosInstance from "../../../axios";
import DropFileInput from "../../../components/drop-file-input/DropFileInput";
import ServiceApi from "../api";
const ServiceModal = ({
  open,
  setOpen,
  mode,
  fetchServices,
  serviceToEdit,
}) => {
  const [file, setFile] = useState();

  const [languages, setLanguages] = useState([]);
  const [select, setSelect] = useState("null");
  const [color, setColor] = useState(
    mode == "edit" ? serviceToEdit.color : null
  );
  const { displayAlert } = useContext(AlertContex);
  const [locales, setLocales] = useState(
    mode == "edit"
      ? serviceToEdit.locales
      : [
          {
            languageId: 2,
            title: "",
            description: "",
            content: "",
          },
        ]
  );

  useEffect(() => {
    if (mode == "edit") {
      setLocales(serviceToEdit.locales);
      setColor(serviceToEdit.color);
      setActiveLocale(serviceToEdit.locales[0]);
    }
  }, [mode, serviceToEdit]);

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

  useEffect(() => {
    const getLanguages = async () => {
      try {
        const res = await axiosInstance.get("/languages");
        setLanguages(res.data.data);
      } catch (error) {}
    };

    getLanguages();

    return () => {
      setLocales([
        {
          languageId: 2,
          title: "",
          description: "",
          content: "",
        },
      ]);
      setColor(null);
    };
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
  const [activeLocale, setActiveLocale] = useState(locales[0]);
  const handleDeleteLang = (event, id) => {
    event.stopPropagation();
    if (locales?.length == 1) {
      return;
    } else {
      const newLocales = locales.filter((e) => e.languageId != id);
      setLocales(newLocales);
    }
  };
  const handleSetActiveLocale = (locale) => {
    setActiveLocale(locale);
  };
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

      //   const res1 = await ServiceApi.editService(serviceToEdit.id, formdata);
      let res;
      if (mode == "cteate") {
        const formdata = new FormData();
        finalData.forEach((send, index) => {
          formdata.append(`locales[${index}][languageId]`, send.languageId);
          formdata.append(`locales[${index}][title]`, send.title);
          formdata.append(`locales[${index}][content]`, send.content);
          formdata.append(`locales[${index}][description]`, send.description);
        });
        formdata.append("image", file);
        formdata.append("color", color);

        res = await ServiceApi.postService(formdata);
      } else if (mode == "edit") {
        const dataToSend = {
          locales: locales,
          color: color,
        };
        res = await ServiceApi.editService(serviceToEdit.id, dataToSend);
      }
      fetchServices();
      displayAlert(true, "New service created");
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
      setOpen(false);
    } catch (error) {
      displayAlert(false, "Unable to create service");
      setOpen(false);
    }
  };
  return (
    <div>
      <MyModal
        open={open}
        setOpen={setOpen}
        title={`${mode == "edit" ? "Edit service" : "Create service"}`}
      >
        <div className="flex flex-col  rounded-xl  bg-slate-100 p-3import gap-3 p-5">
          <div className="flex content-center items-center gap-2 p-2">
            <p className="font-bold">Choose a color</p>
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="color"
              className="p-1 bg-white rounded-lg cursor-pointer "
            />
          </div>

          {mode == "create" ? (
            <Select
              defaultValue="null"
              value={select}
              sx={{ width: "100%" }}
              onChange={(e) => setSelect("null")}
            >
              <Option value="null">Select language to add</Option>
              {languages
                ? languages.map((item) => (
                    <Option
                      key={item.id}
                      value={item.id}
                      onClick={() => handleAddLocale(item.id)}
                    >
                      {item.name}
                    </Option>
                  ))
                : null}
            </Select>
          ) : null}
          <div className="rounded-lg  bg-slate-300 p-2 flex gap-1 w-[450px]">
            {locales
              ? locales.map((locale, index) => (
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
                    <p>
                      {" "}
                      {languages.find((e) => e.id == locale.languageId)?.name}
                    </p>
                    {mode == "create" ? (
                      <button
                        className=" rounded-full w-5 h-5 text-white bg-red-400  flex items-center justify-center p-1 "
                        onClick={(event) =>
                          handleDeleteLang(event, locale.languageId)
                        }
                      >
                        x
                      </button>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
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
          <DropFileInput file={file} setFile={setFile} />

          <Button onClick={handleSubmit}>
            {mode == "create" ? "Create" : "Edit"}
          </Button>
        </div>
      </MyModal>
    </div>
  );
};

export default ServiceModal;
