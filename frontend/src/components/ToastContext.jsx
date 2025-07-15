import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

/**
 * ToastProvider component wraps your app and provides toast notifications functionality.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ToastProvider wrapping children with toast functionality
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  /**
   * Adds a new toast notification.
   * @param {Object} param0 
   * @param {string} param0.message - The toast message
   * @param {'success'|'error'|'warning'} [param0.type='success'] - The type of toast for styling
   */
  const addToast = useCallback(({ message, type = 'success' }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  /**
   * Removes a toast notification by id.
   * @param {number} id - The id of the toast to remove
   */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast context easily.
 * @returns {{ addToast: function }}
 */
export function useToast() {
  return useContext(ToastContext);
}

/**
 * Container component that renders all active toasts.
 * @param {Object} props
 * @param {Array} props.toasts - Array of toast objects
 * @param {function} props.removeToast - Function to remove a toast by id
 * @returns {JSX.Element}
 */
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-2">
      {toasts.map(({ id, message, type }) => (
        <Toast 
          key={id} 
          id={id} 
          message={message} 
          type={type} 
          onClose={() => removeToast(id)} 
        />
      ))}
    </div>
  );
}

/**
 * Individual Toast notification component.
 * 
 * @param {Object} props
 * @param {number} props.id - Unique toast id
 * @param {string} props.message - Toast message text
 * @param {'success'|'error'|'warning'} props.type - Toast type for styling
 * @param {function} props.onClose - Callback to close the toast
 * @returns {JSX.Element}
 */
function Toast({ id, message, type, onClose }) {
  const bgColor =
    type === 'error'
      ? 'bg-[#b14552]'
      : type === 'warning'
        ? 'bg-[#f0d851]'
        : 'bg-[#81a275]';

  return (
    <div
      className={`${bgColor} text-white px-6 py-3 rounded shadow cursor-pointer select-none transition-colors duration-300 ease-in-out hover:brightness-110 text-lg`}
      onClick={onClose}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      title="Click to dismiss"
    >
      {message}
    </div>
  );
}
