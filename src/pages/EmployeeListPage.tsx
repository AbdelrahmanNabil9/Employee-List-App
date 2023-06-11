import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from '../api/employeeApi';
import { Employee } from '../api/employeeApi';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setEmployees, setSelectedEmployee } from '../features/employeeSlice';

const EmployeeListPage = () => {
  const dispatch = useAppDispatch();
  const { data: employees = [], isSuccess } = useGetEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setEmployees(employees));
    }
  }, [isSuccess, employees, dispatch]);

  const handleDelete = async (id: number) => {
    await deleteEmployee(id);
    dispatch(setEmployees(employees.filter((employee) => employee.id !== id)));
  };

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.hireDate}</td>
              <td>
                <Link to={`/employees/${employee.id}`}>Edit</Link>{' '}
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/employees/add">Add Employee</Link>
    </div>
  );
};

export default EmployeeListPage;