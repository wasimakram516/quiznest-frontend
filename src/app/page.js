"use client";

import { Box, Button, Typography, Container } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Home() {
  const router = useRouter();
  const { language } = useLanguage(); //Language Usage
  const welcomeTranslations = {
    en: {
      welcomeTitle: "Welcome to Quiznest",
      welcomeSubtitle:
        "Build and manage engaging quizzes for your brand or business.",
      ctaButton: "Go to CMS Dashboard",
      poweredBy: "Powered by",
    },
    ar: {
      welcomeTitle: "مرحبًا بكم في كويزنيست",
      welcomeSubtitle: "أنشئ وادرس اختبارات تفاعلية لعلامتك التجارية أو عملك",
      ctaButton: "الذهاب إلى لوحة التحكم",
      poweredBy: "مقدم من",
    },
  };
  return (
    <Box sx={{ position: "relative" }}>
      <LanguageSelector />
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
            {welcomeTranslations[language].welcomeTitle}
          </Typography>

          {/* Subtext */}
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {welcomeTranslations[language].welcomeSubtitle}
          </Typography>

          {/* Action */}
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 4 }}
            onClick={() => router.push("/cms")}
          >
            {welcomeTranslations[language].ctaButton}
          </Button>

          {/* Footer Branding */}
          {/* Brand Logo */}
          <Box sx={{ mt: 3 }}>
            <Box
              component="img"
              src="/WWDS.png"
              alt="WhiteWall Digital Solutions"
              sx={{ width: 200, height: "auto", mb: 1 }}
            />
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {welcomeTranslations[language].poweredBy} {" "}
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
    </Box>
  );
}
