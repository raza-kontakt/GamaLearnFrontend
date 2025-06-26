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
      }}
    >
      <FormControl size="small">
        <InputLabel>{t('dashboard.limit', 'Limit')}</InputLabel>
        <Select
          value={limit}
          label={t('dashboard.limit', 'Limit')}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[10, 50, 100, 500].map((val) => (
            <MenuItem key={val} value={val}>
              {val}
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
      />
    </Box>
  );
};

export default PaginationComponent;
