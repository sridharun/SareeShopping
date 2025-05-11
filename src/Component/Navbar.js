import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category) {
      navigate(`/shop?category=${category}`);
    } else {
      navigate("/shop"); // Clears the filter
    }
  };

  return (
    <header className="bg-white shadow-md px-4 py-4 sm:px-6 sm:py-6 w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo and Cart */}
        <div className="w-full sm:w-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-800">SareeSutra</h1>
          <div
            className="sm:hidden cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-6 text-pink-800" />
          </div>
        </div>

        {/* Categories */}
        <nav className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-sm sm:text-base">
          {["All", "Silk", "Cotton", "Linen", "Designer", "Traditional"].map((type) => (
            <button
              key={type}
              onClick={() => handleCategoryClick(type)}
              className="text-pink-700 hover:text-pink-900 font-medium transition"
            >
              {type}
            </button>
          ))}
        </nav>

        {/* Cart for larger screens */}
        <div
          className="hidden sm:block cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-6 h-6 text-pink-800" />
        </div>
      </div>
    </header>
  );
}
