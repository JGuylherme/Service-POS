/**
 * SortIndicator component displays a directional arrow (▲ or ▼)
 * next to a column header if it is currently being sorted.
 *
 * @param {Object} props
 * @param {string} props.columnKey - The key of the column to check against the current sort.
 * @param {{ key: string, direction: 'asc' | 'desc' | null }} props.sortConfig - Current sort configuration.
 * @returns {JSX.Element|null} A span with an arrow or null if the column is not being sorted.
 */
export default function SortIndicator({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) return null;
  if (sortConfig.direction === 'asc') return <span> ▲</span>;
  if (sortConfig.direction === 'desc') return <span> ▼</span>;
  return null;
}
