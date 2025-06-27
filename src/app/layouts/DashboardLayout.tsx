import { Link, Navigate, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardLayout = () => {
  const { t, i18n } = useTranslation();
  const { isLoggedIn, isLoading, logout } = useAuth();

  const handleLanguageSwitch = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = i18n.dir(newLang);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: unknown) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <AppBar position="fixed" sx={{ borderRadius: 0, zIndex: 9 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            <span style={{ marginRight: 4 }}>📚</span>{" "}
            {t("dashboard.headerTitle")}
          </Typography>
          <Button color="inherit" component={Link} to="/assessments">
            {t("dashboard.menu.assessments")}
          </Button>
          <Button color="inherit" onClick={handleLanguageSwitch}>
            {i18n.language === "en" ? "العربية" : "English"}
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ ml: 1 }}
          >
            {t("common.logout")}
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
