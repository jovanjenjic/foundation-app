import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  useGetEmployeeQuery,
  useGetEmployeesQuery,
} from '@features/employees/services/Employee.services';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  // { field: 'zipCode', headerName: 'ZIP Code', width: 130 },
  // { field: 'lastName', headerName: 'Last name', width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
  const { data: employees } = useGetEmployeesQuery();
  const response01 = useGetEmployeeQuery('6459fa173309d19af6f68399');

  const dd = employees?.map((em) => ({ ...em, id: em?._id }));
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={(dd as any) || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
  );
}
