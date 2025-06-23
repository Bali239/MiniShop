import React, { useContext, useState } from "react";
import { CardContext } from "./context/CardContext"; // Importing the context to access cart functionality
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import ProductDetailPage from "./ProductDetail";

const ProductCard = ({ product }) => {
  // Destructure addToCart function from CardContext
  const { addToCart } = useContext(CardContext);

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle when the user clicks on 'Details' button
  const handleDetailsClick = () => {
    setIsModalOpen(true); // Open the modal to show product details
    toast.info(`Viewing details of ${product.title}`, { duration: 2000 }); // Show a toast notification
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    addToCart(product); // Add product to the cart
    toast.success(`${product.title} added to cart!`); // Show success notification
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Set modal state to false to close it
  };

  return (
    <>
      {/* Product Card */}
      <div className="product-card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4">
        <div className="relative">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain"
          />
          {/* Product Category Badge */}
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.category}
          </span>
        </div>

        {/* Product Details Section */}
        <div className="mt-4">
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.title}
          </h3>
          {/* Product Price */}
          <p className="text-orange-500 text-xl font-bold mt-2">
            ${product.price.toFixed(2)}
          </p>
          {/* Product Rating */}
          <div className="flex items-center text-gray-600 text-sm mt-2">
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            <span>{product.rating.rate}</span>
            <span className="ml-1">({product.rating.count})</span>
          </div>
        </div>

        {/* Buttons: Details and Add to Cart */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 border border-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-100 transition duration-200 text-sm"
            onClick={handleDetailsClick}
          >
            Details
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-blue-700 transition duration-200 text-sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>

      {/* Modal to show Product Detail Page */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProductDetailPage productId={product.id} />
      </Modal>
    </>
  );
};

export default ProductCard;
