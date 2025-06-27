import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FilterSelectProps {
  name: string;
  value: string;
  label: string;
  options: Array<{ id: number | string; name: string }>;
  onChange: (name: string, value: string) => void;
  minWidth?: number;
  flex?: number;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  name,
  value,
  label,
  options = [],
  onChange,
  minWidth = 180,
  flex = 1,
}) => {
  const { t } = useTranslation();

  return (
    <FormControl size="small" sx={{ minWidth, flex }}>
      <InputLabel>{t(label, label)}</InputLabel>
      <Select
        name={name}
        value={value || ''}
        label={t(label, label)}
        onChange={(e) => onChange(name, e.target.value as string)}
      >
        <MenuItem value="">{t('dashboard.all', 'All')}</MenuItem>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id.toString()}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterSelect; 