import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddEmployeeMutation } from '../features/employees/employeeApi';
import { Employee } from '../features/employees/types';
import styles from './EmployeeForm.module.css';

function EmployeeForm() {
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [hireDate, setHireDate] = useState('');
  const navigate = useNavigate();

  const [addEmployee, { isLoading }] = useAddEmployeeMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const employee: Partial<Employee> = { name, jobTitle, hireDate };
    addEmployee(employee).then(() => {
      setName('');
      setJobTitle('');
      setHireDate('');
    });
    navigate('/')
  };

  return (
    <div className={styles.container}>
      <h2>Add Employee</h2>
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
          Add
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;