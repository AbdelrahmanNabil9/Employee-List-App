import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../api/employeeApi';

interface EmployeeState {
  employees: Employee[];
  selectedEmployee?: Employee;
}

const initialState: EmployeeState = {
  employees: [],
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload;
    },
    setSelectedEmployee: (state, action: PayloadAction<Employee | undefined>) => {
      state.selectedEmployee = action.payload;
    },
  },
});

export const { setEmployees, setSelectedEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;