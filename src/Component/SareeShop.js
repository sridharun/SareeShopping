// src/Component/SareeShop.js
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    <div className="min-h-screen p-4 sm:p-6">
      {addedMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm sm:text-base">
          {addedMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSarees.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No sarees found for this category.</p>
        ) : (
          filteredSarees.map((saree) => (
            <div
              key={saree._id || saree.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition cursor-pointer flex flex-col"
              onClick={() => handleViewProduct(saree._id || saree.id)}
            >
              <div className="w-full h-56 sm:h-60 md:h-64 lg:h-72 mb-4 overflow-hidden rounded-xl">
                <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
                  {(saree.images || [saree.image]).map((img, index) => (
                    <div key={index} className="h-full">
                      <img
                        src={img}
                        alt={`saree-${index}`}
                        className="object-cover w-full h-full rounded-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/fallback.jpg";
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-pink-800">{saree.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Elegant and traditional wear.</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-pink-700 font-bold">₹{saree.price}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(saree);
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white text-xs sm:text-sm px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
