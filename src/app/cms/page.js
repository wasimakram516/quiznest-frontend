"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import QuizIcon from "@mui/icons-material/Quiz";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardCard from "@/app/components/DashboardCard";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import { useAuth } from "@/app/context/AuthContext";
import { logoutUser } from "@/services/authService";
//Language Selection
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CmsDashboard() {
  const { user, setUser } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
const { language } = useLanguage(); //Language Usage

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

//Translations
const translations = {
  en: {
    welcomeTitle: "Welcome to Quiznest CMS",
    welcomeSubtitle: "You have full access to manage businesses and games.",
    welcomeSubtitle2: "You can manage games assigned to your business.",
    businessesHeading: "Businesses",
    businessesDescription: "View and manage all businesses using Quiznest.",
    goToBusinesses: "GO TO BUSINESSES",
    logout: "Logout",
    logoutConfirmation: "Are you sure you want to logout?",
  },
  ar: {
    welcomeTitle: "مرحبًا بكم في نظام إدارة Quiznest",
    welcomeSubtitle: "لديك صلاحية كاملة لإدارة الأعمال والألعاب",
    welcomeSubtitle2: "يمكنك إدارة الألعاب المخصصة لعملك.",
    businessesHeading: "الأعمال",
    businessesDescription: "عرض وإدارة جميع الأعمال باستخدام Quiznest.",
    goToBusinesses: "الذهاب إلى الأعمال",
    logout: "تسجيل الخروج",
    logoutConfirmation: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
  },
};
  return (
    <Box sx={{position:"relative"}}>
      <LanguageSelector />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Box sx={{ mb: 2}}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexWrap="wrap"
            rowGap={2}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {translations[language].welcomeTitle}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.role === "superadmin"
                  ? translations[language].welcomeSubtitle
                  : translations[language].welcomeSubtitle2}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 11, sm: 2 },
                mt:2
              }}
            >
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={() => setLogoutDialogOpen(true)}
                sx={{
                  whiteSpace: "nowrap", 
                }}
              >
                {translations[language].logout}
              </Button>
            </Box>
          </Stack>

          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* CMS Navigation Cards */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <DashboardCard
            title={translations[language].businessesHeading}
            description={translations[language].businessesDescription}
            buttonLabel={translations[language].goToBusinesses}
            icon={<BusinessIcon />}
            color="#1976d2"
            route="/cms/businesses"
          />
        </Grid>

        <ConfirmationDialog
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          onConfirm={handleLogout}
          title={translations[language].logout}
          message={translations[language].logoutConfirmation}
          confirmButtonText={translations[language].logout}
        />
      </Container>
    </Box>
  );
}
