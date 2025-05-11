// src/Components/PaymentCart.js
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function PaymentPage() {
  const { orders } = useContext(CartContext);
  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) return <p className="p-6">No recent orders.</p>;

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-semibold text-pink-800 mb-4">Payment Summary</h2>
      <div className="bg-white shadow p-4 rounded-xl mb-6">
        <h3 className="text-pink-700 font-semibold mb-2">User Info</h3>
        <p><strong>Name:</strong> {latestOrder.user.name}</p>
        <p><strong>Phone:</strong> {latestOrder.user.number}</p>
        <p><strong>Address:</strong> {latestOrder.user.address}</p>
      </div>

      <div className="bg-white shadow p-4 rounded-xl">
        <h3 className="text-pink-700 font-semibold mb-2">Ordered Items</h3>
        <ul className="mb-2">
          {latestOrder.items.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b py-1">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold text-pink-700">Total: ₹{latestOrder.total.toLocaleString()}</div>
        <div className="mt-4 text-green-600 font-semibold">Status: {latestOrder.status}</div>
      </div>
    </div>
  );
}
