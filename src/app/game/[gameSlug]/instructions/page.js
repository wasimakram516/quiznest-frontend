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

  return (
    <Box
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
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {game.title}
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
          Hi <strong>{playerInfo.name}</strong>, here’s what you need to know:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }} alignItems="flex-start">
          <Stack direction="row" alignItems="center" spacing={1}>
            <FormatListNumberedIcon color="primary" />
            <Typography>
              Total Questions: <strong>{game.questions.length}</strong>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <QuizIcon color="primary" />
            <Typography>
              Choices per Question: <strong>{game.choicesCount}</strong>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TimerIcon color="primary" />
            <Typography>
              Countdown: <strong>{game.countdownTimer} sec</strong>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccessTimeIcon color="primary" />
            <Typography>
              Total Time: <strong>{game.gameSessionTimer} sec</strong>
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
          Start Game
        </Button>
      </Paper>
    </Box>
  );
}
