import { Button } from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import ServiceModal from "./components/ServiceModal";
import ServiceApi from "./api";
import { AlertContex } from "../../contex/AlertContex";
const Services = () => {
  //(type , contetnt)
  const { displayAlert } = useContext(AlertContex);
  const [services, setServices] = useState([]);
  const [serviceModal, setServiceModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [serviceToEdit, setServiceToEdit] = useState();

  const fetchServices = async () => {
    try {
      const res = await ServiceApi.getServices();
      setServices(res);
    } catch (error) {}
  };
  const handleSetServiceToEdit = (service) => {
    const localesOfServiceToBeEddited = service.locales.map((item) => {
      return {
        languageId: item.language.id,
        content: item.content,
        title: item.title,
        description: item.description,
      };
    });
    const serviceToBeEddited = {
      ...service,
      locales: localesOfServiceToBeEddited,
    };
    setServiceToEdit(serviceToBeEddited);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await ServiceApi.deleteService(id);
      fetchServices();
      displayAlert(true, "Service deleted successfully");
    } catch (error) {
      displayAlert(false, "Unable to delete service");
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto ">
      <div className=" bg-slate-200  rounded-xl p-3 flex flex-col  gap-4">
        <Button
          fullWidth
          onClick={() => {
            setModalMode("create");
            setServiceModal(true);
          }}
        >
          Create service
        </Button>

        <div className="bg-[#143068] rounded-md grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3">
          {services.map((service, index) => (
            <div key={index} className="w-full flex justify-center">
              <div
                className="w-[100%] h-[174px] cursor-pointer flex flex-col  p-4 gap-1 rounded-md justify-around"
                style={{ backgroundColor: service.color }}
                onClick={() => {
                  handleSetServiceToEdit(service);

                  setModalMode("edit");
                  setServiceModal(true);
                }}
              >
                <div className="flex justify-between">
                  <img
                    src={service.imageUrl}
                    alt="icon"
                    className="rounded-md object-cover   h-6 w-6 object-center"
                  />
                  <Button
                    color="danger"
                    onClick={(e) => handleDelete(e, service.id)}
                  >
                    Delete
                  </Button>
                </div>

                <p className="text-[14px] font-bold">
                  {service.locales[0].title}
                </p>
                <p className="text-ellipsis overflow-hidden h-[51px] w-[311px]">
                  {service.locales[0].description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {serviceModal ? (
        <ServiceModal
          serviceToEdit={serviceToEdit}
          mode={modalMode}
          open={serviceModal}
          setOpen={setServiceModal}
          fetchServices={fetchServices}
        />
      ) : null}
    </div>
  );
};

export default Services;
