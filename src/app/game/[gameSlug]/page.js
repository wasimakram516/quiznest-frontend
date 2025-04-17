"use client";

import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useGame } from "@/app/context/GameContext";

export default function GameHomePage() {
  const { game, loading } = useGame();
  const router = useRouter();

  const handleStart = () => {
    router.push(`/game/${game.slug}/name`);
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
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${game.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        px: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          textAlign: "center",
          p: 4,
          maxWidth: 500,
          width: "100%",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3 }}
        >
          {game.title}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          sx={{
            px: 5,
            py: 1.5,
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "30px",
          }}
        >
          Start
        </Button>
      </Paper>
    </Box>
  );
}
