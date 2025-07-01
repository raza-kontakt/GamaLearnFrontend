import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ErrorBoundary } from 'react-error-boundary';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
}

const RouteErrorFallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoHome = () => {
    navigate('/', { replace: true });
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        gap={3}
      >
        <Box sx={{ fontSize: 64 }}>🚧</Box>
        
        <Typography variant="h4" component="h1" color="error" fontWeight="bold">
          Page Error
        </Typography>
        
        <Typography variant="body1" color="text.secondary" maxWidth="600px">
          There was an error loading this page. The page you're trying to access 
          may have encountered an unexpected problem.
        </Typography>

        <Typography variant="body2" color="text.disabled" sx={{ fontFamily: 'monospace' }}>
          Current path: {location.pathname}
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            size="large"
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            size="large"
          >
            Go Back
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({ children }) => {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={RouteErrorFallback}
      resetKeys={[location.pathname]}
      onError={(error, errorInfo) => {
        console.error('Route Error:', {
          error,
          errorInfo,
          route: location.pathname,
          timestamp: new Date().toISOString(),
        });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RouteErrorBoundary; 