import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6,
      }}
    >
      <Box sx={{ fontSize: 54, mb: 2 }}>❌</Box>
      <Typography color="error" sx={{ mb: 1 }}>
        {message || t('common.error', 'Something went wrong')}
      </Typography>
    </Box>
  );
};

export default Error;
