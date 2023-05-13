import React from 'react';

export interface Employee {
  _id: string;
  deletedAt: null | string;
  isDeleted: boolean;
  dateOfBirth: string;
  dateOfEmployment: string;
  homeAddress: {
    addressLine1: string;
    addressLine2: string;
    ZIPCode: string;
    city: string;
    _id: string;
  };
  phoneNumber: string;
  email: string;
  name: string;
  __v: number;
}

export interface EmployeesResponse {
  employees: Employee[];
  count: number;
}

export interface EmployeeQueryArgsData {
  page?: number;
  limit?: number;
  searchText?: string;
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

export interface TableColumns {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  dateOfEmployment: string;
  city: string;
}

export interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number | string) => string;
  row: string;
  wrapper?: (rowId: string) => JSX.Element;
}

export interface ChangePageHandler {
  (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void;
}

export interface ChangeRowsPerPageHandler {
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

export interface DeleteHandler {
  (employeeId: string): Promise<void | unknown>;
}

export interface TableInterface {
  columns: readonly Column[];
  rows: TableColumns[];
  isLoading: boolean;
  totalElement: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: ChangePageHandler;
  handleChangeRowsPerPage: ChangeRowsPerPageHandler;
}

export interface FormInterface {
  open: boolean;
  handleClose: () => void;
  employeeId?: string | null;
}

export interface FormValues {
  name: string;
  email: string;
  phoneNumber: string;
  homeAddress: {
    city: string;
    ZIPCode: string;
    addressLine1: string;
    addressLine2: string;
  };
  dateOfEmployment: string;
  dateOfBirth: string;
}
