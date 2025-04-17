import api from "./api";

// Join a game
export const joinGame = async (gameId, payload) => {
  try {
    const { data } = await api.post(`/players/${gameId}`, payload);
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to join game!";
  }
};

// Submit player result
export const submitResult = async (playerId, payload) => {
  try {
    const { data } = await api.patch(`/players/${playerId}`, payload);
    return data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to submit result!";
  }
};

// Get all players for a game
export const getPlayersByGame = async (gameId) => {
  try {
    const { data } = await api.get(`/players/${gameId}`);
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch players!";
  }
};

// Get leaderboard for a game
export const getLeaderboard = async (gameId) => {
  try {
    const { data } = await api.get(`/players/leaderboard/${gameId}`);
    return data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch leaderboard!";
  }
};

// Export player results
export const exportResults = async (gameId) => {
  try {
    const res = await api.get(`/players/export/${gameId}`, {
      responseType: "blob",
    });
    return res;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to export results!";
  }
};
