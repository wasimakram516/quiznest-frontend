"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import { useAuth } from "@/app/context/AuthContext";
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(form.email, form.password);
      setUser(response.user);
      router.push("/cms");
    } catch (err) {
      setError(loginTranslations[language].invalidCredentials);
    } finally {
      setLoading(false);
    }
  };
  const { language } = useLanguage(); //Language Usage
  const loginTranslations = {
    en: {
      title: "Admin Login – QuizNest",
      description: "Please enter your credentials to access the CMS dashboard.",
      emailLabel: "Email",
      passwordLabel: "Password",
      loginButton: "Login",
      loggingIn: "Logging in...",
      invalidCredentials: "Invalid credentials. Please try again.",
      homeButton: "Go home",
    },
    ar: {
      title: "تسجيل دخول المسؤول – كويزنيست",
      description:
        "الرجاء إدخال بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم.",
      emailLabel: "البريد الإلكتروني",
      passwordLabel: "كلمة المرور",
      loginButton: "تسجيل الدخول",
      loggingIn: "جارٍ تسجيل الدخول...",
      invalidCredentials: "بيانات الاعتماد غير صالحة. يرجى المحاولة مرة أخرى.",
      homeButton: "العودة للصفحة الرئيسية",
    },
  };
  return (
    <Box sx={{ position: "relative" }}>
      <LanguageSelector />
      <Container maxWidth="sm">
        <Paper elevation={4} sx={{ p: 4, mt: 8 }}>
          {/* Home Button */}
          <Box sx={{ mb: 2 }}>
            <IconButton
              onClick={() => router.push("/")}
              aria-label={loginTranslations[language].homeButton}
            >
              <HomeIcon fontSize="medium" />
            </IconButton>
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{ direction: language === "ar" ? "rtl" : "ltr" }}
          >
            {loginTranslations[language].title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 2 }}
          >
            {loginTranslations[language].description}
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              label={loginTranslations[language].emailLabel}
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label={loginTranslations[language].passwordLabel}
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <LoginIcon />
                )
              }
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading
                ? loginTranslations[language].loggingIn
                : loginTranslations[language].loginButton}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
