import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { parseQueryString } from '@utils/parseQueryString';
import { Employee, EmployeeQueryArgsData, EmployeesResponse } from '../types';

const baseUrl = process.env.REACT_APP_SERVICE_URL;

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], EmployeeQueryArgsData | void>({
      query: (args) => {
        const queryString = args
          ? parseQueryString<EmployeeQueryArgsData>(args)
          : '';
        return {
          url: `/employees?${queryString}`,
          requestParams: {
            method: 'get',
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Employee' as const,
                id: _id,
              })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
      transformResponse: (response: EmployeesResponse) => response.employees,
    }),
    getEmployee: builder.query<Employee, string>({
      query(id) {
        return `employees/id/${id}`;
      },
      transformResponse: (response: Employee) => response,
      providesTags: (result) => [{ type: 'Employee', id: result?._id }],
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeQuery, usePrefetch } =
  employeesApi;
