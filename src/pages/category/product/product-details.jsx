import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams();

  // Fetch product details based on productId
  // This is mock data - replace with actual API call
  const product = {
    id: productId,
    name: 'Classic Chocolate Cake',
    price: 45,
    rating: 4.5,
    description: 'Rich and moist chocolate cake with creamy chocolate frosting. Perfect for any occasion.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    dietary: ['Eggless'],
    reviews: 128
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Back Link */}
      <div className="mb-4">
        <Link 
          to="/categories" 
          className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center transition-colors duration-300"
        >
          ← Back to Categories
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-lg dark:shadow-gray-800/50">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-800/50 transition-colors duration-300">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-semibold text-gray-900 dark:text-white">
                {product.rating}
              </span>
            </div>
            <span className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
              {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-4 transition-colors duration-300">
            ${product.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
            {product.description}
          </p>

          {/* Dietary Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Dietary Information:
            </h3>
            <div className="flex gap-2">
              {product.dietary.map(diet => (
                <Badge 
                  key={diet} 
                  variant="secondary"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-300"
                >
                  {diet}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;