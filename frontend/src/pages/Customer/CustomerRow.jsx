/**
 * Renders a table row for a single customer with Edit and Delete actions.
 *
 * @param {Object} props
 * @param {Object} props.customer - The customer data object.
 * @param {Function} props.onEdit - Callback for editing the customer.
 * @param {Function} props.onDelete - Callback for deleting the customer.
 * @returns {JSX.Element} Table row element
 */
export default function CustomerRow({ customer, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50">
      {/* Name */}
      <td className="p-3 border border-gray-300">{customer.name}</td>

      {/* Email */}
      <td className="p-3 border border-gray-300">{customer.email}</td>

      {/* Phone */}
      <td className="p-3 border border-gray-300">{customer.phone_number || '-'}</td>

      {/* Actions */}
      <td className="p-3 border border-gray-300 inline-flex space-x-2">
        <button
          onClick={() => onEdit(customer)}
          className="flex-1 px-3 py-1 text-sm bg-yellow-300 rounded hover:bg-yellow-400 transition text-center"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(customer.id)}
          className="flex-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition text-center"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
