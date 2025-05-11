// src/Components/PaymentCart.js
import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function PaymentPage() {
  const { orders } = useContext(CartContext);
  const latestOrder = orders[orders.length - 1];

  if (!latestOrder) return <p className="p-6 text-center">No recent orders.</p>;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <h2 className="text-xl sm:text-2xl font-semibold text-pink-800 mb-4 text-center sm:text-left">
        Payment Summary
      </h2>

      {/* User Info Card */}
      <div className="bg-white shadow p-4 sm:p-6 rounded-xl mb-6">
        <h3 className="text-pink-700 font-semibold mb-2 text-lg">User Info</h3>
        <div className="space-y-1 text-sm sm:text-base">
          <p><strong>Name:</strong> {latestOrder.user.name}</p>
          <p><strong>Phone:</strong> {latestOrder.user.number}</p>
          <p><strong>Address:</strong> {latestOrder.user.address}</p>
        </div>
      </div>

      {/* Ordered Items Card */}
      <div className="bg-white shadow p-4 sm:p-6 rounded-xl">
        <h3 className="text-pink-700 font-semibold mb-2 text-lg">Ordered Items</h3>
        <ul className="divide-y divide-gray-200 mb-3 text-sm sm:text-base">
          {latestOrder.items.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold text-pink-700 text-base sm:text-lg">
          Total: ₹{latestOrder.total.toLocaleString()}
        </div>
        <div className="mt-3 text-green-600 font-semibold text-sm sm:text-base">
          Status: {latestOrder.status}
        </div>
      </div>
    </div>
  );
}
