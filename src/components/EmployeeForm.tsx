import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddEmployeeMutation, useUpdateEmployeeMutation } from '../api/employeeApi';
import { Employee } from '../api/employeeApi';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSelectedEmployee } from '../features/employeeSlice';

interface EmployeeFormProps {
  employee?: Employee;
}

const EmployeeForm = ({ employee }: EmployeeFormProps) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(employee?.name ?? '');
  const [jobTitle, setJobTitle] = useState(employee?.jobTitle ?? '');
  const [hireDate, setHireDate] = useState(employee?.hireDate ?? '');
  const [addEmployee] = useAddEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (employee) {
      await updateEmployee({ ...employee, name, jobTitle, hireDate });
      dispatch(setSelectedEmployee(undefined));
    } else {
      await addEmployee({ name, jobTitle, hireDate });
    }

    navigate('/employees');
  };

  const handleCancel = () => {
    dispatch(setSelectedEmployee(undefined));
    navigate('/employees');
  };

  return (
    <div>
      <h1>{employee ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="jobTitle">Job Title:</label>
          <input type="text" id="jobTitle" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
        </div>
        <div>
          <label htmlFor="hireDate">Hire Date:</label>
          <input type="text" id="hireDate" value={hireDate} onChange={(event) => setHireDate(event.target.value)} />
        </div>
        <button type="submit">{employee ? 'Save' : 'Add'}</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;