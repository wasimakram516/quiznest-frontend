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

export default function CmsDashboard() {
  const { user, setUser } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexWrap="wrap"
          rowGap={2}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Welcome to Quiznest CMS
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.role === "superadmin"
                ? "You have full access to manage businesses and games."
                : "You can manage games assigned to your business."}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={() => setLogoutDialogOpen(true)}
          >
            Logout
          </Button>
        </Stack>

        <Divider sx={{ mt: 3 }} />
      </Box>

      {/* CMS Navigation Cards */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <DashboardCard
          title="Businesses"
          description="View and manage all businesses using Quiznest."
          buttonLabel="Go to Businesses"
          icon={<BusinessIcon />}
          color="#1976d2"
          route="/cms/businesses"
        />
      </Grid>

      <ConfirmationDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
        title="Log Out?"
        message="Are you sure you want to log out of the CMS?"
        confirmButtonText="Logout"
      />
    </Container>
  );
}
