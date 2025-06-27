import React from 'react';
import { Box } from '@mui/material';
import FilterSelect from './common/FilterSelect';
import type { FiltersProps } from '../types';

const Filters: React.FC<FiltersProps> = ({ filters, options, onChange }) => {
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
      <FilterSelect
        name="area"
        value={filters.area}
        label="dashboard.area"
        options={options.areas || []}
        onChange={onChange}
      />
      
      <FilterSelect
        name="program"
        value={filters.program}
        label="dashboard.program"
        options={options.programs || []}
        onChange={onChange}
      />
      
      <FilterSelect
        name="course"
        value={filters.course}
        label="dashboard.course"
        options={options.courses || []}
        onChange={onChange}
      />
      
      <FilterSelect
        name="status"
        value={filters.status}
        label="dashboard.status"
        options={options.statuses?.map((status) => ({ id: status, name: status })) || []}
        onChange={onChange}
      />
    </Box>
  );
};

export default Filters;
