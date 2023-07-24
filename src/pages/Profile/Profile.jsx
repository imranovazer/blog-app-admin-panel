import { Button } from "@mui/joy";
import React, { useEffect, useState } from "react";
import CompanyCard from "./components/CompanyCard";
import CreateCompanyModal from "./components/CreateCompanyModal";
import AlertInvertedColors from "../../components/AlertInvertedColors";
import ProfileApi from "./api";
import EditCompanyModal from "./components/EditCompanyModal";
import CreateSkillModal from "./components/CreateSkillModal";
import EditSkillModal from "./components/EditSkillModal";

function Profile() {
  const [companyToEdit, setCompanyToEdit] = useState();
  const [skills, setSkills] = useState([]);
  const [createSkillModal, setCreateSkillModal] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState();
  const [editSkillModal, setEditSkillModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [createCommpanyModal, setCreateCompanyModal] = useState(false);
  const [editCompanyModal, setEditCompanyModal] = useState(false);
  const [AlertType, setAlertType] = useState();
  const [alertContent, setAlertContent] = useState();
  const [alertDisplay, setAlertDisplay] = useState(false);
  const fetchCompanies = async () => {
    const data = await ProfileApi.getCompanies();
    setCompanies(data);
  };
  const fetchSkills = async () => {
    try {
      const data = await ProfileApi.getSkills();
      setSkills(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchCompanies();
    fetchSkills();
  }, []);

  const handleCompanyDelete = async (id) => {
    const delteCompany = async () => {
      try {
        const res = await ProfileApi.deleteCompany(id);
        fetchCompanies();
        setAlertType(true);
        setAlertContent("Company deleted");
        setAlertDisplay(true);
        console.log("Here");
      } catch (error) {
        setAlertType(false);
        setAlertContent("Unable to delete company");
        setAlertDisplay(true);
      }
    };
    delteCompany();
  };
  const handleSkillDelete = async (id) => {
    try {
      const res = await ProfileApi.deleteSkill(id);
      fetchSkills();
      setAlertType(true);
      setAlertContent("Skill deleted");
      setAlertDisplay(true);
    } catch (error) {
      setAlertType(false);
      setAlertContent("Unable to delete skill");
      setAlertDisplay(true);
    }
  };

  return (
    <div className="container mx-auto flex flex-col gap-5">
      <div className="bg-[#143068] rounded-xl flex flex-col p-4 gap-5">
        <Button onClick={() => setCreateCompanyModal(true)}>
          Add new company
        </Button>

        <div className="grid gap-4 grid-cols-1  lg:grid-cols-3 xl:grid-cols-4">
          {companies?.length > 0 ? (
            companies.map((company, index) => (
              <div key={index} className="flex justify-center">
                <CompanyCard
                  companyName={company.name}
                  imageUrl={company.imageUrl}
                  onDeleteClick={() => handleCompanyDelete(company.id)}
                  onEditClick={() => {
                    setCompanyToEdit(company);
                    setEditCompanyModal(true);
                  }}
                />
              </div>
            ))
          ) : (
            <h1 className="text-white font-bold">Companies not found</h1>
          )}
        </div>
      </div>

      <div className=" bg-slate-200 rounded-lg  flex flex-col p-3 gap-4">
        <Button onClick={() => setCreateSkillModal(true)}>Add new skill</Button>
        <div className="grid gap-4 grid-cols-1  lg:grid-cols-3 xl:grid-cols-4">
          {skills?.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-[100%]  max-w-[330px]  bg-slate-950 rounded-lg flex flex-col p-3 gap-4 ">
                  <p className="text-white font-bold">{skill.name}</p>
                  <img
                    src={skill.imageUrl}
                    alt="skill"
                    className="object-cover h-20 w-35"
                  />
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        setSkillToEdit(skill);
                        setEditSkillModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => handleSkillDelete(skill.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-black font-bold">Skills not found</h1>
          )}
        </div>
      </div>
      <EditCompanyModal
        companyToEdit={companyToEdit}
        open={editCompanyModal}
        setOpen={setEditCompanyModal}
        setAlertContent={setAlertContent}
        setAlertDisplay={setAlertDisplay}
        setAlertType={setAlertType}
        setCompanyToEdit={setCompanyToEdit}
        fetchCompanies={fetchCompanies}
      />
      <EditSkillModal
        skillToEdit={skillToEdit}
        open={editSkillModal}
        setOpen={setEditSkillModal}
        setAlertContent={setAlertContent}
        setAlertDisplay={setAlertDisplay}
        setAlertType={setAlertType}
        setSkillToEdit={setSkillToEdit}
        fetchSkills={fetchSkills}
      />

      <CreateSkillModal
        open={createSkillModal}
        setOpen={setCreateSkillModal}
        setAlertContent={setAlertContent}
        setAlertDisplay={setAlertDisplay}
        setAlertType={setAlertType}
        fetchSkills={fetchSkills}
      />
      <CreateCompanyModal
        open={createCommpanyModal}
        setOpen={setCreateCompanyModal}
        setAlertContent={setAlertContent}
        setAlertDisplay={setAlertDisplay}
        setAlertType={setAlertType}
        fetchCompanies={fetchCompanies}
      />
      <AlertInvertedColors
        type={AlertType}
        content={alertContent}
        display={alertDisplay}
        setDisplay={setAlertDisplay}
      />
    </div>
  );
}

export default Profile;
