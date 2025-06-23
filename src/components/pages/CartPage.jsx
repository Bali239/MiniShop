import React, { useContext } from "react";
import { CardContext } from "../context/CardContext"; // Import context to manage cart state
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
const CartPage = () => {
  // Destructure the necessary functions and data from CardContext
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CardContext);

  // Hook for navigation to different routes
  const navigate = useNavigate();

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    // Calculate total price based on price and quantity for each item
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Function to handle removing an item from the cart
  const handleRemoveItem = (id) => {
    removeFromCart(id); // Remove item using context function
    toast.success("Item removed from cart!"); // Show success notification
  };

  // Function to handle clearing the entire cart
  const handleClearCart = () => {
    clearCart(); // Clear all items from cart
    toast.warn("Cart has been cleared!"); // Show warning notification
  };

  // Function to handle proceeding to checkout
  const handleProceedToCheckout = () => {
    // Check if the cart is empty before proceeding
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items before proceeding!"); // Show error if cart is empty
    } else {
      navigate("/checkout"); // Navigate to checkout page
      toast.success("Proceeding to checkout!"); // Show success notification
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>

      {/* Check if the cart is empty */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")} // Navigate to product page if cart is empty
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        // Cart item list and order summary are displayed when cart has items
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Iterate through cartItems and display each item */}
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }} // Initial state for animation
                animate={{ opacity: 1, y: 0 }} // Final state for animation
                transition={{ duration: 0.4 }} // Animation duration
                className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
              >
                <div className="flex items-center">
                  {/* Display item image, title, category, and quantity controls */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-500 text-sm">Category: {item.category || "N/A"}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      {/* Decrease quantity */}
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(item.quantity - 1, 1)) // Prevent quantity from going below 1
                        }
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      {/* Input to display and update quantity */}
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Math.max(1, parseInt(e.target.value))) // Prevent invalid input
                        }
                        className="w-12 text-center border rounded appearance-none focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      {/* Increase quantity */}
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  {/* Display total price for this item */}
                  <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">(${item.price.toFixed(2)} each)</p>
                  {/* Trash button to remove item */}
                  <button
                    onClick={() => handleRemoveItem(item.id)} // Trigger removeItem function on click
                    className="text-red-500 mt-2 hover:text-red-700 text-xl"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Button to clear entire cart */}
            <button
              onClick={handleClearCart}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Clear Cart
            </button>
          </div>

          {/* Order summary sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} // Initial state for animation
            animate={{ opacity: 1, x: 0 }} // Final state for animation
            transition={{ duration: 0.5 }} // Animation duration
            className="bg-white shadow-md rounded-lg p-6 h-fit sticky top-24"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {/* Display number of items and total cost */}
            <div className="flex justify-between mb-2">
              <span>Items ({cartItems.length})</span>
              <span>${calculateTotal()}</span>
            </div>
            {/* Shipping information */}
            <div className="flex justify-between mb-4 text-gray-500">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="mb-4" />
            {/* Display total price */}
            <div className="flex justify-between mb-6 font-bold text-lg">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>

            {/* Button to proceed to checkout */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md mb-3 transition"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
            {/* Button to continue shopping */}
            <button
              onClick={() => navigate("/products")}
              className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-md transition"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
