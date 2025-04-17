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
} from "@mui/material";
import { useState, useEffect } from "react";

const BusinessFormModal = ({
  open,
  onClose,
  editMode = false,
  initialValues = {},
  onSubmit,
}) => {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    logoFile: null,
    logoPreview: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({
        name: initialValues.name || "",
        slug: initialValues.slug || "",
        description: initialValues.description || "",
        logoFile: null,
        logoPreview: initialValues.logoUrl || "",
      });
      setErrors({});
    }
  }, [open]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate as user types
    if (name === "name" && value.trim()) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    if (name === "slug") {
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, slug: "Slug is required" }));
      } else if (!/^[a-z0-9-]+$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          slug: "Only lowercase letters, numbers, and hyphens allowed",
        }));
      } else {
        setErrors((prev) => ({ ...prev, slug: "" }));
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setForm((prev) => ({
        ...prev,
        logoFile: file,
        logoPreview: URL.createObjectURL(file),
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        logoFile: "Please upload a valid image file",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.slug.trim()) {
      newErrors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(form.slug)) {
      newErrors.slug = "Only lowercase letters, numbers, and hyphens allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("slug", form.slug);
    payload.append("description", form.description);
    if (form.logoFile) {
      payload.append("logo", form.logoFile);
    }

    onSubmit(payload, editMode);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editMode ? "Update Business" : "Create Business"}</DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Business Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
          <TextField
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            error={!!errors.slug}
            helperText={errors.slug || "Used in URLs (e.g., 'oabc')"}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Button component="label" variant="outlined">
            Upload Logo
            <input hidden type="file" accept="image/*" onChange={handleFileChange} />
          </Button>

          {form.logoPreview && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Preview:
              </Typography>
              <img
                src={form.logoPreview}
                alt="Logo Preview"
                style={{ maxHeight: 100, borderRadius: 6 }}
              />
            </Box>
          )}

          {errors.logoFile && (
            <Typography variant="caption" color="error">
              {errors.logoFile}
            </Typography>
          )}
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

export default BusinessFormModal;
