"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import DashboardCard from "@/app/components/DashboardCard";
import BusinessFormModal from "@/app/components/BusinessFormModal";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";

import {
  getBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
} from "@/services/businessService";

import { useMessage } from "@/app/context/MessageContext";
import BreadcrumbsNav from "@/app/components/BreadcrumbsNav";
import LanguageSelector from "@/app/components/LanguageSelector";
import { useLanguage } from "@/app/context/LanguageContext";

export default function BusinessesPage() {
  const router = useRouter();
  const { showMessage } = useMessage();

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [businessToDelete, setBusinessToDelete] = useState(null);

  const { language } = useLanguage(); //Language Usage
  const fetchBusinesses = async () => {
    try {
      const data = await getBusinesses();
      setBusinesses(data);
    } catch (err) {
      showMessage(err, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const handleOpenCreate = () => {
    setSelectedBusiness(null);
    setEditMode(false);
    setOpenModal(true);
  };

  const handleOpenEdit = (business) => {
    setSelectedBusiness(business);
    setEditMode(true);
    setOpenModal(true);
  };

  const handleSubmitBusiness = async (formData, isEdit) => {
    try {
      if (isEdit) {
        await updateBusiness(selectedBusiness._id, formData);
        showMessage("Business updated!", "success");
      } else {
        await createBusiness(formData);
        showMessage("Business created!", "success");
      }
      setOpenModal(false);
      fetchBusinesses();
    } catch (err) {
      showMessage(err, "error");
    }
  };

  const handleDeleteBusiness = async () => {
    try {
      await deleteBusiness(businessToDelete._id);
      showMessage("Business deleted!", "success");
      fetchBusinesses();
    } catch (err) {
      showMessage(err, "error");
    } finally {
      setConfirmOpen(false);
      setBusinessToDelete(null);
    }
  };
  //Translations
  const businessTranslations = {
    en: {
      allBusinessesTitle: "All Businesses",
      allBusinessesDescription:
        "Manage organizations and configure their associated quiz games.",
      createBusinessButton: "Create Business",
      slugLabel: "Slug:",
      descriptionLabel: "Description:",
      viewGamesButton: "View Games",
      deleteBusinessTitle: "Delete Business?",
      deleteBusinessMessage: "Are you sure you want to delete",
    },
    ar: {
      allBusinessesTitle: "جميع الأعمال",
      allBusinessesDescription:
        "إدارة المؤسسات وتكوين ألعاب الاختبارات المرتبطة بها",
      createBusinessButton: "إنشاء عمل",
      slugLabel: "المعرف:",
      descriptionLabel: "الوصف:",
      viewGamesButton: "عرض الألعاب",
      deleteBusinessTitle: "حذف العمل؟",
      deleteBusinessMessage: "هل أنت متأكد أنك تريد حذف",
    },
  };
  return (
    <Box sx={{ position: "relative" }}>
      <LanguageSelector />
      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Box sx={{ mb: 4 }}>
          {/* Header row with breadcrumbs and language selector */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2, // Add some margin below this row
            }}
          >
            <BreadcrumbsNav />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {businessTranslations[language].allBusinessesTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {businessTranslations[language].allBusinessesDescription}
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddBusinessIcon />}
              onClick={handleOpenCreate}
            >
              {businessTranslations[language].createBusinessButton}
            </Button>
          </Box>

          <Divider sx={{ mt: 2 }} />
        </Box>

        {loading ? (
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {businesses.map((b) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={b._id}>
                <Box
                  sx={{
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    bgcolor: "#fff",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      {b.logoUrl ? (
                        <Box
                          component="img"
                          src={b.logoUrl}
                          alt={`${b.name} logo`}
                          sx={{
                            maxHeight: 80,
                            objectFit: "contain",
                            width: "100%",
                            borderRadius: 1,
                          }}
                        />
                      ) : (
                        <BusinessIcon sx={{ fontSize: 48 }} />
                      )}
                    </Box>

                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {b.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ wordBreak: "break-word" }}
                    >
                      <strong>
                        {businessTranslations[language].slugLabel}
                      </strong>{" "}
                      {b.slug}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ wordBreak: "break-word" }}
                    >
                      <strong>
                        {businessTranslations[language].descriptionLabel}
                      </strong>{" "}
                      {b.description || "—"}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      onClick={() =>
                        router.push(`/cms/businesses/${b.slug}/games`)
                      }
                    >
                      {businessTranslations[language].viewGamesButton}
                    </Button>

                    <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, sm: 0 } }}>
                      <IconButton
                        color="info"
                        onClick={() => handleOpenEdit(b)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          setBusinessToDelete(b);
                          setConfirmOpen(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        <BusinessFormModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          editMode={editMode}
          initialValues={selectedBusiness || {}}
          onSubmit={handleSubmitBusiness}
        />
        <ConfirmationDialog
          open={confirmOpen}
          title={businessTranslations[language].deleteBusinessTitle}
          message={`${businessTranslations[language].deleteBusinessMessage}"${businessToDelete?.name}"?`}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteBusiness}
        />
      </Container>
    </Box>
  );
}
