import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const getValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const Table = ({ columns, data }: { columns: any[]; data: any[] }) => (
  <TableContainer component={Paper}>
    <MuiTable>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col.accessor}>{col.Header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={row.id || i}>
            {columns.map((col) => (
              <TableCell key={col.accessor}>
                {col.Cell
                  ? col.Cell({ value: getValue(row, col.accessor), row })
                  : getValue(row, col.accessor)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  </TableContainer>
);

export default Table;
