import { useState, useEffect, useRef } from 'react';

/**
 * CustomerModal component - handles customer creation and editing.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Function} props.onSubmit - Function to submit customer data.
 * @param {Object|null} props.initialData - Existing customer data for editing.
 * @param {'add'|'edit'} props.mode - Mode of the modal.
 * @returns {JSX.Element|null} Modal element or null if closed.
 */
export default function CustomerModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode = 'add'
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setEmail(initialData?.email || '');
      setPhoneNumber(initialData?.phone_number || '');
      setErrors({});
      setIsSubmitting(false);
      setTimeout(() => nameInputRef.current?.focus(), 50);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'input, button, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim() && !phone_number.trim()) {
      newErrors.email = 'Email or Phone is required';
      newErrors.phone_number = 'Email or Phone is required';
    } else {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      name.trim() &&
      (email.trim() || phone_number.trim()) &&
      (!email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({ name: name.trim(), email: email.trim(), phone_number: phone_number.trim() });
      onClose();
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal box */}
      <div
        ref={modalRef}
        className="relative bg-white rounded shadow-lg max-w-md w-full p-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'add' ? 'Add New Customer' : 'Edit Customer'}
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Name input */}
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              ref={nameInputRef}
              type="text"
              placeholder="John Doe"
              className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className={`w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Number input */}
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="phone_number">
              Phone
            </label>
            <input
              id="phone_number"
              type="text"
              placeholder="(123) 456-7890"
              className={`w-full border rounded px-3 py-2 ${errors.phone_number ? 'border-red-500' : 'border-gray-300'
                }`}
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`px-4 py-2 rounded text-white transition ${!isFormValid() || isSubmitting
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
              {isSubmitting
                ? mode === 'add'
                  ? 'Adding...'
                  : 'Saving...'
                : mode === 'add'
                  ? 'Add Customer'
                  : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
