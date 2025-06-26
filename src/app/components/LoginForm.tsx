import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!userName.trim() || !password.trim()) {
      setError(t('login.fieldsRequired'));
      return;
    }

    try {
      await login(userName, password);
      navigate('/assessments', { replace: true });
    } catch (err: unknown) {
      console.error(err);
      setError(t('login.error'));
    }
  };

  const isFormValid = userName.trim() && password.trim();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
            {t('login.title')}
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label={t('login.username')}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              fullWidth
              autoComplete="username"
              disabled={isLoading}
            />
            <TextField
              label={t('login.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
              autoComplete="current-password"
              disabled={isLoading}
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
                t('login.submit')
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
