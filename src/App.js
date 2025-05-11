import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { CartProvider } from "./Component/CartContext";
import SareeShop from "./Component/SareeShop";
import CartPage from "./Component/CartPage";
import ProductPage from "./Component/ProductPage";
import PaymentPage from "./Component/PaymentCart";
import AdminOrderPage from "./Component/AdminOrderPage";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<SareeShop />} /> {/* ✅ Add this */}

          <Route path="/shop" element={<SareeShop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin/orders" element={<AdminOrderPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
