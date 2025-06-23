import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Create a new Context for the cart and product management
export const CardContext = createContext();

// Context Provider component to wrap around the app
export const CardProvider = ({ children }) => {
  // Load cart items from localStorage if available, otherwise initialize empty
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [products, setProducts] = useState([]); // List of all products
  const [categories, setCategories] = useState([]); // List of product categories
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after search/filter
  const [searchQuery, setSearchQuery] = useState(""); // Search query input
  const [selectedCategory, setSelectedCategory] = useState("all"); // Selected category filter

  // Fetch products and categories from API when component mounts
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        const productData = await productResponse.json();
        const categoryData = await categoryResponse.json();

        setProducts(productData);
        setFilteredProducts(productData);
        setCategories(["all", ...categoryData]);
      } catch (error) {
        console.error(error); // Console error for debugging
        toast.error(
          "Failed to fetch products or categories. Please try again later."
        );
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Filter products based on search query and selected category
  const filterProducts = (query, category) => {
    let filtered = products;

    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (query.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  // Handle category selection change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  // Reset filters to default (all products, no search)
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setFilteredProducts(products);
  };

  // Add item to cart (if already in cart, increase quantity)
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove item completely from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Update quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      quantity > 0
        ? prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        : prevItems.filter((item) => item.id !== id)
    );
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Save cart items to localStorage whenever cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  // Admin function: Add a new product
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Admin function: Edit an existing product
  const editProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Admin function: Delete a product
  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  // Provide all states and handlers to children components
  return (
    <CardContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
        products,
        categories,
        filteredProducts,
        searchQuery,
        selectedCategory,
        handleSearch,
        handleCategoryChange,
        resetFilters,
        addProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
