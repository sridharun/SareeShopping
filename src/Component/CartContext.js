// src/Component/CartContext.js
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item) => setCartItems((prev) => [...prev, item]);
  const removeFromCart = (index) => setCartItems((prev) => prev.filter((_, i) => i !== index));
  const addOrder = (order) => setOrders((prev) => [...prev, order]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, orders, addOrder }}>
      {children}
    </CartContext.Provider>
  );
};
