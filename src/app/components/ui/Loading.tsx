import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>
        {message || t('common.loading', 'Loading...')}
      </Typography>
    </Box>
  );
};

export default Loading; 