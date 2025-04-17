"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizIcon from "@mui/icons-material/Quiz";
import ShareIcon from "@mui/icons-material/Share";
import ShareGameModal from "@/app/components/ShareGameModal";

import GameFormModal from "@/app/components/GameFormModal";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";

import {
  getGamesByBusiness,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "@/services/gameService";

import { useMessage } from "@/app/context/MessageContext";
import BreadcrumbsNav from "@/app/components/BreadcrumbsNav";
import { getBusinessBySlug } from "@/services/businessService";

export default function GamesPage() {
  const router = useRouter();
  const { businessSlug } = useParams();
  const { showMessage } = useMessage();

  const [games, setGames] = useState([]);
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [gameToShare, setGameToShare] = useState(null);

  const fetchGames = async () => {
    try {
      const data = await getGamesByBusiness(businessSlug);
      setGames(data);
      const res = await getBusinessBySlug(businessSlug);
      setBusiness(res.data)
    } catch (err) {
      showMessage(err, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (businessSlug) fetchGames();
  }, [businessSlug]);

  const handleOpenCreate = () => {
    setSelectedGame(null);
    setEditMode(false);
    setOpenModal(true);
  };

  const handleOpenEdit = async (game) => {
    try {
      const fullGame = await getGameById(game._id);
      setSelectedGame(fullGame);
      setEditMode(true);
      setOpenModal(true);
    } catch (err) {
      showMessage("Failed to fetch game details", "error");
    }
  };

  const handleSubmitGame = async (formData, isEdit) => {
    try {
      if (isEdit) {
        await updateGame(selectedGame._id, formData);
        showMessage("Game updated!", "success");
      } else {
        await createGame(businessSlug, formData);
        showMessage("Game created!", "success");
      }
      setOpenModal(false);
      fetchGames();
    } catch (err) {
      showMessage(err, "error");
    }
  };

  const handleDeleteGame = async () => {
    try {
      await deleteGame(gameToDelete._id);
      showMessage("Game deleted!", "success");
      fetchGames();
    } catch (err) {
      showMessage(err, "error");
    } finally {
      setConfirmOpen(false);
      setGameToDelete(null);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
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
              Games for "{business?.name}"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage all quiz games created for this business.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            Create Game
          </Button>
        </Box>

        <Divider sx={{ mt: 2 }} />
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {games.map((g) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={g._id}>
              <Box
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: "#fff",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {g.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ wordBreak: "break-word" }}
                  >
                    <strong>Slug:</strong> {g.slug}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Option Count:</strong> {g.choicesCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Countdown Timer:</strong> {g.countdownTimer} sec
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Quiz Time:</strong> {g.gameSessionTimer} sec
                  </Typography>

                  {["coverImage", "nameImage", "backgroundImage"].map(
                    (imgKey) => (
                      <Box key={imgKey} sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {imgKey.replace("Image", " Image")}:
                        </Typography>
                        <Box
                          component="img"
                          src={g[imgKey]}
                          alt={imgKey}
                          sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 140,
                            objectFit: "cover",
                            borderRadius: 1,
                            mt: 0.5,
                          }}
                        />
                      </Box>
                    )
                  )}
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<QuizIcon />}
                    onClick={() =>
                      router.push(
                        `/cms/businesses/${businessSlug}/games/${g.slug}`
                      )
                    }
                  >
                    Questions
                  </Button>

                  <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, sm: 0 } }}>
                    <IconButton color="info" onClick={() => handleOpenEdit(g)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setGameToDelete(g);
                        setConfirmOpen(true);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setGameToShare(g);
                        setShareModalOpen(true);
                      }}
                    >
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <ShareGameModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        gameSlug={gameToShare?.slug}
      />

      <GameFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        editMode={editMode}
        initialValues={selectedGame || {}}
        selectedGame={selectedGame || null}
        onSubmit={handleSubmitGame}
      />

      <ConfirmationDialog
        open={confirmOpen}
        title="Delete Game?"
        message={`Are you sure you want to delete "${gameToDelete?.title}"?`}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteGame}
      />
    </Container>
  );
}
