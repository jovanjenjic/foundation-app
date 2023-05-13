import React, { useState, useMemo, useCallback } from 'react';
import { Table } from '@base/features/employees';
import { useGetDeletedEmployeesQuery } from '@base/features/employees/services/Employee.services';
import { Column, TableColumns } from '@base/features/employees/types';
import dayjs from 'dayjs';
import { TimeDateFormat } from '@base/features/employees/enums';

const columns = (): readonly Column[] => [
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

const DeletedEmployeesListPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data, isLoading, isFetching } = useGetDeletedEmployeesQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  const rows = useMemo(
    () =>
      (data?.employees || []).map((row) =>
        createData({ ...row, city: row?.homeAddress?.city }),
      ),
    [data],
  );

  const handleChangePage = useCallback(
    (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ): void => {
      setPage(newPage);
    },
    [setPage],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [setRowsPerPage, setPage],
  );

  return (
    <Table
      columns={columns()}
      rows={rows}
      isLoading={isLoading || isFetching}
      totalElement={data?.count || 0}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default DeletedEmployeesListPage;
