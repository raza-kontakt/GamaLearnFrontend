import React from 'react';

export interface PaginationComponentProps {
  count: number;
  page: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  limit: number;
  onLimitChange: (value: number) => void;
}

export interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface LoadingProps {
  message?: string;
}

export interface ErrorProps {
  message?: string;
}

export interface SnackbarProps {
  open: boolean;
  autoHideDuration: number;
  onClose: () => void;
  message: string | null;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface QueryMutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
} 