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
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

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
  const { language } = useLanguage(); //Language Usage
  const gameStartTranslations = {
    en: {
      startButton: "Start Game",
    },
    ar: {
      startButton: "بدء اللعبة",
    },
  };
  return (
    <Box sx={{ position: "relative" }}>
      <LanguageSelector />
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
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 4,
            marginTop: "30vh",
          }}
        >
          <Typography
            variant="h3"
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
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderRadius: "30px",
            }}
          >
            {gameStartTranslations[language].startButton}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
