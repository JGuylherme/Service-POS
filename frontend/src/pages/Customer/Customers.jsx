import { useState, useMemo, useEffect } from 'react';
import CustomerModal from './CustomerModal';
import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';
import PaginationControls from './PaginationControls';
import { useToast } from '../../components/ToastContext';

/**
 * Customers component - handles customer listing, filtering, sorting, pagination,
 * and integration with backend for CRUD operations.
 *
 * @returns {JSX.Element} Customers page
 */
export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [showCount, setShowCount] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [filterName, setFilterName] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterPhone, setFilterPhone] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/customers');
                const data = await res.json();
                setCustomers(data);
            } catch (err) {
                console.error('Failed to load customers:', err);
                addToast({ message: 'Error fetching customers', type: 'error' });
            }
        };

        fetchCustomers();
    }, []);

    const toggleSort = (key) => {
        setSortConfig((current) => {
            if (current.key === key) {
                if (current.direction === 'asc') return { key, direction: 'desc' };
                if (current.direction === 'desc') return { key: null, direction: null };
            }
            return { key, direction: 'asc' };
        });
    };

    const filteredCustomers = useMemo(() => {
        return customers.filter(({ name, email, phone_number }) => {
            return (
                name.toLowerCase().includes(filterName.toLowerCase()) &&
                (email || '').toLowerCase().includes(filterEmail.toLowerCase()) &&
                (phone_number || '').toLowerCase().includes(filterPhone.toLowerCase())
            );
        });
    }, [customers, filterName, filterEmail, filterPhone]);

    const sortedCustomers = useMemo(() => {
        if (!sortConfig.key) return filteredCustomers;
        return [...filteredCustomers].sort((a, b) => {
            const valA = (a[sortConfig.key] || '').toLowerCase();
            const valB = (b[sortConfig.key] || '').toLowerCase();
            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [filteredCustomers, sortConfig]);

    const totalPages = Math.ceil(sortedCustomers.length / showCount);
    const paginatedCustomers = sortedCustomers.slice(
        (currentPage - 1) * showCount,
        currentPage * showCount
    );

    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages || 1);
    }, [totalPages, currentPage]);

    const handleShowCountChange = (count) => {
        setShowCount(count);
        setCurrentPage(1);
    };

    const openAddModal = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    /**
     * Opens the modal to edit an existing customer.
     *
     * @param {Object} customer - Customer to edit.
     */
    const openEditModal = (customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDelete = async (customerId) => {
        try {
            await fetch(`/api/customers/${customerId}`, { method: 'DELETE' });
            setCustomers((prev) => prev.filter((c) => c.id !== customerId));
            addToast({ message: 'Customer deleted successfully', type: 'success' });
        } catch (err) {
            addToast({ message: 'Failed to delete customer', type: 'error' });
        }
    };

    const handleModalSubmit = async (customerData) => {
        try {
            if (editingCustomer) {
                await fetch(`/api/customers/${editingCustomer.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(customerData),
                });

                setCustomers((prev) =>
                    prev.map((c) =>
                        c.id === editingCustomer.id ? { ...c, ...customerData } : c
                    )
                );

                addToast({ message: 'Customer updated successfully', type: 'success' });
            } else {
                const res = await fetch('/api/customers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(customerData),
                });

                const { id } = await res.json();

                setCustomers((prev) => [...prev, { id, ...customerData }]);
                addToast({ message: 'Customer added successfully', type: 'success' });
            }

            setIsModalOpen(false);
            setCurrentPage(1);
        } catch (err) {
            addToast({ message: 'Failed to save customer', type: 'error' });
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Customers</h1>

            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    + Add Customer
                </button>

                <CustomerFilters
                    filterName={filterName}
                    setFilterName={setFilterName}
                    filterEmail={filterEmail}
                    setFilterEmail={setFilterEmail}
                    filterPhone={filterPhone}
                    setFilterPhone={setFilterPhone}
                />
            </div>

            <CustomerTable
                customers={paginatedCustomers}
                toggleSort={toggleSort}
                sortConfig={sortConfig}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                showCount={showCount}
                onPageChange={setCurrentPage}
                onShowCountChange={handleShowCountChange}
                paginatedCount={paginatedCustomers.length}
                totalCount={sortedCustomers.length}
            />

            <CustomerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingCustomer}
                mode={editingCustomer ? 'edit' : 'add'}
            />
        </>
    );
}
