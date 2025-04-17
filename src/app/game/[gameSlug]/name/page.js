"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGame } from "@/app/context/GameContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { joinGame } from "@/services/playerService";

export default function NamePage() {
  const { game, loading } = useGame();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name.trim() || submitting) return;

    try {
      setSubmitting(true);
      const response = await joinGame(game._id, form);

      // Store for later use
      localStorage.setItem("playerInfo", JSON.stringify(form));
      localStorage.setItem("playerId", response.playerId);

      router.push(`/game/${game.slug}/instructions`);

    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !game) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${game.nameImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position:"absolute",
        px: 2,
      }}
    >
        {/* Back Button */}
      <IconButton
        onClick={() => router.push(`/game/${game.slug}`)}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {game.title}
        </Typography>

        <TextField
          label="الاسم"
          fullWidth
          required
          sx={{ my: 2 }}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="اسم الشركة"
          fullWidth
          sx={{ mb: 2 }}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          disabled={submitting}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "30px",
          }}
        >
          {submitting ? <CircularProgress size={24} color="inherit" /> : "ابدأ"}
        </Button>

        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
