import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductCatalog from './components/pages/ProductCatalog';
import CartPage from './components/pages/CartPage';
import CheckoutPage from './components/pages/CheckoutPage';
import OrderConfirmation from './components/pages/OrderConfirmation';
import NotFound from './components/pages/NotFound';
import { CardProvider } from './components/context/CardContext';
import ProductDetail from './components/ProductDetail';
import AdminDashboard from './components/pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <CardProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductCatalog />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{
            bottom: '20px',
            right: '20px',
          }}
        />
      </CardProvider>
    </Router>
  );
}

export default App;