import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        textAlign: 'center',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          component="h1"
          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}
        >
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          {t('notFound.title')}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t('notFound.message')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/')}
        >
          {t('notFound.button')}
        </Button>
      </Container>
    </Box>
  );
}

export default NotFound;
