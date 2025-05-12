import api from "./api"; // Assuming api.js sets up Axios for API calls

// **Translate API Call**
export const translateText = async (text, targetLang) => {
  try {
    // Check if the text is not empty before making a request
    if (!text) return text; // If no text, return the original text

    const { data } = await api.post("/translate", { text, targetLang });

    // Return the translated text from the backend
    return data.translatedText;
  } catch (error) {
    console.error("Translation failed:", error);
    return text; // Return original text in case of failure
  }
};
