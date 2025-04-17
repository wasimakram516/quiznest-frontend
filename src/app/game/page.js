"use client";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
      {/* Header */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to QuizNest
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        A customizable quiz experience crafted for businesses and events.
      </Typography>

      {/* Info */}
      <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
        This platform is designed for businesses to engage users with
        interactive quizzes. If you're a player, your admin will provide you
        with a game link to get started.
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
        onClick={() => router.push("/auth/login")}
      >
        Admin Login
      </Button>

      {/* Divider */}
      <Divider sx={{ my: 6 }} />

      {/* About & Contact */}
      <Stack spacing={3} alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          About WhiteWall
        </Typography>

        <Box
          component="img"
          src="/WWDS-logo.png"
          alt="WhiteWall Digital Solutions"
          sx={{
            width: 300,
            height: "auto",
          }}
        />

        <Typography variant="body1" color="text.secondary" textAlign="center">
          We specialize in digital solutions for engagement and interaction.
          <br />
          <strong>QuizNest</strong> is designed and developed by{" "}
          <strong>WhiteWall Digital Solutions, Oman</strong>.
        </Typography>

        {/* Contact */}
        <Stack spacing={1} alignItems="center">
          <Typography variant="h6" fontWeight="medium">
            Contact Us
          </Typography>

          <Typography variant="body2">
            <WhatsAppIcon fontSize="small" sx={{ mr: 1 }} />
            <a href="tel:+96877121757">+968 7712 1757</a>
          </Typography>

          <Typography variant="body2">
            <InstagramIcon fontSize="small" sx={{ mr: 1 }} />
            <a
              href="https://www.instagram.com/whitewall.om"
              target="_blank"
              rel="noopener noreferrer"
            >
              whitewall.om
            </a>
          </Typography>

          <Typography variant="body2">
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            <a href="mailto:solutions@whitewall.om">solutions@whitewall.om</a>
          </Typography>

          <Typography variant="body2">
            🌐{" "}
            <a
              href="https://www.whitewall.om"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.whitewall.om
            </a>
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
