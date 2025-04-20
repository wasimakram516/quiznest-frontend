import api from "./api";

const handleError = (err) => {
  throw err.response?.data?.message || err.message || "An unknown error occurred";
};

// ✅ Get all questions for a game
export const getQuestions = async (gameId) => {
  try {
    const response = await api.get(`/questions/${gameId}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Add a single question
export const addQuestion = async (gameId, payload) => {
  try {
    const response = await api.post(`/questions/${gameId}`, payload);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Update a question
export const updateQuestion = async (gameId, questionId, payload) => {
  try {
    const response = await api.put(`/questions/${gameId}/${questionId}`, payload);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Delete a question
export const deleteQuestion = async (gameId, questionId) => {
  try {
    const response = await api.delete(`/questions/${gameId}/${questionId}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Upload bulk Excel questions
export const uploadExcelQuestions = async (gameId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(`/questions/upload/${gameId}`, formData);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Download Excel template
export const downloadTemplate = async (choicesCount, includeHint = false) => {
  try {
    const response = await api.get(
      `/questions/sample/download/${choicesCount}?includeHint=${includeHint}`,
      { responseType: "blob" }
    );
    return response;
  } catch (err) {
    handleError(err);
  }
};
