import { useState, useMemo, useEffect } from 'react';
import CustomerModal from './CustomerModal';
import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';
import PaginationControls from './PaginationControls';
import { useToast } from '../../components/ToastContext';

const allDummyCustomers = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', phone: '555-1234' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', phone: '555-5678' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com', phone: '555-8765' },
    { id: '4', name: 'David Lee', email: 'david@example.com', phone: '555-3456' },
    { id: '5', name: 'Eva Green', email: 'eva@example.com', phone: '555-6543' },
    { id: '6', name: 'Frank Wright', email: 'frank@example.com', phone: '555-9876' },
    { id: '7', name: 'Grace Kim', email: 'grace@example.com', phone: '555-2345' },
    { id: '8', name: 'Hank Miller', email: 'hank@example.com', phone: '555-7654' },
    { id: '9', name: 'Ivy Carter', email: 'ivy@example.com', phone: '555-4321' },
    { id: '10', name: 'Jack Wilson', email: 'jack@example.com', phone: '555-6789' },
    { id: '11', name: 'Karen Taylor', email: 'karen@example.com', phone: '555-1122' },
    { id: '12', name: 'Leo Martin', email: 'leo@example.com', phone: '555-3344' },
    { id: '13', name: 'Mia Brown', email: 'mia@example.com', phone: '555-5566' },
    { id: '14', name: 'Nina Clark', email: 'nina@example.com', phone: '555-7788' },
    { id: '15', name: 'Owen Scott', email: 'owen@example.com', phone: '555-9900' },
    { id: '16', name: 'Pamela Young', email: 'pamela@example.com', phone: '555-1010' },
    { id: '17', name: 'Quinn Adams', email: 'quinn@example.com', phone: '555-2020' },
    { id: '18', name: 'Rachel Evans', email: 'rachel@example.com', phone: '555-3030' },
    { id: '19', name: 'Steve Hill', email: 'steve@example.com', phone: '555-4040' },
    { id: '20', name: 'Tina Baker', email: 'tina@example.com', phone: '555-5050' },
];

export default function Customers() {
    const [customers, setCustomers] = useState(allDummyCustomers);
    const [showCount, setShowCount] = useState(5);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    const [filterName, setFilterName] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [filterPhone, setFilterPhone] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { addToast } = useToast();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

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
        return customers.filter(({ name, email, phone }) => {
            return (
                name.toLowerCase().includes(filterName.toLowerCase()) &&
                email.toLowerCase().includes(filterEmail.toLowerCase()) &&
                phone.toLowerCase().includes(filterPhone.toLowerCase())
            );
        });
    }, [customers, filterName, filterEmail, filterPhone]);

    const sortedCustomers = useMemo(() => {
        if (!sortConfig.key) return filteredCustomers;
        return [...filteredCustomers].sort((a, b) => {
            const valA = a[sortConfig.key].toLowerCase();
            const valB = b[sortConfig.key].toLowerCase();
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

    const openEditModal = (customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDelete = (customerId) => {
        setCustomers((prev) => prev.filter((c) => c.id !== customerId));
        addToast({ message: 'Customer deleted successfully', type: 'success' });
    };

    const handleModalSubmit = (customerData) => {
        if (editingCustomer) {
            setCustomers((prev) =>
                prev.map((c) => (c.id === editingCustomer.id ? { ...c, ...customerData } : c))
            );
            addToast({ message: 'Customer updated successfully', type: 'success' });
        } else {
            setCustomers((prev) => [...prev, { id: String(Date.now()), ...customerData }]);
            addToast({ message: 'Customer added successfully', type: 'success' });
        }
        setIsModalOpen(false);
        setCurrentPage(1);
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
