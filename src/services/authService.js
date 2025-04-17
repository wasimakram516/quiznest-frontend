import api from "./api";

// Store only access token, refresh token stays in cookies
export const getAccessToken = () => sessionStorage.getItem("accessToken");
export const setAccessToken = (accessToken) => sessionStorage.setItem("accessToken", accessToken);
export const setUser = (user) => sessionStorage.setItem("user", JSON.stringify(user));
export const clearTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("user");
};

// **Login API Call**
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });

  // ✅ Correct handling
  setAccessToken(data.data.accessToken);
  setUser(data.data.user);
  
  return data.data;
};

// **Refresh Access Token Using Secure Cookie**
export async function refreshToken() {
  try {
    const { data } = await api.get("/auth/refresh"); 
    setAccessToken(data.data.accessToken);
    return data.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw new Error("Failed to refresh token");
  }
}

// **Logout API Call**
export async function logoutUser() {
  try {
    await api.post("/auth/logout"); // Backend will clear the refresh token cookie
  } catch (error) {
    console.error("Failed to logout on the server:", error);
  } finally {
    clearTokens();
    
    // ✅ Prevent multiple redirects
    if (window.location.pathname !== "/auth/login") {
      window.location.href = "/auth/login";
    }
  }
}
