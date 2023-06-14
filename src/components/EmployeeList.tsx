import { Link } from 'react-router-dom';
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from '../features/employees/employeeApi';
import { useEffect } from 'react';
import styles from './EmployeeList.module.css';

function EmployeeList() {
  const { data: employees = [], isLoading, isError, refetch } = useGetEmployeesQuery();
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDelete = (id: number) => {
    deleteEmployee(id).then(() => {
      refetch();
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Employees</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Hire Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                <Link to={`/detail/${employee.id}`} className={styles.link}>
                  {employee.name}
                </Link>
              </td>
              <td>{employee.jobTitle}</td>
              <td>{employee.hireDate}</td>
              <td>
                <Link to={`/edit/${employee.id}`} className={styles.link}>
                  Edit
                </Link>
              </td>
              <td>
                <button disabled={isDeleting} onClick={() => handleDelete(employee.id)}>
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;