import api from "./api";

// Get all questions for a game
export const getQuestions = async (gameId) => {
  try {
    const { data } = await api.get(`/questions/${gameId}`);
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch questions!";
  }
};

// Add a single question
export const addQuestion = async (gameId, payload) => {
  try {
    const { data } = await api.post(`/questions/${gameId}`, payload);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to add question!";
  }
};

// Update a question
export const updateQuestion = async (gameId, questionId, payload) => {
  try {
    const { data } = await api.put(`/questions/${gameId}/${questionId}`, payload);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to update question!";
  }
};

// Delete a question
export const deleteQuestion = async (gameId, questionId) => {
  try {
    const { data } = await api.delete(`/questions/${gameId}/${questionId}`);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete question!";
  }
};

// Upload bulk Excel questions
export const uploadExcelQuestions = async (gameId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(`/questions/upload/${gameId}`, formData);

    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to upload questions!";
  }
};

// Download Excel template
export const downloadTemplate = async (choicesCount, includeHint = false) => {
  try {
    const res = await api.get(
      `/questions/sample/download/${choicesCount}?includeHint=${includeHint}`,
      { responseType: "blob" }
    );
    return res;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to download template!";
  }
};
