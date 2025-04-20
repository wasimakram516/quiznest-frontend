import api from "./api";

const handleError = (err) => {
  throw err.response?.data?.message || err.message || "An unknown error occurred";
};

// ✅ Join a game
export const joinGame = async (gameId, payload) => {
  try {
    const response = await api.post(`/players/${gameId}`, payload);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Submit player result
export const submitResult = async (playerId, payload) => {
  try {
    const response = await api.patch(`/players/${playerId}`, payload);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Get all players for a game
export const getPlayersByGame = async (gameId) => {
  try {
    const response = await api.get(`/players/${gameId}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Get leaderboard for a game
export const getLeaderboard = async (gameId) => {
  try {
    const response = await api.get(`/players/leaderboard/${gameId}`);
    return response.data.data;
  } catch (err) {
    handleError(err);
  }
};

// ✅ Export player results (blob response)
export const exportResults = async (gameId) => {
  try {
    const response = await api.get(`/players/export/${gameId}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (err) {
    handleError(err);
  }
};
