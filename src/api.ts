import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface Employee {
  id: number;
  name: string;
  jobTitle: string;
  hireDate: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => '/employees',
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `/employees/${id}`,
    }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: '/employees',
        method: 'POST',
        body: employee,
      }),
    }),
    updateEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: `/employees/${employee.id}`,
        method: 'PUT',
        body: employee,
      }),
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = apiSlice;