import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SubmissionFiltersData } from '../types';
import StudentAutocomplete from './StudentAutocomplete';
import { StudentSearchResult } from '../data-layer/submissions';

interface SubmissionFiltersProps {
  assessmentId: string;
  filters: {
    studentId: string;
    status: string;
    areaId: string;
  };
  onFilterChange: (name: string, value: string) => void;
  filterOptions?: SubmissionFiltersData;
  selectedStudent: StudentSearchResult | null;
  onStudentChange: (student: StudentSearchResult | null) => void;
}

const SubmissionFilters: React.FC<SubmissionFiltersProps> = ({
  assessmentId,
  filters,
  onFilterChange,
  filterOptions,
  selectedStudent,
  onStudentChange,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ flex: 1, minWidth: 200 }}>
        <StudentAutocomplete
          assessmentId={assessmentId}
          value={selectedStudent}
          onSelectionChange={onStudentChange}
          label="submissions.studentName"
          placeholder="submissions.searchStudentPlaceholder"
          size="small"
          fullWidth
        />
      </Box>
      
      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('submissions.status', 'Status')}</InputLabel>
        <Select
          name="status"
          value={filters.status}
          label={t('submissions.status', 'Status')}
          onChange={(e) => onFilterChange('status', e.target.value as string)}
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          {filterOptions?.statuses?.map((status) => (
            <MenuItem key={status} value={status}>
              {t(`status.${status.toLowerCase()}`, status)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('submissions.area', 'Area')}</InputLabel>
        <Select
          name="areaId"
          value={filters.areaId}
          label={t('submissions.area', 'Area')}
          onChange={(e) => onFilterChange('areaId', e.target.value as string)}
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          {filterOptions?.areas?.map((area) => (
            <MenuItem key={area.id} value={area.id.toString()}>
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SubmissionFilters; 