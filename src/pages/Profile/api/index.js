import axiosInstance from "../../../axios";
const ProfileApi = {
  addCompany: async (data) => {
    const res = await axiosInstance.post("/company", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },
  getCompanies: async () => {
    try {
      const res = await axiosInstance.get("/company");
      return res.data.data;
    } catch (error) {}
  },
  deleteCompany: async (id) => {
    const res = await axiosInstance.delete(`/company/${id}`);
    return res.data.data;
  },
  editCompanyName: async (id, data) => {
    const res = await axiosInstance.patch(`/company/${id}`, data);
    return res.data.data;
  },
  editCompanyPhoto: async (id, data) => {
    const res = await axiosInstance.patch(`/company/photo/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  },

  getSkills: async () => {
    const res = await axiosInstance.get("/skill");
    return res.data.data;
  },
  addSkill: async (data) => {
    const res = await axiosInstance.post("/skill", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data;
  },
  deleteSkill: async (id) => {
    const res = await axiosInstance.delete(`/skill/${id}`);
    return res.data.data;
  },
  editSkillName: async (id, data) => {
    const res = await axiosInstance.patch(`/skill/${id}`, data);
    return res.data.data;
  },
  editSkillImage: async (id, data) => {
    const res = await axiosInstance.patch(`/skill/photo/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  },
};

export default ProfileApi;
