import api from "./api";

// ✅ Get games by business slug
export const getGamesByBusiness = async (slug) => {
  const response = await api.get(`/games/business/${slug}`);
  return response.data.data;
};

// ✅ Get all games
export const getAllGames = async () => {
  const response = await api.get("/games");
  return response.data.data;
};

// ✅ Get game by ID
export const getGameById = async (id) => {
  const response = await api.get(`/games/${id}`);
  return response.data.data;
};

// ✅ Get game by slug
export const getGameBySlug = async (gameSlug) => {
  const response = await api.get(`/games/slug/${gameSlug}`);
  return response.data.data;
};

// ✅ Create new game
export const createGame = async (businessSlug, formData) => {
  formData.append("businessSlug", businessSlug);
  const response = await api.post("/games", formData);
  return response.data.data;
};

// ✅ Update game
export const updateGame = async (id, formData) => {
  const response = await api.put(`/games/${id}`, formData);
  return response.data.data;
};

// ✅ Delete game
export const deleteGame = async (id) => {
  const response = await api.delete(`/games/${id}`);
  return response.data.data;
};
