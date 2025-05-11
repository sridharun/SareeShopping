import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [saree, setSaree] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setSaree(data))
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  if (!saree) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={saree.image} // ✅ Fixed: use full image URL directly
            alt={saree.name}
            className="w-full md:w-1/2 rounded-lg shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback.jpg"; // Optional: fallback image
            }}
          />
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-pink-800 mb-2">{saree.name}</h1>
              <p className="text-lg font-semibold text-pink-700 mb-2">₹{saree.price}</p>
              <p className="text-sm text-gray-700 mb-4">
                Elegant and traditional saree for festive and wedding occasions. Made from high-quality fabric with luxurious texture.
              </p>
              <p className="text-sm text-green-600 font-semibold">🔥 Special Offer: 10% off on prepaid orders!</p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
                onClick={() => addToCart(saree)}
              >
                Add to Cart
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => {
                  addToCart(saree);
                  navigate("/cart");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
