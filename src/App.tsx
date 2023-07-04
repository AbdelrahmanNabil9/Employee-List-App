import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeEditForm from './components/EmployeeEditForm';
import EmployeeDetail from './components/EmployeeDetail';
import { Employee } from './features/employees/types';

export function App() {
  return (
      <div>
        <NavBar/>
        <Routes>
          <Route path="/add" element={<EmployeeForm />} />
          <Route
            path="/edit/:id"
            element={
              <RouteEditWrapper>
                <EmployeeEditForm employee={{} as Employee}  />
              </RouteEditWrapper>
            }
          />
          <Route path="/detail/:id" element={<EmployeeDetail />} />
          <Route path="/" element={<EmployeeList />} />
        </Routes>
      </div>
  );
}

function RouteEditWrapper({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}