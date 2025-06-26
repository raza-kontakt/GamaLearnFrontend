import { Box, Container, Typography, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const StatsContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.grey[100],
    0.8
  )} 0%, ${alpha(theme.palette.grey[50], 0.9)} 100%)`,
  padding: theme.spacing(6, 0),
  borderRadius: theme.spacing(3),
  margin: theme.spacing(4, 0),
}));

const stats = [
  { number: '99%', label: 'stats.uptime' },
  { number: '1000+', label: 'stats.students' },
  { number: '24/7', label: 'stats.support' },
];

export const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2 }}>
      <StatsContainer>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={4}
        >
          {stats.map((stat, index) => (
            <Box flex={1} textAlign="center" key={index}>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  mb: 1,
                }}
              >
                {stat.number}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {t(stat.label)}
              </Typography>
            </Box>
          ))}
        </Box>
      </StatsContainer>
    </Container>
  );
}; 