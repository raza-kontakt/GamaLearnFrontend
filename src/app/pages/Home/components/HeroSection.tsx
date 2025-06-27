import { Box, Button, Container, Typography, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const HeroSectionWrapper = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: "white",
  padding: theme.spacing(12, 0),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, ${alpha(
      theme.palette.secondary.main,
      0.1
    )} 0%, transparent 50%)`,
  },
}));

export const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <HeroSectionWrapper>
      <Container maxWidth="lg">
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {t("hero.title")}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            {t("hero.subtitle")}
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
              color: "primary.main",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              "&:hover": {
                background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
                transform: "translateY(-2px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            {t("hero.cta")}
          </Button>
        </Box>
      </Container>
    </HeroSectionWrapper>
  );
};
