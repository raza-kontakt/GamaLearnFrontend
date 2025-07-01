import { Button, Typography, Box } from "@mui/material";

const GlobalErrorFallback = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    textAlign="center"
    gap={2}
    p={4}
  >
    <Typography variant="h4" color="error">
      Something went wrong
    </Typography>
    <Typography variant="body1" color="text.secondary">
      An unexpected error occurred. Please refresh the page.
    </Typography>
    <Button variant="contained" onClick={() => window.location.reload()}>
      Refresh Page
    </Button>
  </Box>
);

export default GlobalErrorFallback;
