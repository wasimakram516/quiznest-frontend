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

import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

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

  const { language } = useLanguage(); //Language Usage
  const questionsTranslations = {
    en: {
      // Header
      questionsTitle: 'Questions for "{gameTitle}" game',
      questionsDescription:
        "Choices per question: <strong>{choicesCount}</strong> | Countdown: <strong>{countdownTimer}s</strong> | Quiz Time: <strong>{gameSessionTimer}s</strong>",

      // Buttons
      downloadTemplate: "Download Template",
      uploadQuestions: "Upload Questions (.xlsx)",
      addQuestion: "Add Question",

      // Question card
      questionLabel: "Question:",
      optionsLabel: "Options:",
      correctAnswerLabel: "Correct Answer:",
      hintLabel: "Hint:",

      // Modals
      deleteQuestionTitle: "Delete Question?",
      deleteQuestionMessage: "Are you sure you want to delete this question?",
      downloadTemplateTitle: "Download Template",
      numberOptionsLabel: "Number of Options",
      includeHintLabel: "Include Hint Column",
      cancelButton: "Cancel",
      downloadButton: "Download",

      // Tooltips
      editTooltip: "Edit",
      deleteTooltip: "Delete",
    },
    ar: {
      // Header
      questionsTitle: 'أسئلة لعبة "{gameTitle}"',
      questionsDescription:
        "خيارات لكل سؤال: <strong>{choicesCount}</strong> | العد التنازلي: <strong>{countdownTimer}ثانية</strong> | وقت الاختبار: <strong>{gameSessionTimer}ثانية</strong>",

      // Buttons
      downloadTemplate: "تحميل القالب",
      uploadQuestions: "رفع الأسئلة (.xlsx)",
      addQuestion: "إضافة سؤال",

      // Question card
      questionLabel: "السؤال:",
      optionsLabel: "الخيارات:",
      correctAnswerLabel: "الإجابة الصحيحة:",
      hintLabel: "تلميح:",

      // Modals
      deleteQuestionTitle: "حذف السؤال؟",
      deleteQuestionMessage: "هل أنت متأكد أنك تريد حذف هذا السؤال؟",
      downloadTemplateTitle: "تحميل القالب",
      numberOptionsLabel: "عدد الخيارات",
      includeHintLabel: "تضمين عمود التلميح",
      cancelButton: "إلغاء",
      downloadButton: "تحميل",

      // Tooltips
      editTooltip: "تعديل",
      deleteTooltip: "حذف",
    },
  };
  return (
    <Box sx={{ position: "relative" }}>
      <LanguageSelector />
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
                {/* Header row with breadcrumbs and language selector */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2, // Add some margin below this row
                  }}
                >
                  <BreadcrumbsNav />
                 
                </Box>

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
                      {questionsTranslations[language].questionsTitle.replace(
                        "{gameTitle}",
                        game?.title
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: questionsTranslations[
                            language
                          ].questionsDescription
                            .replace("{choicesCount}", game?.choicesCount)
                            .replace("{countdownTimer}", game?.countdownTimer)
                            .replace(
                              "{gameSessionTimer}",
                              game?.gameSessionTimer
                            ),
                        }}
                      />
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
                    {questionsTranslations[language].downloadTemplate}
                  </Button>

                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadFileIcon />}
                  >
                    {questionsTranslations[language].uploadQuestions}
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
                    {questionsTranslations[language].addQuestion}
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
                        <strong>
                          {questionsTranslations[language].questionLabel}
                        </strong>{" "}
                        {q.question}
                      </Typography>

                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{ mb: 0.5 }}
                        >
                          {questionsTranslations[language].optionsLabel}
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
                        <strong>
                          {questionsTranslations[language].correctAnswerLabel}
                        </strong>{" "}
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
                          <strong>
                            {questionsTranslations[language].hintLabel}
                          </strong>{" "}
                          {q.hint}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <Tooltip
                        title={questionsTranslations[language].editTooltip}
                      >
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
                      <Tooltip
                        title={questionsTranslations[language].deleteTooltip}
                      >
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
              title={questionsTranslations[language].deleteQuestionTitle}
              message={questionsTranslations[language].deleteQuestionMessage}
              onClose={() => setConfirmOpen(false)}
              onConfirm={handleDelete}
            />
          </>
        )}
        <Dialog
          open={downloadModalOpen}
          onClose={() => setDownloadModalOpen(false)}
        >
          <DialogTitle>
            {questionsTranslations[language].downloadTemplateTitle}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <FormControl fullWidth>
              <InputLabel>
                {questionsTranslations[language].numberOptionsLabel}
              </InputLabel>
              <Select
                value={downloadChoices}
                onChange={(e) => setDownloadChoices(e.target.value)}
                label={questionsTranslations[language].numberOptionsLabel}
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
              label={questionsTranslations[language].includeHintLabel}
            />
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setDownloadModalOpen(false)}
              variant="outlined"
            >
              {questionsTranslations[language].cancelButton}
            </Button>
            <Button onClick={handleDownload} variant="contained">
              {questionsTranslations[language].downloadButton}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
