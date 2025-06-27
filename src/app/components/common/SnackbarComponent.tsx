import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { SnackbarProps } from '../../types';

const SnackbarComponent: React.FC<SnackbarProps> = ({
  open,
  autoHideDuration = 6000,
  onClose,
  message,
}) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
