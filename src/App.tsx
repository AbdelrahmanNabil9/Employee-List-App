import { Route, Routes } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeFormPage from './pages/EmployeeFormPage';

function App() {
  return (
    <div>
      <Routes>
        <Route  path="/employees" element={EmployeeListPage} />
        <Route  path="/employees/add" element={EmployeeFormPage} />
        <Route  path="/employees/:id" element={EmployeeFormPage} />
      </Routes>
    </div>
  );
}

export default App;