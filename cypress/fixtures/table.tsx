/* eslint-disable */
import { TimeDateFormat } from '../../src/features/employees/enums/index';
import { Column } from '../../src/features/employees/types/index';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const rows = [
  {
    _id: '123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123456789',
    city: 'New York',
    dateOfEmployment: '2022-01-01',
    dateOfBirth: '1990-05-20',
  },
  {
    _id: '124',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '987654321',
    city: 'Los Angeles',
    dateOfEmployment: '2021-03-15',
    dateOfBirth: '1985-11-10',
  },
  {
    _id: '125',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phoneNumber: '555555555',
    city: 'Chicago',
    dateOfEmployment: '2020-07-01',
    dateOfBirth: '1978-08-25',
  },
  {
    _id: '126',
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    phoneNumber: '111111111',
    city: 'San Francisco',
    dateOfEmployment: '2019-05-10',
    dateOfBirth: '1995-02-15',
  },
];

const columns = (
  handlePermanentDelete: (value: string) => void,
  handleSoftDelete: (value: string) => void,
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

const onPermanentDelete = (value: string): void => {
  console.log(value);
};
const onSoftDelete = (value: string): void => {
  console.log(value);
};
const onOpenEditDialog = (value: string): void => {
  console.log(value);
};

export const tableProps = {
  rows: rows,
  columns: columns(onPermanentDelete, onSoftDelete, onOpenEditDialog),
  isLoading: false,
  totalElement: 4,
  page: 1,
  rowsPerPage: 2,
  handleChangePage: () => {},
  handleChangeRowsPerPage: () => {},
};
