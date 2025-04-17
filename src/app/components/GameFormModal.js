"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

const GameFormModal = ({
  open,
  onClose,
  editMode = false,
  initialValues = {},
  selectedGame = null,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    coverImage: null,
    coverPreview: "",
    nameImage: null,
    namePreview: "",
    backgroundImage: null,
    backgroundPreview: "",
    choicesCount: "4",
    countdownTimer: "5",
    gameSessionTimer: "60",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open || !initialValues || Object.keys(initialValues).length === 0) return;

    setForm({
      title: initialValues.title || "",
      slug: initialValues.slug || "",
      coverImage: null, // <- only set to file when uploaded
      coverPreview: initialValues.coverImage || "",
      nameImage: null,
      namePreview: initialValues.nameImage || "",
      backgroundImage: null,
      backgroundPreview: initialValues.backgroundImage || "",
      choicesCount: initialValues.choicesCount?.toString() || "4",
      countdownTimer: initialValues.countdownTimer?.toString() || "5",
      gameSessionTimer: initialValues.gameSessionTimer?.toString() || "60",
    });

    setErrors({});
  }, [open, initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setForm((prev) => ({
        ...prev,
        [key]: file,
        [`${key}Preview`]: URL.createObjectURL(file),
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [key]: "Please upload a valid image file",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.slug.trim()) newErrors.slug = "Slug is required";
    if (!form.choicesCount) newErrors.choicesCount = "Option count is required";
    if (!form.countdownTimer) newErrors.countdownTimer = "Countdown time is required";
    if (!form.gameSessionTimer) newErrors.gameSessionTimer = "Quiz time is required";
    if (!editMode && !form.coverImage) newErrors.coverImage = "Cover image is required";
    if (!editMode && !form.nameImage) newErrors.nameImage = "Name image is required";
    if (!editMode && !form.backgroundImage) newErrors.backgroundImage = "Background image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("slug", form.slug);
    payload.append("choicesCount", form.choicesCount);
    payload.append("countdownTimer", form.countdownTimer);
    payload.append("gameSessionTimer", form.gameSessionTimer);

    if (form.coverImage) payload.append("cover", form.coverImage);
    if (form.nameImage) payload.append("name", form.nameImage);
    if (form.backgroundImage) payload.append("background", form.backgroundImage);

    onSubmit(payload, editMode);
  };

  return (
    <Dialog
      key={selectedGame?._id || "create"}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{editMode ? "Update Game" : "Create Game"}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Game Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
          />

          <TextField
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            error={!!errors.slug}
            helperText={errors.slug || "Used in URLs (e.g., 'fun-quiz')"}
            fullWidth
            required
          />

          <TextField
            label="Number of Options"
            name="choicesCount"
            value={form.choicesCount}
            onChange={handleChange}
            select
            fullWidth
          >
            {[2, 3, 4, 5].map((n) => (
              <MenuItem key={n} value={n.toString()}>
                {n}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Countdown Time (seconds before quiz starts)"
            name="countdownTimer"
            type="number"
            value={form.countdownTimer}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Quiz Time (seconds)"
            name="gameSessionTimer"
            type="number"
            value={form.gameSessionTimer}
            onChange={handleChange}
            fullWidth
          />

          {["coverImage", "nameImage", "backgroundImage"].map((key) => {
            const label = key.replace("Image", " Image").toUpperCase();
            const previewSrc =
              editMode && !form[key]
                ? form[key.replace("Image", "Preview")]
                : form[`${key}Preview`];

            return (
              <Box key={key}>
                <Button component="label" variant="outlined">
                  {label}
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, key)}
                  />
                </Button>

                {previewSrc && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      {editMode && !form[key] ? "Current Image:" : "Preview:"}
                    </Typography>
                    <img
                      src={previewSrc}
                      alt={`${key} preview`}
                      style={{ maxHeight: 100, borderRadius: 6 }}
                    />
                  </Box>
                )}

                {errors[key] && (
                  <Typography variant="caption" color="error">
                    {errors[key]}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {editMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameFormModal;
