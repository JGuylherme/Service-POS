import CustomerRow from './CustomerRow';
import SortIndicator from './SortIndicator';

/**
 * CustomerTable displays a list of customers in a table with sortable headers.
 *
 * @param {Object} props
 * @param {Array} props.customers - Array of customer objects to render.
 * @param {Function} props.toggleSort - Handler to toggle sorting by column.
 * @param {Object} props.sortConfig - Current sort configuration ({ key, direction }).
 * @param {Function} props.onEdit - Callback when editing a customer.
 * @param {Function} props.onDelete - Callback when deleting a customer.
 * @returns {JSX.Element} A table displaying customer data.
 */
export default function CustomerTable({ customers, toggleSort, sortConfig, onEdit, onDelete }) {
    return (
        <table className="w-full border-collapse table-auto">
            <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                    {/* Sortable Name column */}
                    <th
                        className="p-3 border border-gray-300 cursor-pointer select-none"
                        onClick={() => toggleSort('name')}
                        style={{ width: 220 }}
                    >
                        Name <SortIndicator columnKey="name" sortConfig={sortConfig} />
                    </th>

                    {/* Sortable Email column */}
                    <th
                        className="p-3 border border-gray-300 cursor-pointer select-none"
                        onClick={() => toggleSort('email')}
                        style={{ minWidth: 300 }}
                    >
                        Email <SortIndicator columnKey="email" sortConfig={sortConfig} />
                    </th>

                    {/* Static Phone column */}
                    <th className="p-3 border border-gray-300" style={{ width: 140 }}>
                        Phone
                    </th>

                    {/* Actions column */}
                    <th className="p-3 border border-gray-300" style={{ width: 150 }}>
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody>
                {customers.length > 0 ? (
                    customers.map((customer) => (
                        <CustomerRow
                            key={customer.id}
                            customer={customer}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center p-4 text-gray-500">
                            No customers found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
