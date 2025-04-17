import api from "./api";

// Get games by business slug
export const getGamesByBusiness = async (slug) => {
  const res = await api.get(`/games/business/${slug}`);
  return res.data.data;
};

// Get all games
export const getAllGames = async () => {
  try {
    const { data } = await api.get("/games");
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch games!";
  }
};

// Get game by ID
export const getGameById = async (id) => {
  try {
    const { data } = await api.get(`/games/${id}`);
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch game!";
  }
};

// Get game by slug
export const getGameBySlug = async (gameSlug) => {
  try {
    const { data } = await api.get(`/games/slug/${gameSlug}`);
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch game by slug!";
  }
};

// Create new game
export const createGame = async (businessSlug, formData) => {
  formData.append("businessSlug", businessSlug); 

  const res = await api.post("/games", formData); 
  return res.data;
};


// Update game
export const updateGame = async (id, formData) => {
  try {
    const { data } = await api.put(`/games/${id}`, formData);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to update game!";
  }
};

// Delete game
export const deleteGame = async (id) => {
  try {
    const { data } = await api.delete(`/games/${id}`);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete game!";
  }
};
