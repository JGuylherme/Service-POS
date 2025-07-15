/**
 * PaginationControls renders pagination UI with row count selector and page navigation.
 *
 * @param {Object} props
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {number} props.showCount - How many rows to show per page.
 * @param {Function} props.onPageChange - Callback when page changes.
 * @param {Function} props.onShowCountChange - Callback when row count selection changes.
 * @param {number} props.paginatedCount - Number of items currently displayed.
 * @param {number} props.totalCount - Total number of available items.
 * @returns {JSX.Element}
 */
export default function PaginationControls({
    currentPage,
    totalPages,
    showCount,
    onPageChange,
    onShowCountChange,
    paginatedCount,
    totalCount,
}) {
    return (
        <div className="mt-4 flex items-center justify-between text-gray-700">
            {/* Left side: rows per page and info */}
            <div className="flex items-center space-x-2">
                <label htmlFor="showCount" className="font-medium">
                    Rows per page:
                </label>
                <select
                    id="showCount"
                    value={showCount}
                    onChange={(e) => onShowCountChange(Number(e.target.value))}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                <span>{`Showing ${paginatedCount} of ${totalCount} customers`}</span>
            </div>

            {/* Right side: page navigation */}
            <div className="space-x-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border ${currentPage === 1
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-indigo-600 text-indigo-600 hover:bg-indigo-100'
                        }`}
                >
                    Previous
                </button>

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded border ${currentPage === totalPages
                            ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                            : 'border-indigo-600 text-indigo-600 hover:bg-indigo-100'
                        }`}
                >
                    Next
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>
            </div>
        </div>
    );
}
