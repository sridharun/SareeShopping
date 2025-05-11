// src/Component/ProductPage.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel-custom.css"; // custom styles if needed

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [saree, setSaree] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSaree({
          ...data,
          images: Array.isArray(data.images) ? data.images : [data.image],
        });
      })
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  if (!saree) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Carousel */}
          <div className="w-full lg:w-1/2">
            {saree.images?.length > 0 && (
              <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop
                showStatus={false}
                useKeyboardArrows
              >
                {saree.images.map((imgUrl, index) => (
                  <div key={index}>
                    <img
                      src={imgUrl}
                      alt={`Saree ${index + 1}`}
                      className="rounded-lg object-cover h-64 sm:h-80 md:h-96 w-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/fallback.jpg";
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          {/* Right - Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-pink-800 mb-2">{saree.name}</h1>
              <p className="text-lg sm:text-xl font-semibold text-pink-700 mb-2">₹{saree.price}</p>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                Elegant and traditional saree for festive and wedding occasions. Made from
                high-quality fabric with luxurious texture.
              </p>
              <p className="text-sm sm:text-base text-green-600 font-semibold">
                🔥 Special Offer: 10% off on prepaid orders!
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm sm:text-base"
                onClick={() => addToCart(saree)}
              >
                Add to Cart
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
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
