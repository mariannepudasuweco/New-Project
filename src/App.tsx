import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Procurement } from './pages/Procurement';
import { Payroll } from './pages/Payroll';
import { Schedule } from './pages/Schedule';
import { Reports } from './pages/Reports';
import { AccessControl } from './pages/AccessControl';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="procurement" element={<Procurement />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="reports" element={<Reports />} />
            <Route path="access" element={<AccessControl />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
