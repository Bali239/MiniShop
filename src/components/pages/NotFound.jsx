import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// NotFound component handles displaying a 404 error page when the user navigates to a non-existent route
const NotFound = () => {
  useEffect(() => {
    // Display a toast notification when the page is loaded to inform the user about the 404 error
    toast.error("Page not found!");
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {/* Main header showing the 404 error code */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>

      {/* Subheader for describing the page status */}
      <h2 className="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</h2>

      {/* Information paragraph describing the error */}
      <p className="text-gray-500 mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      {/* Link to navigate back to the home page */}
      <Link
        to="/" // Redirects to the homepage
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;