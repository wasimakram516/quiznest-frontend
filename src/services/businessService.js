import api from "./api";

// Helper function to handle errors from API responses
const handleError = (err) => {
  throw err.response?.data?.message || err.message || "An unknown error occurred";
};

// ✅ Get all businesses
export const getBusinesses = async () => {
  try {
    const response = await api.get("/businesses");
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Get a business by slug
export const getBusinessBySlug = async (slug) => {
  try {
    const response = await api.get(`/businesses/${slug}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Create new business
export const createBusiness = async (formData) => {
  try {
    const response = await api.post("/businesses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Update business
export const updateBusiness = async (id, formData) => {
  try {
    const response = await api.put(`/businesses/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Delete business
export const deleteBusiness = async (id) => {
  try {
    const response = await api.delete(`/businesses/${id}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};
