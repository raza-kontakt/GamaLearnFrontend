import { Snackbar } from '@mui/material';

const SnackbarComponent = ({
  open,
  autoHideDuration,
  onClose,
  message,
}: {
  open: boolean;
  autoHideDuration: number;
  onClose: () => void;
  message: string | null;
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    message={message}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  />
);

export default SnackbarComponent;
