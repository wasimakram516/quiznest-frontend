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
          elevation={6}
          sx={{
            textAlign: "center",
            p: { xs: 3, sm: 4 },
            maxWidth: 480,
            width: "100%",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderRadius: 6,
            mt: { xs: 10, sm: "15vh" },
            mx: "auto",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            sx={{ mb: 3, color: "primary.main", textTransform: "capitalize" }}
          >
            {game.title}
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            sx={{
              px: 6,
              py: 2,
              fontSize: "1.25rem",
              fontWeight: 600,
              borderRadius: 8,
              textTransform: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
              },
            }}
          >
            {gameStartTranslations[language].startButton}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
