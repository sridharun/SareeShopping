import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category) {
      navigate(`/shop?category=${category}`);
    } else {
      navigate("/shop"); // This clears the filter
    }
  };
  
  
  return (
    <header className="bg-white shadow-md px-4 py-4 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-4 relative">
        {/* Title and Cart */}
        <div className="relative flex justify-center items-center">
          <h1 className="text-2xl font-bold text-pink-800">SareeSutra</h1>
          <div
            className="absolute right-0 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-6 text-pink-800" />
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="flex items-center justify-between">
        <nav className="flex flex-wrap gap-3">
  {["All", "Silk", "Cotton", "Linen", "Designer", "Traditional"].map((type) => (
    <button
      key={type}
      onClick={() => handleCategoryClick(type)}
      className="text-pink-700 hover:text-pink-900 font-medium text-sm sm:text-base"
    >
      {type}
    </button>
  ))}
</nav>

        </div>
      </div>
    </header>
  );
}
