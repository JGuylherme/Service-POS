import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import Customers from './pages/Customer/Customers';
import Employees from './pages/Employees';
import Services from './pages/Services';
import Appointments from './pages/Appointments';
import Payments from './pages/Payments';
import TimeTracking from './pages/TimeTracking';

/**
 * App component - Main layout for the Service POS system.
 * Includes the Sidebar and page routing.
 *
 * @returns {JSX.Element} Root layout with routing and navigation
 */
export default function App() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 p-10 flex justify-center items-start pt-10 pb-10">
        {/* Content container */}
        <div
          className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl
               px-10 py-8 min-h-[calc(100vh-80px)]"
          style={{ maxWidth: '100%' }}
        >
          {/* App Routes */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
