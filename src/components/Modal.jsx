import React, { useRef, useEffect } from "react";

// Modal component that displays a modal dialog when isOpen is true
const Modal = ({ isOpen, onClose, children }) => {
  // Create a reference to the modal's DOM element to detect clicks outside
  const modalRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the modal
    const handleClickOutside = (event) => {
      // Close modal if click is outside the modal content
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener for mouse click when modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount or when modal closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]); // Dependencies to re-run effect when isOpen or onClose change

  // If modal is not open, return null (nothing renders)
  if (!isOpen) return null;

  return (
    // Backdrop with a blur effect and centered modal container
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50">
      {/* Modal content container */}
      <div
        ref={modalRef} // Modal reference to detect outside click
        className="bg-white p-6 rounded-lg max-w-3xl w-full relative shadow-lg"
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose} // Close modal on button click
          aria-label="Close" // Accessibility: indicates close button
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Children elements will be rendered inside the modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
