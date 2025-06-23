import React, { useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { CardContext } from "../context/CardContext"; // Context for managing products and categories

const AdminDashboard = () => {
  // Extract context values
  const { products, categories, addProduct, editProduct, deleteProduct } =
    useContext(CardContext);

  // State for form data and edit status
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Track if the user is editing an existing product
  const [editProductId, setEditProductId] = useState(null); // Store the ID of the product being edited
  const productListRef = useRef(null); // Reference for scrolling to the product list

  // Function to scroll to the top of the page smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to scroll to the product list smoothly
  const scrollToProductList = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and store the image as a base64 string
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result }); // Store image data as base64
    };
    reader.readAsDataURL(file);
  };

  // Handle adding a new product
  const handleAddProduct = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.title || !formData.price || !formData.category || !formData.image) {
      toast.error("Please fill in all fields."); // Show an error if fields are missing
      return;
    }

    const newProduct = {
      id: Date.now(), // Use timestamp as product ID
      ...formData, // Spread the form data to create a new product object
    };

    // Add the new product and reset form
    addProduct(newProduct);
    setFormData({ title: "", price: "", description: "", category: "", image: "" });
    toast.success("Product added successfully!");
    setTimeout(scrollToProductList, 300); // Scroll to the product list after adding
  };

  // Start editing a product by populating the form with existing product details
  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditProductId(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    });
    scrollToTop(); // Scroll to the top when starting to edit
  };

  // Handle saving the edited product
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedProduct = { id: editProductId, ...formData }; // Create updated product object

    // Update the product and reset form
    editProduct(updatedProduct);
    setIsEditing(false);
    setEditProductId(null);
    setFormData({ title: "", price: "", description: "", category: "", image: "" });
    toast.success("Product updated successfully!");
    setTimeout(scrollToProductList, 300); // Scroll to the product list after saving changes
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    toast.success("Product deleted successfully!");
    scrollToTop(); // Scroll to the top after deletion
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

      {/* Form for adding or editing a product */}
      <motion.form
        onSubmit={isEditing ? handleSaveEdit : handleAddProduct} // Switch between add and edit mode
        className="bg-white p-8 rounded-lg shadow-lg mb-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form fields for product data */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Price</label>
            <input
              type="number"
              name="price"
              placeholder="0"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              {/* Render categories dynamically */}
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize first letter */}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Image preview */}
        {formData.image && (
          <div className="mt-6 text-center">
            <motion.img
              src={formData.image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          {isEditing ? 'Save Changes' : 'Add Product'}
        </button>
      </motion.form>

      {/* Product list */}
      <div ref={productListRef} className="bg-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Product List</h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {/* Table headers */}
                <th className="border border-gray-300 p-4">Image</th>
                <th className="border border-gray-300 p-4">Title</th>
                <th className="border border-gray-300 p-4">Price</th>
                <th className="border border-gray-300 p-4">Category</th>
                <th className="border border-gray-300 p-4">Edit</th>
                <th className="border border-gray-300 p-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {/* Render products dynamically with animations */}
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    className="hover:bg-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="border border-gray-300 p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="border border-gray-300 p-4">{product.title}</td>
                    <td className="border border-gray-300 p-4">${product.price}</td>
                    <td className="border border-gray-300 p-4">{product.category}</td>
                    <td className="border border-gray-300 p-4">
                      <button
                        onClick={() => handleEditProduct(product)} // Trigger editing
                        className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-medium"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border border-gray-300 p-4">
                      <button
                        onClick={() => handleDeleteProduct(product.id)} // Trigger deletion
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
