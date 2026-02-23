// src/components/CategoryHero.jsx
import React from 'react';

export default function CategoryHero({ category }) {
  return (
    <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8">
      <img 
        src={category.heroImage || category.image} 
        alt={category.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
        <div className="text-white px-8 md:px-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {category.heroTitle || category.name}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl">
            {category.heroDescription || category.description}
          </p>
          <div className="flex gap-4 mt-6">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {category.productCount} Products
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              {category.filters?.customizable ? "Customizable" : "Fixed Designs"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}