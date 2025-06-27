import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import type { TableColumn } from '../types';

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
}

const getValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

const Table = <T extends Record<string, any>>({ 
  columns, 
  data 
}: TableProps<T>) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
      <MuiTable size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'grey.50' }}>
            {columns.map((column, index) => (
              <TableCell 
                key={`header-${index}`} 
                sx={{ fontWeight: 'bold' }}
              >
                {column.Header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow 
              key={`row-${rowIndex}`}
              hover
              sx={{ '&:nth-of-type(odd)': { backgroundColor: 'grey.25' } }}
            >
              {columns.map((column, colIndex) => {
                const cellValue = getValue(row, column.accessor);
                return (
                  <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                    {column.Cell 
                      ? column.Cell({ value: cellValue, row }) 
                      : cellValue
                    }
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
