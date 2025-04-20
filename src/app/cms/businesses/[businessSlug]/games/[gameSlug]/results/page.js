"use client";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BusinessIcon from "@mui/icons-material/Business";
import ScoreIcon from "@mui/icons-material/Score";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BreadcrumbsNav from "@/app/components/BreadcrumbsNav";
import { getGameBySlug } from "@/services/gameService";
import { exportResults, getLeaderboard } from "@/services/playerService";
import { useMessage } from "@/app/context/MessageContext";

export default function ResultsPage() {
  const { businessSlug, gameSlug } = useParams();
  const { showMessage } = useMessage();

  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGameAndResults = async () => {
    try {
      const fullGame = await getGameBySlug(gameSlug);
      setGame(fullGame);
      const leaderboard = await getLeaderboard(fullGame._id);
      setPlayers(leaderboard);
    } catch (err) {
      showMessage(err, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportResults(game._id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${game.slug}-results.xlsx`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url); 
    } catch (err) {
      showMessage(err, "error");
    }
  };
  
  useEffect(() => {
    if (gameSlug) fetchGameAndResults();
  }, [gameSlug]);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 4 }}>
            <BreadcrumbsNav />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                rowGap: 2,
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Results for "{game?.title}"
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Players: <strong>{players?.length}</strong>
                </Typography>
              </Box>

              <Tooltip title="Export Results">
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                >
                  Export Results
                </Button>
              </Tooltip>
            </Box>
            <Divider sx={{ mt: 2 }} />
          </Box>

          <Grid container spacing={3}>
            {players.map((p, i) => (
              <Grid item xs={12} sm={6} md={4} key={p._id || i}>
                <Box
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 3,
                    background: "#fdfefe",
                    boxShadow: 2,
                    width: "350px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s ease",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {/* Rank */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    {i < 3 && (
                      <EmojiEventsIcon
                        color={
                          i === 0 ? "warning" : i === 1 ? "secondary" : "info"
                        }
                        sx={{ mr: 1 }}
                      />
                    )}
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary.main"
                      noWrap
                    >
                      #{i + 1} • {p.name}
                    </Typography>
                  </Box>

                  {/* Details */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {p.company && (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BusinessIcon
                          fontSize="small"
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {p.company}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ScoreIcon
                        fontSize="small"
                        sx={{ mr: 1, color: "primary.main" }}
                      />
                      <Typography variant="body2">
                        Score: <strong>{p.score}</strong>
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTimeIcon
                        fontSize="small"
                        sx={{ mr: 1, color: "primary.main" }}
                      />
                      <Typography variant="body2">
                        Time Taken: <strong>{p.timeTaken}s</strong>
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EditNoteIcon
                        fontSize="small"
                        sx={{ mr: 1, color: "primary.main" }}
                      />
                      <Typography variant="body2">
                        Attempted: <strong>{p.attemptedQuestions}</strong>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
