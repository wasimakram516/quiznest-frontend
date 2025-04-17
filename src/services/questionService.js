import api from "./api";

// ✅ Get all questions for a game
export const getQuestions = async (gameId) => {
  const response = await api.get(`/questions/${gameId}`);
  return response.data.data;
};

// ✅ Add a single question
export const addQuestion = async (gameId, payload) => {
  const response = await api.post(`/questions/${gameId}`, payload);
  return response.data.data;
};

// ✅ Update a question
export const updateQuestion = async (gameId, questionId, payload) => {
  const response = await api.put(`/questions/${gameId}/${questionId}`, payload);
  return response.data.data;
};

// ✅ Delete a question
export const deleteQuestion = async (gameId, questionId) => {
  const response = await api.delete(`/questions/${gameId}/${questionId}`);
  return response.data.data;
};

// ✅ Upload bulk Excel questions
export const uploadExcelQuestions = async (gameId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/questions/upload/${gameId}`, formData);
  return response.data.data;
};

// ✅ Download Excel template
export const downloadTemplate = async (choicesCount, includeHint = false) => {
  const response = await api.get(
    `/questions/sample/download/${choicesCount}?includeHint=${includeHint}`,
    { responseType: "blob" }
  );
  return response;
};
