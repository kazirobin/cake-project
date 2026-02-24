import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, priceData }) => {
  return (
    <Link to={`/categories/product/${product.id}`} className="block h-full group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/30 hover:shadow-lg dark:hover:shadow-gray-700/50 transition-all duration-300 h-full flex flex-col overflow-hidden hover:scale-[1.02]">
        <div className="relative overflow-hidden">
          <img 
            src={product.avatar} 
            alt={product.title} 
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-110" 
          />
          {/* Optional: Add a subtle overlay on hover */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[3rem] transition-colors duration-300">
            {product.title}
          </h3>
          
          <p className="text-lg font-bold text-orange-600 dark:text-orange-400 my-2 transition-colors duration-300">
            {priceData.displayPrice}
          </p>
          
          <div className="flex-1"></div> {/* Spacer */}
          
          <button className="w-full bg-orange-500 dark:bg-orange-600 text-white py-2.5 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium shadow-md hover:shadow-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;