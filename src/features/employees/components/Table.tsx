import * as React from 'react';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TablePaginationActions from './TablePagination';
import { TableColumns, TableInterface } from '../types';
import TableSpinner from './TableSpinner';

const CustomPaginationActionsTable = ({
  columns,
  rows,
  isLoading,
  totalElement,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}: TableInterface) => {
  return (
    <TableContainer style={{ position: 'relative' }} component={Paper}>
      {isLoading && <TableSpinner />}
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              {columns.map(({ format, row: key, wrapper }) => (
                <TableCell component="th" scope="row">
                  {format
                    ? format(row[key as keyof TableColumns])
                    : row[key as keyof TableColumns] ||
                      (wrapper && wrapper(row._id))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[1, 2, 5, 10, 25]}
              colSpan={3}
              count={totalElement}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
