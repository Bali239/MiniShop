import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "./context/CardContext";
import { ShoppingCart } from "lucide-react";

const NavBar = () => {
  // Destructure cartItems from the CardContext to access cart data
  const { cartItems } = useContext(CardContext);

  // Function to calculate total number of items in the cart
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    // Navigation bar with sticky positioning
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-1 py-3 flex justify-between items-center">
        {/* Logo Section - Link to homepage */}
        <div className="text-2xl font-extrabold text-gray-700 tracking-tight">
          <Link to="/" className="hover:text-gray-800 transition duration-300"></Link>
          <Link to="/" className="hover:text-gray-800 transition duration-300">
            Mini<span className="text-orange-500 hover:text-orange-600">Shop</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          {/* Admin Link */}
          <Link
            to="/admin"
            className="text-gray-600 hover:text-orange-500 transition duration-300 hover:scale-105"
          >
            Admin
          </Link>

          {/* Products Link */}
          <Link
            to="/products"
            className="text-gray-600 hover:text-orange-500 transition duration-300 hover:scale-105"
          >
            Products
          </Link>

          {/* Cart Link with dynamic item count */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-600 hover:text-orange-500 transition duration-300 hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-1" />
            Cart
            {/* Display item count if there are items in the cart */}
            {getCartItemCount() > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow-md">
                {getCartItemCount()}
              </span>
            )}
          </Link>

          {/* Checkout Link */}
          <Link
            to="/checkout"
            className="text-gray-600 hover:text-orange-500 transition duration-300 hover:scale-105"
          >
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
