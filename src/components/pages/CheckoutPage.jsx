import React, { useContext, useState } from "react";
import { CardContext } from "../context/CardContext"; // Context to manage cart items
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  // Extracting cart items and clearCart function from the context
  const { cartItems, clearCart } = useContext(CardContext);

  // Navigation function to redirect users
  const navigate = useNavigate();

  // State for storing shipping and payment information
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Handles the order placement process
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Check if cart is empty before proceeding
    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add items before placing an order."
      );
      return;
    }

    // Validate all shipping fields are filled
    for (const [key, value] of Object.entries(shippingInfo)) {
      if (!value.trim()) {
        toast.error(`Please fill out your ${key.replace(/([A-Z])/g, " $1")}.`);
        return;
      }
    }

    // Validate all payment fields are filled
    for (const [key, value] of Object.entries(paymentInfo)) {
      if (!value.trim()) {
        toast.error(`Please fill out your ${key.replace(/([A-Z])/g, " $1")}.`);
        return;
      }
    }

    // Prepare the order data for submission
    const orderData = {
      items: cartItems,
      total: calculateTotal(),
      customer: shippingInfo,
      payment: paymentInfo,
      orderDate: new Date().toISOString(),
    };

    // Save the order data to local storage for reference
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    try {
      // Simulating order submission via a POST request
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      // Check if the order submission is successful
      if (response.ok) {
        toast.success("Order placed successfully!");
        clearCart(); // Clear the cart after successful order
        localStorage.removeItem("shippingInfo"); // Remove stored shipping data
        localStorage.removeItem("paymentInfo"); // Remove stored payment data
        navigate("/order-confirmation"); // Navigate to order confirmation page
      } else {
        throw new Error("Failed to place order.");
      }
    } catch (error) {
      toast.error(error.message); // Show error if API request fails
    }
  };

  // Update shipping information on input change and save to localStorage
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    const updatedShippingInfo = { ...shippingInfo, [name]: value };
    setShippingInfo(updatedShippingInfo);
    localStorage.setItem("shippingInfo", JSON.stringify(updatedShippingInfo));
  };

  // Update payment information on input change and save to localStorage
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    const updatedPaymentInfo = { ...paymentInfo, [name]: value };
    setPaymentInfo(updatedPaymentInfo);
    localStorage.setItem("paymentInfo", JSON.stringify(updatedPaymentInfo));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Shipping and Payment Forms */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter your shipping details
            </p>
            <form className="space-y-4">
              {/* Loop through shipping fields */}
              {[
                "firstName",
                "lastName",
                "email",
                "address",
                "city",
                "state",
                "zipCode",
              ].map((field, index) => (
                <div
                  key={index}
                  className={
                    field === "state" || field === "zipCode" ? "flex gap-4" : ""
                  }
                >
                  <div
                    className={
                      field === "state" || field === "zipCode"
                        ? "w-1/3"
                        : "w-full"
                    }
                  >
                    <label className="block text-sm font-medium mb-1">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={shippingInfo[field]}
                      onChange={handleShippingChange}
                      placeholder={`Enter your ${field.replace(
                        /([A-Z])/g,
                        " $1"
                      )}`}
                      className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter your payment details
            </p>
            <form className="space-y-4" onSubmit={handlePlaceOrder}>
              {/* Payment fields */}
              {[
                "cardholderName",
                "cardNumber",
                "expirationDate",
                "cvc",
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={paymentInfo[field]}
                    onChange={handlePaymentChange}
                    placeholder={`Enter your ${field.replace(
                      /([A-Z])/g,
                      " $1"
                    )}`}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            Order Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Items ({cartItems.length})</span>
              <span className="font-semibold text-gray-900">
                ${calculateTotal()}
              </span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">Free</span>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-xl text-blue-600">${calculateTotal()}</span>
          </div>
          <div className="mt-6">
            <button
              onClick={() => navigate("/products")}
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300"
            >
              Add More Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
