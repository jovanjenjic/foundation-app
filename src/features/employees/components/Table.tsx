import * as React from 'react';
import dayjs from 'dayjs';
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
import { useGetEmployeesQuery } from '../services/Employee.services';
import { Column, TableColumns } from '../types';
import { TimeDateFormat } from '../consts';
import TableSpinner from './TableSpinner';

const columns: readonly Column[] = [
  { id: 'name', label: 'Name' },
  { id: 'code', label: 'Email' },
  { id: 'code', label: 'Phone number' },
  { id: 'code', label: 'Date of birth' },
  { id: 'code', label: 'Date of employment' },
  { id: 'code', label: 'City' },
];

const createData = ({
  name,
  email,
  phoneNumber,
  dateOfBirth,
  dateOfEmployment,
  city,
}: TableColumns) => {
  return { name, email, phoneNumber, dateOfBirth, dateOfEmployment, city };
};

const CustomPaginationActionsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { data, isLoading, isFetching } = useGetEmployeesQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  const rows = (data?.employees || []).map((row) =>
    createData({ ...row, city: row?.homeAddress?.city }),
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer style={{ position: 'relative' }} component={Paper}>
      {(isFetching || isLoading) && <TableSpinner />}
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
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>
                {dayjs(row.dateOfBirth).format(TimeDateFormat.timeDate)}
              </TableCell>
              <TableCell>
                {dayjs(row.dateOfEmployment).format(TimeDateFormat.timeDate)}
              </TableCell>
              <TableCell>{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                1,
                2,
                5,
                10,
                25,
                { label: 'All', value: -1 },
              ]}
              colSpan={3}
              count={data?.count || 0}
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
