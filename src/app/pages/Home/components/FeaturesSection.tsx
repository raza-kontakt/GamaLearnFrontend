import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  alpha,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import InsightsIcon from '@mui/icons-material/Insights';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
  textAlign: 'center',
  border: 'none',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  padding: theme.spacing(2),
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
  marginBottom: theme.spacing(2),
}));

export const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: t('features.assessments.title'),
      description: t('features.assessments.description'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <TrackChangesIcon fontSize="large" color="primary" />,
      title: t('features.submissions.title'),
      description: t('features.submissions.description'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <InsightsIcon fontSize="large" color="primary" />,
      title: t('features.insights.title'),
      description: t('features.insights.description'),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  return (
    <Container sx={{ py: 10 }} maxWidth="lg">
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 700, mb: 2 }}
        >
          {t('features.title')}
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          {t('features.subtitle')}
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={4}
      >
        {features.map((feature, index) => (
          <Box flex={1} key={index}>
            <FeatureCard>
              <CardContent sx={{ p: 4 }}>
                <IconWrapper>{feature.icon}</IconWrapper>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </FeatureCard>
          </Box>
        ))}
      </Box>
    </Container>
  );
}; 