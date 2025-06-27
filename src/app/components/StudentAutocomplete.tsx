import React, { useState, useEffect, useCallback } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Person as PersonIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { searchStudents, StudentSearchResult } from "../data-layer/submissions";
import { useDebounce } from "../hooks/useDebounce";

interface StudentAutocompleteProps {
  assessmentId: string;
  value: StudentSearchResult | null;
  onSelectionChange: (student: StudentSearchResult | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
}

const StudentAutocomplete: React.FC<StudentAutocompleteProps> = ({
  assessmentId,
  value,
  onSelectionChange,
  label = "Student Name",
  placeholder = "Search by student name...",
  disabled = false,
  error = false,
  helperText,
  size = "small",
  fullWidth = true,
}) => {
  const { t, i18n } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(inputValue, 300);

  const {
    data: students = [],
    isLoading,
    error: searchError,
  } = useQuery({
    queryKey: [
      "searchStudents",
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
    staleTime: 1000 * 60 * 5,
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
    <ListItem {...props} key={option.id}>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
          <PersonIcon sx={{ fontSize: 18 }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight={500}>
            {option.fullName}
          </Typography>
        }
        secondary={
          <React.Fragment>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              component="span"
            >
              {t("submissions.studentId")}: {option.id}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );

  const renderInput = (params: any) => (
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
            <SearchIcon sx={{ color: "action.active", fontSize: 20 }} />
          </InputAdornment>
        ),
        endAdornment: (
          <React.Fragment>
            {isLoading && open ? (
              <CircularProgress color="inherit" size={20} />
            ) : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          paddingLeft: 1,
        },
      }}
    />
  );

  // Custom paper component for dropdown
  const PaperComponent = (props: any) => (
    <Paper
      {...props}
      sx={{
        mt: 1,
        "& .MuiAutocomplete-listbox": {
          padding: 0,
          "& .MuiListItem-root": {
            borderBottom: "1px solid",
            borderColor: "divider",
            "&:last-child": {
              borderBottom: "none",
            },
            "&:hover": {
              backgroundColor: "action.hover",
            },
          },
        },
      }}
    />
  );

  const noOptionsText = () => {
    if (debouncedSearchTerm.length < 2) {
      return t("students.typeToSearch", "Type at least 2 characters to search");
    }
    if (isLoading) {
      return t("common.loading", "Loading...");
    }
    if (searchError) {
      return t("students.searchError", "Error searching students");
    }
    return t("students.noResults", "No students found");
  };

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
      PaperComponent={PaperComponent}
      noOptionsText={noOptionsText()}
      filterOptions={(options) => options} 
      clearIcon={<ClearIcon sx={{ fontSize: 18 }} />}
      popupIcon={null}
      loadingText={
        <Box display="flex" alignItems="center" justifyContent="center" py={2}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {t("students.searching", "Searching students...")}
          </Typography>
        </Box>
      }
      sx={{
        "& .MuiAutocomplete-inputRoot": {
          paddingRight: "39px !important",
        },
        "& .MuiAutocomplete-endAdornment": {
          right: 9,
        },
      }}
    />
  );
};

export default StudentAutocomplete;
