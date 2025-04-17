"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import BreadcrumbsNav from "@/app/components/BreadcrumbsNav";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  uploadExcelQuestions,
  downloadTemplate,
} from "@/services/questionService";
import { getGameBySlug } from "@/services/gameService";

import QuestionFormModal from "@/app/components/QuestionFormModal";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import { useMessage } from "@/app/context/MessageContext";

export default function QuestionsPage() {
  const { businessSlug, gameSlug } = useParams();
  const { showMessage } = useMessage();

  const [game, setGame] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadChoices, setDownloadChoices] = useState(4);
  const [includeHint, setIncludeHint] = useState(false);

  const fetchGameAndQuestions = async () => {
    try {
      const fullGame = await getGameBySlug(gameSlug);
      setGame(fullGame);
      const questionData = await getQuestions(fullGame._id);
      setQuestions(questionData);
    } catch (err) {
      showMessage(err, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameSlug) fetchGameAndQuestions();
  }, [gameSlug]);

  const handleAddEdit = async (values, isEdit) => {
    try {
      if (isEdit) {
        await updateQuestion(game._id, selectedQuestion._id, values);
        showMessage("Question updated!", "success");
      } else {
        await addQuestion(game._id, values);
        showMessage("Question added!", "success");
      }
      setOpenModal(false);
      fetchGameAndQuestions();
    } catch (err) {
      showMessage(err, "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(game._id, selectedQuestion._id);
      showMessage("Question deleted!", "success");
      fetchGameAndQuestions();
    } catch (err) {
      showMessage(err, "error");
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await uploadExcelQuestions(game._id, file);
      showMessage("Questions uploaded!", "success");
      fetchGameAndQuestions();
    } catch (err) {
      showMessage(err, "error");
    }
  };

  const handleDownload = async () => {
    try {
      const res = await downloadTemplate(downloadChoices, includeHint);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `sample-${downloadChoices}.xlsx`);
      document.body.appendChild(link);
      link.click();
      setDownloadModalOpen(false);
    } catch (err) {
      showMessage(err, "error");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              flexWrap: "wrap",
              gap: 2,
              width: "100%",
            }}
          >
            <Box sx={{ mb: 4, width: "100%" }}>
              <BreadcrumbsNav />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  rowGap: 2,
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    Questions for "{game?.title}" game
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choices per question: <strong>{game?.choicesCount}</strong>{" "}
                    | Countdown: <strong>{game?.countdownTimer}s</strong> | Quiz
                    Time: <strong>{game?.gameSessionTimer}s</strong>
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mt: 2 }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                mb: 2,
                width: "100%",
              }}
            >
              {/* Left Side: Download + Upload */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => setDownloadModalOpen(true)}
                >
                  Download Template
                </Button>

                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadFileIcon />}
                >
                  Upload Questions (.xlsx)
                  <input
                    hidden
                    type="file"
                    accept=".xlsx"
                    onChange={handleUpload}
                  />
                </Button>
              </Box>

              {/* Right Side: Add Button aligned right */}
              <Box sx={{ ml: "auto" }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setEditMode(false);
                    setSelectedQuestion(null);
                    setOpenModal(true);
                  }}
                >
                  Add Question
                </Button>
              </Box>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {questions?.map((q, idx) => (
              <Grid item xs={12} sm={6} md={4} key={q._id || idx}>
                <Box
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 2,
                    bgcolor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 300, // ensures consistent height
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      Q{idx + 1}
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>Question:</strong> {q.question}
                    </Typography>

                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ mb: 0.5 }}
                      >
                        Options:
                      </Typography>
                      {q.answers.map((a, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                          sx={{
                            color:
                              i === q.correctAnswerIndex
                                ? "green"
                                : "text.secondary",
                          }}
                        >
                          {String.fromCharCode(65 + i)}. {a}
                        </Typography>
                      ))}
                    </Box>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Correct Answer:</strong>{" "}
                      <span style={{ color: "green" }}>
                        {String.fromCharCode(65 + q.correctAnswerIndex)}.{" "}
                        {q.answers[q.correctAnswerIndex]}
                      </span>
                    </Typography>

                    {q.hint && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        <strong>Hint:</strong> {q.hint}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        color="info"
                        onClick={() => {
                          setSelectedQuestion(q);
                          setEditMode(true);
                          setOpenModal(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedQuestion(q);
                          setConfirmOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <QuestionFormModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            editMode={editMode}
            initialValues={selectedQuestion}
            onSubmit={(values) => handleAddEdit(values, editMode)}
            optionCount={game?.choicesCount}
          />

          <ConfirmationDialog
            open={confirmOpen}
            title="Delete Question?"
            message={`Are you sure you want to delete this question?`}
            onClose={() => setConfirmOpen(false)}
            onConfirm={handleDelete}
          />
        </>
      )}
      <Dialog
        open={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      >
        <DialogTitle>Download Template</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <FormControl fullWidth>
            <InputLabel>Number of Options</InputLabel>
            <Select
              value={downloadChoices}
              onChange={(e) => setDownloadChoices(e.target.value)}
              label="Number of Options"
            >
              {[2, 3, 4, 5].map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={includeHint}
                onChange={(e) => setIncludeHint(e.target.checked)}
              />
            }
            label="Include Hint Column"
          />
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDownloadModalOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleDownload} variant="contained">
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
