import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Customers', to: '/customers' },
  { label: 'Employees', to: '/employees' },
  { label: 'Services', to: '/services' },
  { label: 'Appointments', to: '/appointments' },
  { label: 'Payments', to: '/payments' },
  { label: 'Time Tracking', to: '/time-tracking' },
];

/**
 * Sidebar component renders navigation links with mobile toggle.
 *
 * @returns {JSX.Element} Sidebar menu
 */
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Sidebar container with responsive behavior */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform fixed md:static z-40 w-64 bg-white shadow-md p-6 min-h-screen`}
      >
        {/* Mobile toggle button inside sidebar */}
        <div className="flex items-center justify-between md:hidden mb-6">
          <h2 className="text-xl font-bold text-indigo-600">Service POS</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Desktop title (hidden on mobile when button shows) */}
        <h2 className="text-2xl font-extrabold text-indigo-600 mb-8 hidden md:block">
          Service POS
        </h2>

        {/* Navigation links */}
        <nav className="space-y-2">
          {links.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile menu toggle button (only when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
}
