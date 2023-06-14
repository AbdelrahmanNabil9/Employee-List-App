import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
            Employees
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/add" className={styles.navLink}>
            Add Employee
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;