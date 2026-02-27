import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import CategoryBreadcrumb from './category-breadcrumb';

const CategoryHero = ({ category, productCount }) => {
  return (
    <div className="relative h-64 md:h-80 overflow-hidden">
      <img 
        src={category.heroImage || category.image} 
        alt={category.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 text-white">
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {category.heroTitle || category.name}
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            {category.heroDescription || category.description}
          </p>
          
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              <Package className="w-3 h-3 mr-1" />
              {productCount} Products
            </Badge>
            {category.filters?.customizable && (
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                Customizable Available
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;