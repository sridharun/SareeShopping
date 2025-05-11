import React, { useContext } from "react";
import { CartContext } from "./CartContext";

export default function AdminOrderPage() {
  const { orders } = useContext(CartContext);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-pink-800 mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-pink-100">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Address</th>
              <th className="text-left p-3">Items</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => {
              // Skip the order if `user` information is incomplete
              if (!order.user || !order.user.name || !order.user.number || !order.user.address) {
                return null;  // Do not render this row if user info is incomplete
              }

              return (
                <tr key={idx} className="border-t">
                  <td className="p-3">{order.user.name}</td>
                  <td className="p-3">{order.user.number}</td>
                  <td className="p-3">{order.user.address}</td>
                  <td className="p-3">
                    {order.items?.map((item, i) => (
                      <div key={i}>{item.name}</div>
                    ))}
                  </td>
                  <td className="p-3">₹{order.total}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
