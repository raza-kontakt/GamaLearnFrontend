import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userName.trim() || !password.trim()) {
      setError(t("login.fieldsRequired", "All fields are required"));
      return;
    }

    try {
      await login(userName, password);
      navigate("/assessments", { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response?.status === 401) {
        setError(t("login.invalidCredentials", "Invalid username or password"));
      } else if (err.response?.status >= 400 && err.response?.status < 500) {
        setError(
          t("login.clientError", "Please check your credentials and try again")
        );
      } else if (err.response?.status >= 500) {
        setError(
          t("login.serverError", "Server error. Please try again later")
        );
      } else {
        setError(
          t("login.networkError", "Network error. Please check your connection")
        );
      }
    }
  };

  const isFormValid = userName.trim() && password.trim();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            {t("login.title", "Login")}
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label={t("login.username", "Username")}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                if (error) setError(null); // Clear error on input
              }}
              margin="normal"
              fullWidth
              autoComplete="username"
              disabled={isLoading}
              required
            />
            <TextField
              label={t("login.password", "Password")}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(null); // Clear error on input
              }}
              margin="normal"
              fullWidth
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={!isFormValid || isLoading}
              size="large"
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                t("login.submit", "Login")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
