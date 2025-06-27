import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import StudentAutocomplete from './StudentAutocomplete';
import FilterSelect from './common/FilterSelect';
import type { 
  SubmissionFilters, 
  SubmissionFiltersData
} from '../types';
import type { StudentSearchResult } from '../data-layer/submissions';

interface SubmissionFiltersProps {
  assessmentId: string;
  filters: SubmissionFilters;
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

  const statusOptions = filterOptions?.statuses?.map(status => ({
    id: status,
    name: t(`status.${status.toLowerCase()}`, status)
  })) || [];

  const areaOptions = filterOptions?.areas?.map(area => ({
    id: area.id,
    name: area.name
  })) || [];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
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
      
      <FilterSelect
        name="status"
        value={filters.status}
        label="submissions.status"
        options={statusOptions}
        onChange={onFilterChange}
        minWidth={150}
      />

      <FilterSelect
        name="areaId"
        value={filters.areaId}
        label="submissions.area"
        options={areaOptions}
        onChange={onFilterChange}
        minWidth={150}
      />
    </Box>
  );
};

export default SubmissionFilters; 