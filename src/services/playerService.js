import api from "./api";

// ✅ Join a game
export const joinGame = async (gameId, payload) => {
  const response = await api.post(`/players/${gameId}`, payload);
  return response.data.data;
};

// ✅ Submit player result
export const submitResult = async (playerId, payload) => {
  const response = await api.patch(`/players/${playerId}`, payload);
  return response.data.data;
};

// ✅ Get all players for a game
export const getPlayersByGame = async (gameId) => {
  const response = await api.get(`/players/${gameId}`);
  return response.data.data;
};

// ✅ Get leaderboard for a game
export const getLeaderboard = async (gameId) => {
  const response = await api.get(`/players/leaderboard/${gameId}`);
  return response.data.data;
};

// ✅ Export player results (blob response)
export const exportResults = async (gameId) => {
  const response = await api.get(`/players/export/${gameId}`, {
    responseType: "blob",
  });
  return response;
};
