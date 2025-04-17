"use client";

import { Box, Button, Typography, Container } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9f9f9",
        py: 8,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {/* Icon */}
        <DashboardIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />

        {/* Main Title */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to Quiznest
        </Typography>

        {/* Subtext */}
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Build and manage engaging quizzes for your brand or business.
        </Typography>

        {/* Action */}
        <Button
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
          onClick={() => router.push("/cms")}
        >
          Go to CMS Dashboard
        </Button>

        {/* Footer Branding */}
        {/* Brand Logo */}
        <Box sx={{ mt: 3 }}>
          <Box
            component="img"
            src="/WWDS-logo.png"
            alt="WhiteWall Digital Solutions"
            sx={{ width: 200, height: "auto", mb: 1 }}
          />
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block" }}
        >
          Powered by{" "}
          <a
            href="https://www.whitewall.om/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: 600,
            }}
          >
            WhiteWall Digital Solutions, Oman
          </a>
        </Typography>
      </Container>
    </Box>
  );
}
