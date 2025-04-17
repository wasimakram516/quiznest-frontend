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
          right: 20, // flipped for RTL
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
          backgroundColor: "rgba(255,255,255,0.3)",
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {game.title}
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
          أهلاً بك{" "}
          <Box component="strong" display="inline">
            {playerInfo.name}
          </Box>{" "}
          هذا ما تحتاج معرفته:
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }} alignItems="flex-end">
          <Stack direction="row-reverse" alignItems="center" spacing={1}>
            <FormatListNumberedIcon color="primary" />
            <Typography>
            عدد الأسئلة:{" "}
              <Box component="strong" display="inline">
                {game.questions.length}
              </Box>
            </Typography>
          </Stack>
          <Stack direction="row-reverse" alignItems="center" spacing={1}>
            <QuizIcon color="primary" />
            <Typography>
            الخيارات المتعددة: {" "}
              <Box component="strong" display="inline">
                {game.choicesCount}
              </Box>
            </Typography>
          </Stack>
          <Stack direction="row-reverse" alignItems="center" spacing={1}>
            <TimerIcon color="primary" />
            <Typography>
            العد التنازلي للبدأ:{" "}
              <Box component="strong" display="inline">
                {game.countdownTimer} ثانية
              </Box>
            </Typography>
          </Stack>
          <Stack direction="row-reverse" alignItems="center" spacing={1}>
            <AccessTimeIcon color="primary" />
            <Typography>
            مدة الإختبار:{" "}
              <Box component="strong" display="inline">
                {game.gameSessionTimer} ثانية
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
          ابدأ اللعبة
        </Button>
      </Paper>
    </Box>
  );
}
