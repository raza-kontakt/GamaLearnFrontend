import React from 'react';
import {
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface StudentAutocompleteInputProps {
  params: any;
  label: string;
  placeholder: string;
  error?: boolean;
  helperText?: string;
  isLoading: boolean;
  open: boolean;
}

const StudentAutocompleteInput: React.FC<StudentAutocompleteInputProps> = ({
  params,
  label,
  placeholder,
  error,
  helperText,
  isLoading,
  open,
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      {...params}
      label={t(label)}
      placeholder={t(placeholder)}
      error={error}
      helperText={helperText}
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'action.active', fontSize: 20 }} />
          </InputAdornment>
        ),
        endAdornment: (
          <React.Fragment>
            {isLoading && open && (
              <CircularProgress color="inherit" size={20} />
            )}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          paddingLeft: 1,
        },
      }}
    />
  );
};

export default StudentAutocompleteInput; 