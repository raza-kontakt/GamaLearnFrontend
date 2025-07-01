import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box, Typography, Button } from "@mui/material";
import { AuthProvider } from "./app/context/AuthContext";
import { ErrorBoundary } from "react-error-boundary";
import "./app/locales/i18n";
import { theme } from "./app/theme/theme";
import GlobalErrorFallback from "./app/components/common/ErrorBoundaryLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo) => {
  console.error("Global Error Boundary:", { error, errorInfo });

  if (process.env.NODE_ENV === "production") {
    // TODO: Send to error tracking service
  }
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallback}
      onError={handleGlobalError}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <App />
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
