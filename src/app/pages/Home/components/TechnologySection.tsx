import { Box, Container, Typography, Chip, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const TechChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(3),
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  '&:hover': {
    background: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.main,
      0.2
    )} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
  },
}));

const technologies = [
  'React',
  'TypeScript',
  'Material UI',
  'React Query',
  'i18next',
  'Node.js',
  'Prisma',
  'SQLite',
];

export const TechnologySection = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
          {t('tech.poweredBy')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {technologies.map((tech) => (
            <TechChip key={tech} label={tech} variant="outlined" />
          ))}
        </Box>
      </Box>
    </Container>
  );
}; 