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
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

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
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("slug", form.slug);
      payload.append("description", form.description);
      if (form.logoFile) {
        payload.append("logo", form.logoFile);
      }

      await onSubmit(payload, editMode);
    } finally {
      setLoading(false);
    }
  };
  const { language } = useLanguage(); //Language Usage
  const businessFormTranslations = {
    en: {
      titles: {
        update: "Update Business",
        create: "Create Business",
      },
      labels: {
        name: "Business Name",
        slug: "Slug",
        slugHelper: "Used in URLs (e.g., 'oabc')",
        description: "Description",
        uploadLogo: "Upload Logo",
        preview: "Preview:",
      },
      buttons: {
        cancel: "Cancel",
        update: "Update",
        creating: "Creating...",
        updating: "Updating...",
        create: "Create",
      },
    },
    ar: {
      titles: {
        update: "تحديث العمل",
        create: "إنشاء عمل",
      },
      labels: {
        name: "اسم العمل",
        slug: "المعرف",
        slugHelper: "يستخدم في الروابط (مثال: 'oabc')",
        description: "الوصف",
        uploadLogo: "رفع الشعار",
        preview: "معاينة:",
      },
      buttons: {
        cancel: "إلغاء",
        update: "تحديث",
        creating: "جاري الإنشاء...",
        updating: "جاري التحديث...",
        create: "إنشاء",
      },
    },
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editMode
          ? businessFormTranslations[language].titles.update
          : businessFormTranslations[language].titles.create}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label={businessFormTranslations[language].labels.name}
            name="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
          />
          <TextField
            label={businessFormTranslations[language].labels.slug}
            name="slug"
            value={form.slug}
            onChange={handleChange}
            error={!!errors.slug}
            helperText={
              errors.slug ||
              businessFormTranslations[language].labels.slugHelper
            }
            fullWidth
            required
          />
          <TextField
            label={businessFormTranslations[language].labels.description}
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <Button component="label" variant="outlined">
            {businessFormTranslations[language].labels.uploadLogo}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {form.logoPreview && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                {businessFormTranslations[language].labels.preview}
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
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          disabled={loading}
        >
          {businessFormTranslations[language].buttons.cancel}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading
            ? (editMode
              ? businessFormTranslations[language].buttons.updating
              : businessFormTranslations[language].buttons.creating)
            : (editMode
            ? businessFormTranslations[language].buttons.update
            : businessFormTranslations[language].buttons.create)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BusinessFormModal;
