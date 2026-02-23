// src/components/SingleCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck } from 'lucide-react';

const SingleCard = ({ cakeData }) => {
  if (!cakeData) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Added to cart:", cakeData);
  };

  return (
    <Link
      to={`/categories/product/${cakeData?.id}`}  // Updated to match new route
      className="border border-gray-200 hover:border-purple-300 cursor-pointer rounded-xl group shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden block"
    >
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img
          src={cakeData?.avatar}
          alt={cakeData?.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
        
        {cakeData?.pricing?.discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cakeData?.pricing?.discountPercentage}% OFF
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-yellow-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <span>⭐</span>
          <span>{cakeData?.rating?.value}</span>
          <span className="text-gray-400">({cakeData?.rating?.count})</span>
        </div>
      </div>

      <div className="px-3 py-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold group-hover:text-purple-600 line-clamp-1">
            {cakeData?.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 capitalize">{cakeData?.category?.replace('-', ' ')}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {cakeData?.features?.slice(0, 2).map((feature, index) => (
            <span 
              key={index}
              className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {feature.split(' ')[0]}...
            </span>
          ))}
          {cakeData?.customizable && (
            <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
              Customizable
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="bg-orange-100 text-orange-600 w-20 text-center rounded-full text-sm font-medium px-2 py-1">
            🔥 {cakeData?.stock} sold
          </p>
          
          {cakeData?.stock > 10 ? (
            <span className="text-green-600 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
              In Stock
            </span>
          ) : cakeData?.stock > 0 ? (
            <span className="text-orange-600 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
              Only {cakeData?.stock} left
            </span>
          ) : (
            <span className="text-red-600 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
              Out of Stock
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-600">
              ${cakeData?.pricing?.discounted?.toFixed(2)}
            </h2>
            {cakeData?.pricing?.original && (
              <p className="text-xs text-gray-400 line-through">
                ${cakeData?.pricing?.original?.toFixed(2)}
              </p>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Truck className="h-3 w-3" />
          Free delivery
        </p>
      </div>
    </Link>
  );
};

export default SingleCard;