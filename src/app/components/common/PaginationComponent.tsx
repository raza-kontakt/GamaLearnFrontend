import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PAGINATION_LIMITS } from '../../constants';
import type { PaginationComponentProps } from '../../types';

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  count,
  page,
  onPageChange,
  limit,
  onLimitChange,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3,
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <FormControl size="small" sx={{ minWidth: 100 }}>
        <InputLabel>{t('dashboard.limit', 'Limit')}</InputLabel>
        <Select
          value={limit}
          label={t('dashboard.limit', 'Limit')}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {PAGINATION_LIMITS.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Pagination
        count={count}
        page={page}
        onChange={onPageChange}
        color="primary"
        shape="rounded"
        size="small"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default PaginationComponent;
