import api from "./api";

const handleError = (err) => {
  throw err.response?.data?.message || err.message || "An unknown error occurred";
};

// ✅ Get games by business slug
export const getGamesByBusiness = async (slug) => {
  try {
    const response = await api.get(`/games/business/${slug}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Get all games
export const getAllGames = async () => {
  try {
    const response = await api.get("/games");
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Get game by ID
export const getGameById = async (id) => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Get game by slug
export const getGameBySlug = async (gameSlug) => {
  try {
    const response = await api.get(`/games/slug/${gameSlug}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Create new game
export const createGame = async (businessSlug, formData) => {
  try {
    formData.append("businessSlug", businessSlug);
    const response = await api.post("/games", formData);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Update game
export const updateGame = async (id, formData) => {
  try {
    const response = await api.put(`/games/${id}`, formData);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Delete game
export const deleteGame = async (id) => {
  try {
    const response = await api.delete(`/games/${id}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};
