import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Employee {
  id: number;
  name: string;
  jobTitle: string;
  hireDate: string;
}

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => '/employees',
      providesTags: ['Employee'],
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `/employees/${id}`,
      providesTags: (_, __, id) => [{ type: 'Employee', id }],
    }),
    addEmployee: builder.mutation<Employee, Omit<Employee, 'id'>>({
      query: (employee) => ({
        url: '/employees',
        method: 'POST',
        body: employee,
      }),
      invalidatesTags: ['Employee'],
    }),
    updateEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: 'PUT',
        body: employee,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Employee', id }],
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Employee', id }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;