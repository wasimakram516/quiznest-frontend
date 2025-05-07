import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };
  const { language } = useLanguage(); //Language Usage
   const confirmationDialogTranslations = {
     en: {
       cancelButton: "Cancel",
       confirmButton: "Yes",
       processingText: "Processing...",
     },
     ar: {
       cancelButton: "إلغاء",
       confirmButton: "نعم",
       processingText: "جاري المعالجة...",
     },
   };
  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 2,
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#f9fafb",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#333",
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            textAlign: "center",
            margin: "1rem 0",
          }}
        >
          <DialogContentText
            sx={{
              fontSize: "1rem",
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            {message}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          paddingBottom: "1rem",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          disabled={loading}
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "0.5rem 2rem",
          }}
        >
          {confirmationDialogTranslations[language].cancelButton}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            padding: "0.5rem 2rem",
          }}
        >
          {loading
            ? confirmationDialogTranslations[language].processingText
            : confirmButtonText ||
              confirmationDialogTranslations[language].confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
