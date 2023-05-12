import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { parseQueryString } from '@utils/parseQueryString';
import { Employee, EmployeeQueryArgsData, EmployeesResponse } from '../types';

const baseUrl = process.env.REACT_APP_SERVICE_URL;

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query<
      EmployeesResponse,
      EmployeeQueryArgsData | void
    >({
      query: (args) => {
        const queryString = args
          ? parseQueryString<EmployeeQueryArgsData>(args)
          : '';
        return {
          url: `/employees?${queryString}`,
          method: 'get',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.employees.map(({ _id }) => ({
                type: 'Employee' as const,
                id: _id,
              })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
      transformResponse: (response: EmployeesResponse) => response,
    }),
    getDeletedEmployees: builder.query<
      EmployeesResponse,
      EmployeeQueryArgsData | void
    >({
      query: (args) => {
        const queryString = args
          ? parseQueryString<EmployeeQueryArgsData>(args)
          : '';
        return {
          url: `/employees/deleted?${queryString}`,
          method: 'get',
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.employees.map(({ _id }) => ({
                type: 'Employee' as const,
                id: _id,
              })),
              { type: 'Employee', id: 'LIST' },
            ]
          : [{ type: 'Employee', id: 'LIST' }],
      transformResponse: (response: EmployeesResponse) => response,
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `employees/id/${id}`,
        method: 'get',
      }),
      transformResponse: (response: Employee) => response,
      providesTags: (result) => [{ type: 'Employee', id: result?._id }],
    }),
    deleteEmployee: builder.mutation<Employee, string>({
      query: (id) => ({
        url: `/employees/permanent-delete/${id}`,
        method: 'delete',
      }),
      transformResponse: (response: Employee) => response,
      invalidatesTags: (result) => [{ type: 'Employee', id: result?._id }],
    }),
    softDeleteEmployee: builder.mutation<Employee, string>({
      query: (id) => ({
        url: `/employees/soft-delete/${id}`,
        method: 'delete',
      }),
      transformResponse: (response: Employee) => response,
      invalidatesTags: (result) => [{ type: 'Employee', id: result?._id }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetDeletedEmployeesQuery,
  useGetEmployeeQuery,
  useDeleteEmployeeMutation,
  useSoftDeleteEmployeeMutation,
  usePrefetch,
} = employeesApi;
