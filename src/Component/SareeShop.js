import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import axios from "axios";

export default function SareeShop() {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [sarees, setSarees] = useState([]);
  const [addedMessage, setAddedMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setSarees(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const filteredSarees =
    selectedCategory && selectedCategory !== "All"
      ? sarees.filter((saree) => saree.category === selectedCategory)
      : sarees;

  const handleAddToCart = (saree) => {
    addToCart(saree);
    setAddedMessage("Added to Cart");
    setTimeout(() => setAddedMessage(""), 2000);
  };

  const handleViewProduct = (sareeId) => {
    navigate(`/product/${sareeId}`);
  };

  return (
    <div className="min-h-screen p-6">
      {addedMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg">
          {addedMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSarees.length === 0 ? (
          <p>No sarees found for this category.</p>
        ) : (
          filteredSarees.map((saree) => (
            <div
              key={saree._id || saree.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition cursor-pointer"
            >
              <div
                className="w-full h-60 mb-4 overflow-hidden rounded-xl flex justify-center items-center"
                onClick={() => handleViewProduct(saree._id || saree.id)}
              >
                <img
                  src={saree.image}
                  alt={saree.name}
                  className="object-cover w-full h-full rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback.jpg";
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold text-pink-800">{saree.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Elegant and traditional wear.</p>
              <div className="flex justify-between items-center">
                <span className="text-pink-700 font-bold">₹{saree.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(saree)}
                    className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-3 py-1 rounded"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => handleViewProduct(saree._id || saree.id)}
                    className="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
