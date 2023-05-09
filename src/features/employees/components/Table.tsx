import React from 'react';
import { useGetEmployeeQuery, useGetEmployeesQuery } from '../../../redux/api/employee/employeeAPI';

const Table = () => {
    const response = useGetEmployeesQuery();
    const response01 = useGetEmployeeQuery('6459fa173309d19af6f68399');

    console.log('UsaoSamOvde-001', response, response01);
  return (
    <div className="App">
        Table
    </div>
  );
}

export default Table;
