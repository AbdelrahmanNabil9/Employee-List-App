import { useParams } from 'react-router-dom';
import { useGetEmployeeByIdQuery } from '../features/employees/employeeApi';
import styles from './EmployeeDetail.module.css';

function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: employee, isLoading, isError } = useGetEmployeeByIdQuery(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{employee?.name}</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.label}>Job Title:</span>
          <span className={styles.value}>{employee?.jobTitle}</span>
        </li>
        <li className={styles.listItem}>
          <span className={styles.label}>Hire Date:</span>
          <span className={styles.value}>{employee?.hireDate}</span>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeDetail;