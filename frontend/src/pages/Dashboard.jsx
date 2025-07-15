/**
 * Dashboard component - Displays the landing page of the Service POS system.
 * Intended to provide an overview and entry point to key store operations.
 *
 * @returns {JSX.Element} Main dashboard screen
 */

export default function Dashboard() {
  return (
    <>
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Service POS Dashboard
      </h1>

      {/* Subheading description */}
      <p className="text-gray-600 text-lg">
        Manage your store’s operations — including sales, customers, employees, appointments, payments, and time tracking.
      </p>

      {/* Placeholder content area for future widgets, KPIs, charts, etc. */}
      <div className="mt-8 border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400">
        Dashboard content will go here.
      </div>
    </>
  );
}
