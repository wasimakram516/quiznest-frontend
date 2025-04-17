import api from "./api";

// ✅ Get all businesses
export const getBusinesses = async () => {
  const response = await api.get("/businesses");
  return response.data.data;
};

// ✅ Get a business by slug
export const getBusinessBySlug = async (slug) => {
  const response = await api.get(`/businesses/${slug}`);
  return response.data.data;
};

// ✅ Create new business
export const createBusiness = async (formData) => {
  const response = await api.post("/businesses", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
  return response.data.data;
};

// ✅ Update business
export const updateBusiness = async (id, formData) => {
  const response = await api.put(`/businesses/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  
  return response.data.data;
};

// ✅ Delete business
export const deleteBusiness = async (id) => {
  const response = await api.delete(`/businesses/${id}`);
  return response.data.data;
};
