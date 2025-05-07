"use client";

import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QuizIcon from "@mui/icons-material/Quiz";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TimerIcon from "@mui/icons-material/Timer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGame } from "@/app/context/GameContext";
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

export default function InstructionsPage() {
  const router = useRouter();
  const { game, loading } = useGame();
  const [playerInfo, setPlayerInfo] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("playerInfo");
    if (stored) setPlayerInfo(JSON.parse(stored));
  }, []);

  const handleStart = () => {
    router.push(`/game/${game.slug}/play`);
  };

  if (loading || !game || !playerInfo) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${game?.backgroundImage || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }
  const { language } = useLanguage(); //Language Usage
  const gameInstructionsTranslations = {
    en: {
      welcome: "Welcome",
      instructionsTitle: "Here's what you need to know",
      multipleChoice: "Multiple choices:",
      countdownTimer: "Countdown timer:",
      seconds: "seconds",
      startButton: "Start Game",
      backButton: "Back",
    },
    ar: {
      welcome: "أهلاً بك",
      instructionsTitle: "هذا ما تحتاج معرفته",
      multipleChoice: "الخيارات المتعددة:",
      countdownTimer: "العد التنازلي للبدأ:",
      seconds: "ثانية",
      startButton: "ابدأ اللعبة",
      backButton: "رجوع",
    },
  };
  return (
    <Box sx={{ pos: "relative" }}>
      <LanguageSelector />
      <Box
        dir="rtl"
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${game.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          px: 2,
          position: "relative",
        }}
      >
        {/* زر العودة */}
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
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 600,
            width: "100%",
            textAlign: "center",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255,255,255,0.5)",
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {game.title}
          </Typography>

          <Typography variant="h5" sx={{ mb: 3 }}>
            {gameInstructionsTranslations[language].welcome}{" "}
            <Box component="strong" display="inline">
              {playerInfo.name}
            </Box>{" "}
            {gameInstructionsTranslations[language].instructionsTitle}
          </Typography>

          <Stack spacing={2} sx={{ mb: 4 }} alignItems="flex-end">
            
            <Stack direction="row-reverse" alignItems="center" spacing={1}>
              <QuizIcon color="primary" />
              <Typography variant="h6">
                {gameInstructionsTranslations[language].multipleChoice}{" "}
                <Box component="strong" display="inline">
                  {game.choicesCount}
                </Box>
              </Typography>
            </Stack>
            <Stack direction="row-reverse" alignItems="center" spacing={1}>
              <TimerIcon color="primary" />
              <Typography variant="h6">
                {gameInstructionsTranslations[language].countdownTimer}{" "}
                <Box component="strong" display="inline">
                  {game.countdownTimer}{" "}
                  {gameInstructionsTranslations[language].seconds}
                </Box>
              </Typography>
            </Stack>
            
          </Stack>

          <Button
            variant="contained"
            size="large"
            onClick={handleStart}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "30px",
            }}
          >
            {gameInstructionsTranslations[language].startButton}
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
