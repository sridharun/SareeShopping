// src/Components/CartPage.js
import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function CartPage() {
    const { cartItems, removeFromCart, addOrder } = useContext(CartContext);
    const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", number: "", address: "" });
  const [confirmed, setConfirmed] = useState(false);

  const parsePrice = (price) => parseInt(String(price).replace(/[₹,]/g, ""));
  const total = cartItems.reduce((sum, item) => sum + parsePrice(item.price), 0);

  const handleBuyNowClick = () => {
    setShowForm(true);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    if (userInfo.name && userInfo.number && userInfo.address) {
      setConfirmed(true);
    } else {
      alert("Please fill all the fields.");
    }
  };

  const handleProceedToPayment = () => {
    const order = {
      user: userInfo,
      items: cartItems,
      total,
      status: "Ordered",
    };
    addOrder(order);
    navigate("/payment");
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-semibold text-pink-800 mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item, idx) => (
              <li key={idx} className="flex items-center justify-between bg-white shadow p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded" />
                  <div>
                    <h3 className="text-pink-800 font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(idx)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center text-lg font-semibold text-pink-800 mb-4">
            <span>Total:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

          <button
            onClick={handleBuyNowClick}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded shadow-md transition mb-4"
          >
            Buy Now
          </button>

          {showForm && !confirmed && (
            <div className="bg-gray-100 p-4 rounded-xl mb-4">
              <h4 className="text-pink-700 font-semibold mb-2">Enter Your Details</h4>
              <input
                type="text"
                placeholder="Name"
                className="w-full mb-2 p-2 border rounded"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full mb-2 p-2 border rounded"
                value={userInfo.number}
                onChange={(e) => setUserInfo({ ...userInfo, number: e.target.value })}
              />
              <textarea
                placeholder="Address"
                className="w-full mb-2 p-2 border rounded"
                value={userInfo.address}
                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
              ></textarea>
              <button
                onClick={handleConfirm}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          )}

          {confirmed && (
            <div className="bg-gray-100 p-4 rounded-xl">
              <h4 className="text-pink-700 font-semibold mb-2">Shipping Details</h4>
              <p><strong>Name:</strong> {userInfo.name}</p>
              <p><strong>Phone:</strong> {userInfo.number}</p>
              <p><strong>Address:</strong> {userInfo.address}</p>

              <button
  onClick={handleProceedToPayment}
  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
>
  Proceed to Payment
</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
