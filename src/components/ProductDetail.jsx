import React, { useContext } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "react-toastify";
import { CardContext } from "./context/CardContext";

const ProductDetailPage = ({ productId }) => {
  // Use the CardContext to get the products and addToCart function
  const { products, addToCart } = useContext(CardContext);

  // Find the product details from the context
  const product = products.find((item) => item.id === productId);

  // Handle case where product is not found
  if (!product) {
    return (
      <div className="text-center text-xl text-red-600">
        Product not found. Please try again later.
      </div>
    );
  }

  return (
    <div className="product-detail-page container mx-auto py-8 px-4 max-w-4xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/3 h-auto object-cover rounded-md"
        />
        <div className="md:ml-6 flex flex-col justify-between py-4 px-4">
          {/* Product Title */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {product.title}
          </h2>

          {/* Product Description */}
          <p className="text-gray-600 text-base mb-4">{product.description}</p>

          {/* Product Price */}
          <p className="text-xl font-semibold text-gray-900 mb-6">{`Price: $${product.price.toFixed(
            2
          )}`}</p>

          {/* Product Rating */}
          <div className="flex items-center text-gray-600 text-sm mt-2">
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            <span>{product.rating.rate}</span>
            <span className="ml-1">({product.rating.count})</span>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-blue-700 transition duration-200 text-sm"
              onClick={() => {
                // Add the product to the cart
                addToCart(product);

                // Display success notification when product is added
                toast.success(`${product.title} added to cart!`);
              }}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;