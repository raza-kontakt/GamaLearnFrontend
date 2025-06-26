import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Box sx={{ fontSize: 54, mb: 2 }}>📦</Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {t('dashboard.noAssessments', 'Not found')}
      </Typography>
      <Typography variant="body2">{message}</Typography>
    </Box>
  );
};

export default NotFound;
