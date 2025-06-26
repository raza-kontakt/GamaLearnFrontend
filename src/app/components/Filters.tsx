import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FiltersProps } from '../types';

const Filters: React.FC<FiltersProps> = ({ filters, options, onChange }) => {
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
      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('dashboard.area', 'Area')}</InputLabel>
        <Select
          name="area"
          value={filters.area || ''}
          label={t('dashboard.area', 'Area')}
          onChange={(e) => onChange('area', e.target.value as string)}
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          {options.areas?.map((area) => (
            <MenuItem key={area.id} value={area.id.toString()}>
              {area.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('dashboard.program', 'Program')}</InputLabel>
        <Select
          name="program"
          value={filters.program || ''}
          label={t('dashboard.program', 'Program')}
          onChange={(e) => onChange('program', e.target.value as string)}
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          {options.programs?.map((program) => (
            <MenuItem key={program.id} value={program.id.toString()}>
              {program.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('dashboard.course', 'Course')}</InputLabel>
        <Select
          name="course"
          value={filters.course || ''}
          label={t('dashboard.course', 'Course')}
          onChange={(e) => onChange('course', e.target.value as string)}
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          {options.courses?.map((course) => (
            <MenuItem key={course.id} value={course.id.toString()}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 180, flex: 1 }}>
        <InputLabel>{t('dashboard.status', 'Status')}</InputLabel>
        <Select
          name="status"
          value={filters.status || ''}
          label={t('dashboard.status', 'Status')}
          onChange={(e) => onChange('status', e.target.value as string)}
        >
          <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
          {options.statuses?.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
