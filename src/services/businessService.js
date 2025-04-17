import api from "./api";

// Get all businesses
export const getBusinesses = async () => {
  try {
    const { data } = await api.get("/businesses");
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch businesses!";
  }
};

// Get a business by slug
export const getBusinessBySlug = async (slug) => {
  try {
    const { data } = await api.get(`/businesses/${slug}`);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch business!";
  }
};

// Create new business
export const createBusiness = async (formData) => {
  try {
    const { data } = await api.post("/businesses", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to create business!";
  }
};

// Update business
export const updateBusiness = async (id, formData) => {
  try {
    const { data } = await api.put(`/businesses/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to update business!";
  }
};

// Delete business
export const deleteBusiness = async (id) => {
  try {
    const { data } = await api.delete(`/businesses/${id}`);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete business!";
  }
};
