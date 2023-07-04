import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateEmployeeMutation } from '../features/employees/employeeApi';
import { Employee } from '../features/employees/types';
import styles from './EmployeeEditForm.module.css';
import { useParams } from 'react-router-dom';


interface Props {
  employee: Employee;
}
function EmployeeEditForm({ employee }: Props) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState(employee.name || '');
  const [jobTitle, setJobTitle] = useState(employee.jobTitle || '');
  const [hireDate, setHireDate] = useState(employee.hireDate || '');

  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedEmployee: Employee = {
      id: (id) ?? '', 
      name: name ?? '', 
      jobTitle: jobTitle ?? '', 
      hireDate: hireDate 
    };    
    await updateEmployee(updatedEmployee);
    console.log(updatedEmployee);
     await navigate('/');
  };
  

  return (
    <div className={styles.container}>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Job Title:
          <input
            type="text"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Hire Date:
          <input
            type="date"
            value={hireDate}
            onChange={(event) => setHireDate(event.target.value)}
            className={styles.input}
            required
          />
        </label>
        <button type="submit" disabled={isLoading} className={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EmployeeEditForm;