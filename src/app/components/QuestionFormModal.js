"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useState, useEffect } from "react";

const QuestionFormModal = ({
  open,
  onClose,
  editMode = false,
  initialValues = {},
  onSubmit,
  optionCount = 4,
}) => {
  const [form, setForm] = useState({
    question: "",
    answers: Array(optionCount).fill(""),
    correctAnswerIndex: 0,
    hint: "",
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      question: initialValues?.question || "",
      answers: initialValues?.answers || Array(optionCount).fill(""),
      correctAnswerIndex: initialValues?.correctAnswerIndex ?? 0,
      hint: initialValues?.hint || "",
    });
  }, [open, initialValues, optionCount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...form.answers];
    updated[index] = value;
    setForm((prev) => ({ ...prev, answers: updated }));
  };

  const handleSubmit = () => {
    if (!form.question || form.answers.some((a) => !a)) return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editMode ? "Edit Question" : "Add Question"}</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Question"
          name="question"
          value={form.question}
          onChange={handleChange}
          fullWidth
          required
        />

        {form.answers.map((ans, idx) => (
          <TextField
            key={idx}
            label={`Option ${String.fromCharCode(65 + idx)}`}
            value={ans}
            onChange={(e) => handleAnswerChange(idx, e.target.value)}
            fullWidth
            required
          />
        ))}

<FormControl fullWidth>
  <InputLabel>Correct Answer</InputLabel>
  <Select
    value={form.correctAnswerIndex}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        correctAnswerIndex: parseInt(e.target.value),
      }))
    }
    label="Correct Answer"
  >
    {form.answers.map((ans, i) => (
      <MenuItem key={i} value={i}>
        {String.fromCharCode(65 + i)}. {ans || "(empty)"}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        <TextField
          label="Hint (optional)"
          name="hint"
          value={form.hint}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editMode ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionFormModal;
