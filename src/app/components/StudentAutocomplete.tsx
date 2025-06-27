import React, { useState, useCallback } from 'react';
import {
  Autocomplete,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { searchStudents, StudentSearchResult } from '../data-layer/submissions';
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY, QUERY_STALE_TIME } from '../constants';
import StudentAutocompleteOption from './student/StudentAutocompleteOption';
import StudentAutocompleteInput from './student/StudentAutocompleteInput';

interface StudentAutocompleteProps {
  assessmentId: string;
  value: StudentSearchResult | null;
  onSelectionChange: (student: StudentSearchResult | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
}

const StudentAutocomplete: React.FC<StudentAutocompleteProps> = ({
  assessmentId,
  value,
  onSelectionChange,
  label = 'Student Name',
  placeholder = 'Search by student name...',
  disabled = false,
  error = false,
  helperText,
  size = 'small',
  fullWidth = true,
}) => {
  const { t, i18n } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(inputValue, DEBOUNCE_DELAY);

  const {
    data: students = [],
    isLoading,
    error: searchError,
  } = useQuery({
    queryKey: [
      'searchStudents',
      assessmentId,
      debouncedSearchTerm,
      i18n.language,
    ],
    queryFn: () =>
      searchStudents({
        assessmentId,
        searchTerm: debouncedSearchTerm,
        limit: 10,
        lang: i18n.language,
      }),
    enabled:
      !!assessmentId &&
      !!debouncedSearchTerm &&
      debouncedSearchTerm.length >= 2,
    staleTime: QUERY_STALE_TIME.MEDIUM,
  });

  const handleInputChange = useCallback(
    (event: React.SyntheticEvent, newInputValue: string) => {
      setInputValue(newInputValue);
      if (newInputValue.length >= 2) {
        setOpen(true);
      }
    },
    []
  );

  const handleSelectionChange = useCallback(
    (event: React.SyntheticEvent, newValue: StudentSearchResult | null) => {
      onSelectionChange(newValue);
      if (newValue) {
        setInputValue(newValue.fullName);
        setOpen(false);
      }
    },
    [onSelectionChange]
  );

  const renderOption = (props: any, option: StudentSearchResult) => (
    <StudentAutocompleteOption option={option} props={props} />
  );

  const renderInput = (params: any) => (
    <StudentAutocompleteInput
      params={params}
      label={label}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      isLoading={isLoading}
      open={open}
    />
  );

  const getNoOptionsText = (): string => {
    if (debouncedSearchTerm.length < 2) {
      return t('students.typeToSearch', 'Type at least 2 characters to search');
    }
    if (isLoading) {
      return t('common.loading', 'Loading...');
    }
    if (searchError) {
      return t('students.searchError', 'Error searching students');
    }
    return t('students.noResults', 'No students found');
  };

  const LoadingText = () => (
    <Box display="flex" alignItems="center" justifyContent="center" py={2}>
      <CircularProgress size={20} sx={{ mr: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {t('students.searching', 'Searching students...')}
      </Typography>
    </Box>
  );

  const CustomPaper = (props: any) => (
    <Paper
      {...props}
      sx={{
        mt: 1,
        '& .MuiAutocomplete-listbox': {
          padding: 0,
          '& .MuiListItem-root': {
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&:last-child': {
              borderBottom: 'none',
            },
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        },
      }}
    />
  );

  return (
    <Autocomplete
      id="student-autocomplete"
      open={open}
      onOpen={() => {
        if (inputValue.length >= 2) {
          setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
      value={value}
      onChange={handleSelectionChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={students}
      loading={isLoading}
      disabled={disabled}
      size={size}
      fullWidth={fullWidth}
      getOptionLabel={(option) => option.fullName}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={renderInput}
      renderOption={renderOption}
      PaperComponent={CustomPaper}
      noOptionsText={getNoOptionsText()}
      filterOptions={(options) => options}
      clearIcon={<ClearIcon sx={{ fontSize: 18 }} />}
      popupIcon={null}
      loadingText={<LoadingText />}
      sx={{
        '& .MuiAutocomplete-inputRoot': {
          paddingRight: '39px !important',
        },
        '& .MuiAutocomplete-endAdornment': {
          right: 9,
        },
      }}
    />
  );
};

export default StudentAutocomplete;
