"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useMessage } from "@/app/context/MessageContext";

const ShareGameModal = ({ open, onClose, gameSlug }) => {
  const { showMessage } = useMessage();

  const gameLink = `${typeof window !== "undefined" ? window.location.origin : ""}/game/${gameSlug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(gameLink);
    showMessage("Game link copied to clipboard!", "success");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: "primary.main", color: "white" }}>
        Share Game
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mt: 2 }}>
          Use the following link to share this game:
        </Typography>
        <TextField
          fullWidth
          value={gameLink}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <Tooltip title="Copy to Clipboard">
                <IconButton onClick={handleCopyLink}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareGameModal;
