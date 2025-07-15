/**
 * CustomerFilters component - renders input fields to filter the customer list.
 *
 * @param {Object} props
 * @param {string} props.filterName - Current filter value for name.
 * @param {Function} props.setFilterName - Setter for name filter.
 * @param {string} props.filterEmail - Current filter value for email.
 * @param {Function} props.setFilterEmail - Setter for email filter.
 * @param {string} props.filterPhone - Current filter value for phone.
 * @param {Function} props.setFilterPhone - Setter for phone filter.
 *
 * @returns {JSX.Element} Filter input section
 */
export default function CustomerFilters({
    filterName,
    setFilterName,
    filterEmail,
    setFilterEmail,
    filterPhone,
    setFilterPhone,
}) {
    return (
        <div className="flex space-x-4">
            {/* Name filter input */}
            <div>
                <label htmlFor="filterName" className="block text-gray-700 font-medium mb-1">
                    Name
                </label>
                <input
                    id="filterName"
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                    placeholder="Filter by name"
                />
            </div>

            {/* Email filter input */}
            <div>
                <label htmlFor="filterEmail" className="block text-gray-700 font-medium mb-1">
                    Email
                </label>
                <input
                    id="filterEmail"
                    type="text"
                    value={filterEmail}
                    onChange={(e) => setFilterEmail(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                    placeholder="Filter by email"
                />
            </div>

            {/* Phone filter input */}
            <div>
                <label htmlFor="filterPhone" className="block text-gray-700 font-medium mb-1">
                    Phone
                </label>
                <input
                    id="filterPhone"
                    type="text"
                    value={filterPhone}
                    onChange={(e) => setFilterPhone(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                    placeholder="Filter by phone"
                />
            </div>
        </div>
    );
}
