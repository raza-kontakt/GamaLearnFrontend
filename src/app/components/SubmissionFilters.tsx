import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SubmissionFiltersProps {
  filters: {
    studentId: string;
    status: string;
    sessionHealth: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const SubmissionFilters: React.FC<SubmissionFiltersProps> = ({
  filters,
  onFilterChange,
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
      }}
    >
      <TextField
        label={t('submissions.studentId', 'Student ID')}
        value={filters.studentId}
        onChange={(e) => onFilterChange('studentId', e.target.value)}
        variant="outlined"
        size="small"
        sx={{ flex: 1 }}
      />
      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('submissions.status', 'Status')}</InputLabel>
        <Select
          name="status"
          value={filters.status}
          label={t('submissions.status', 'Status')}
          onChange={(e) => onFilterChange('status', e.target.value as string)}
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          <MenuItem value="PENDING">{t('status.pending', 'Pending')}</MenuItem>
          <MenuItem value="IN_PROGRESS">
            {t('status.inProgress', 'In Progress')}
          </MenuItem>
          <MenuItem value="COMPLETED">
            {t('status.completed', 'Completed')}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>
          {t('submissions.sessionHealth', 'Session Health')}
        </InputLabel>
        <Select
          name="sessionHealth"
          value={filters.sessionHealth}
          label={t('submissions.sessionHealth', 'Session Health')}
          onChange={(e) =>
            onFilterChange('sessionHealth', e.target.value as string)
          }
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          <MenuItem value="HEALTHY">{t('health.healthy', 'Healthy')}</MenuItem>
          <MenuItem value="UNHEALTHY">
            {t('health.unhealthy', 'Unhealthy')}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SubmissionFilters; 