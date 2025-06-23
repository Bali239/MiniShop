import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// OrderConfirmation component to show a successful order confirmation message
const OrderConfirmation = () => {
  // Using useEffect hook to show a success toast when the component mounts
  useEffect(() => {
    toast.success("Order confirmed successfully!");
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    // Main container for the order confirmation page, ensuring full screen height and centered content
    <div className="order-confirmation-page min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Card that holds the order confirmation message */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {/* Title of the confirmation message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Thank You for Your Order!
        </h1>

        {/* Message indicating the order was successful */}
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully. We will send you a
          confirmation email shortly.
        </p>

        {/* Additional message offering support in case of any issues */}
        <p className="text-gray-600 mb-6">
          If you have any questions, feel free to contact our support team.
        </p>

        {/* Navigation link that directs user back to the homepage */}
        <Link
          to="/" // Redirects to the home page
          className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
