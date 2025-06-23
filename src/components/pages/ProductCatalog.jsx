import React, { useContext, useEffect } from "react";
import { CardContext } from "../context/CardContext"; // Context to manage global state
import ProductCard from "../ProductCard";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCatalog = () => {
  // Extracting context values and functions from CardContext
  const {
    filteredProducts, // List of filtered products based on search and category
    categories, // Available product categories
    searchQuery, // Current search query entered by the user
    selectedCategory, // Currently selected product category
    handleSearch, // Function to handle search input changes
    handleCategoryChange, // Function to handle category selection changes
    resetFilters, // Function to reset all filters
  } = useContext(CardContext); // Using React Context to manage state

  // Effect hook to show a warning when no products match the current filters
  useEffect(() => {
    if (
      filteredProducts.length === 0 &&
      (searchQuery !== "" || selectedCategory !== "All")
    ) {
      toast.warning("No products matched your search.");
    }
  }, [filteredProducts, searchQuery, selectedCategory]); // Trigger effect when filters change

  // Function to clear search and category filters and reset the state
  const handleClearFilters = () => {
    resetFilters(); // Reset search and category filters
    toast.success("Filters cleared successfully!"); // Show success message
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen p-6 md:p-10" // Wrapper div for the entire page
      initial={{ opacity: 0, y: 30 }} // Initial animation state
      animate={{ opacity: 1, y: 0 }} // Final animation state
      exit={{ opacity: 0, y: -30 }} // Exit animation state when transitioning away
      transition={{ duration: 0.6, ease: "easeInOut" }} // Animation duration and easing
    >
      <div className="flex flex-col md:flex-row gap-5"></div>
      <div className="flex flex-col md:flex-row gap-5">
        {/* Filter Sidebar: Allows user to search and filter products */}
        <motion.aside
          className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-24" // Styling for the filter sidebar
          initial={{ opacity: 0, x: -50 }} // Animation for entering from the left
          animate={{ opacity: 1, x: 0 }} // Final animation state
          transition={{ duration: 0.6, ease: "easeOut" }} // Animation duration and easing
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            Filter Products
          </h2>
          {/* Search Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery} // Controlled input using searchQuery
              onChange={(e) => handleSearch(e.target.value)} // Update searchQuery on input change
              className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={selectedCategory} // Controlled select using selectedCategory
              onChange={(e) => handleCategoryChange(e.target.value)} // Update selectedCategory on change
              className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                  {/* Capitalize category name */}
                </option>
              ))}
            </select>
          </div>
          {/* Clear Filters Button */}
          <button
            onClick={handleClearFilters} // Clear filters and reset state
            className="mt-6 w-full bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition font-semibold"
          >
            Clear Filters
          </button>
        </motion.aside>

        {/* Product Display Section */}
        <motion.section
          className="w-full md:w-3/4" // Section containing the product list
          initial={{ opacity: 0, x: 50 }} // Animation for entering from the right
          animate={{ opacity: 1, x: 0 }} // Final animation state
          transition={{ duration: 0.6, ease: "easeOut" }} // Animation duration and easing
        >
          {/* Header for product count */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {filteredProducts.length > 0
                ? `Showing ${filteredProducts.length} Product${
                    filteredProducts.length > 1 ? "s" : ""
                  }`
                : "No Products Found"}
            </h2>
          </div>
          {/* Displaying filtered products */}
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 text-center text-lg mt-10">
              No products found.
            </p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              initial={{ opacity: 0 }} // Initial animation state
              animate={{ opacity: 1 }} // Final animation state
              transition={{ staggerChildren: 0.1 }} // Animation stagger for each product
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }} // Animation for scaling up the product card
                  animate={{ opacity: 1, scale: 1 }} // Final animation state
                  transition={{ duration: 0.4 }} // Transition duration
                >
                  <ProductCard product={product} />{" "}
                  {/* Display individual product card */}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
};

export default ProductCatalog;