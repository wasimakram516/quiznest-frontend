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
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 8 }}>
        {/* Home Button */}
        <Box sx={{ mb: 2 }}>
          <IconButton onClick={() => router.push("/")} aria-label="Go home">
            <HomeIcon fontSize="medium" />
          </IconButton>
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Admin Login – QuizNest
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
          Please enter your credentials to access the CMS dashboard.
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
            label="Email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
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
            startIcon={!loading && <LoginIcon />}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
