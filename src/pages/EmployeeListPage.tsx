import React, { useState, useMemo, useCallback } from 'react';
import { Table, DialogForm } from '@base/features/employees';
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
  useSoftDeleteEmployeeMutation,
} from '@base/features/employees/services/Employee.services';
import {
  Column,
  DeleteHandler,
  TableColumns,
} from '@base/features/employees/types';
import { TimeDateFormat } from '@base/features/employees/enums';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns = (
  handlePermanentDelete: DeleteHandler,
  handleSoftDelete: DeleteHandler,
  handleOpenEditDialog: (value: string) => void,
): readonly Column[] => [
  { id: 'code', label: 'Name', row: 'name' },
  { id: 'code', label: 'Email', row: 'email' },
  { id: 'code', label: 'Phone number', row: 'phoneNumber' },
  {
    id: 'code',
    label: 'Date of birth',
    row: 'dateOfBirth',
    format: (value) => dayjs(value).format(TimeDateFormat.timeDate),
  },
  {
    id: 'code',
    label: 'Date of employment',
    row: 'dateOfEmployment',
    format: (value) => dayjs(value).format(TimeDateFormat.timeDate),
  },
  { id: 'code', label: 'City', row: 'city' },
  {
    id: 'code',
    label: 'Permanent delete',
    row: 'delete',
    wrapper: (rowId) => (
      <Button
        onClick={() => handlePermanentDelete(rowId)}
        variant="outlined"
        color="error"
        endIcon={<DeleteIcon />}
      >
        Delete
      </Button>
    ),
  },
  {
    id: 'code',
    label: 'Soft delete',
    row: 'delete',
    wrapper: (rowId) => (
      <Button
        onClick={() => handleSoftDelete(rowId)}
        variant="outlined"
        color="error"
        endIcon={<DeleteIcon />}
      >
        Soft delete
      </Button>
    ),
  },
  {
    id: 'code',
    label: 'Edit employee',
    row: 'edit',
    wrapper: (rowId) => (
      <Button
        endIcon={<EditIcon />}
        variant="contained"
        onClick={() => handleOpenEditDialog(rowId)}
      >
        Edit
      </Button>
    ),
  },
];

const createData = ({
  _id,
  name,
  email,
  phoneNumber,
  dateOfBirth,
  dateOfEmployment,
  city,
}: TableColumns) => {
  return { _id, name, email, phoneNumber, dateOfBirth, dateOfEmployment, city };
};

const EmployeeListPage = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedEmployeeId(null);
  };

  const { data, isLoading, isFetching } = useGetEmployeesQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  const [permanentDeleteEmployee] = useDeleteEmployeeMutation();
  const [softDeleteEmployee] = useSoftDeleteEmployeeMutation();

  const rows = useMemo(
    () =>
      (data?.employees || []).map((row) =>
        createData({ ...row, city: row?.homeAddress?.city }),
      ),
    [data],
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

  const handlePermanentDelete = useCallback(
    async (employeeId: string): Promise<void | unknown> => {
      try {
        await permanentDeleteEmployee(employeeId);
        return;
      } catch (e) {
        return e;
      }
    },
    [],
  );

  const handleSoftDelete = useCallback(
    async (employeeId: string): Promise<void | unknown> => {
      try {
        await softDeleteEmployee(employeeId);
        return;
      } catch (e) {
        return e;
      }
    },
    [],
  );

  const handleOpenEditDialog = (rowId: string): void => {
    setSelectedEmployeeId(rowId);
    handleOpen();
  };

  return (
    <>
      <DialogForm
        open={open}
        handleClose={handleClose}
        employeeId={selectedEmployeeId}
      />
      <Button variant="contained" onClick={handleOpen}>
        Create new
      </Button>
      <Table
        columns={columns(
          handlePermanentDelete,
          handleSoftDelete,
          handleOpenEditDialog,
        )}
        rows={rows}
        isLoading={isLoading || isFetching}
        totalElement={data?.count || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default EmployeeListPage;
