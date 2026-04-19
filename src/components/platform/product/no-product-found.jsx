import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NoProductsFound = () => {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🍰</div>
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-gray-500 mb-4">
        No products available in this category yet.
      </p>
      <Button asChild variant="outline">
        <Link to="/categories">Browse Other Categories</Link>
      </Button>
    </div>
  );
};

export default NoProductsFound;