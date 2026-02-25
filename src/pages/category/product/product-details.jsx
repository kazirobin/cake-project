import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw, 
  Package,
  Check,
  AlertCircle,
  Minus,
  Plus
} from 'lucide-react';
import { useCart } from '@/Hooks/cart-context';
import productService from './product-service';
import ProductCard from './product-card';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFavoriteMessage, setShowFavoriteMessage] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const productData = productService.getFullProductData(productId);
  const product = productData?.cakeDetails;
  const relatedProducts = productService.getRelatedProducts(productId);

  // Load favorite status from localStorage on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(parseInt(productId)));
  }, [productId]);

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const productIdNum = parseInt(productId);
    
    let newFavorites;
    if (isFavorite) {
      // Remove from favorites
      newFavorites = favorites.filter(id => id !== productIdNum);
    } else {
      // Add to favorites
      newFavorites = [...favorites, productIdNum];
      setShowFavoriteMessage(true);
      setTimeout(() => setShowFavoriteMessage(false), 2000);
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button 
          onClick={() => navigate('/categories')}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Browse Products
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.pricing.discounted,
        image: product.avatar,
      });
    }
    
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const getIcon = (iconName) => {
    const icons = {
      Truck: <Truck className="w-5 h-5" />,
      Shield: <Shield className="w-5 h-5" />,
      RotateCcw: <RotateCcw className="w-5 h-5" />,
      Package: <Package className="w-5 h-5" />
    };
    return icons[iconName] || <Package className="w-5 h-5" />;
  };

  const allImages = [product.avatar, ...(product.additionalImages || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Success Messages */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn flex items-center gap-2">
          <Check className="w-5 h-5" />
          Added to cart successfully!
        </div>
      )}

      {showFavoriteMessage && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn flex items-center gap-2">
          <Heart className="w-5 h-5 fill-white" />
          Added to favorites!
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 flex-wrap">
            <li>
              <Link to="/" className="text-gray-500 hover:text-orange-600 dark:text-gray-400">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/categories" className="text-gray-500 hover:text-orange-600 dark:text-gray-400">
                Categories
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <img 
                src={allImages[selectedImage]} 
                alt={product.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image';
                }}
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-orange-500 scale-105' 
                        : 'border-transparent hover:border-orange-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.title} - View ${index + 1}`} 
                      className="w-full h-20 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x80?text=Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            {/* Title and SKU */}
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.SKU}</p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating.stars
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                  {product.rating.value}
                </span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {product.pricing.currency}{product.pricing.discounted}
                </p>
                {product.pricing.original > product.pricing.discounted && (
                  <>
                    <p className="text-lg text-gray-400 line-through">
                      {product.pricing.currency}{product.pricing.original}
                    </p>
                    <Badge className="bg-green-500 text-white">
                      Save {product.pricing.currency}
                      {(product.pricing.original - product.pricing.discounted).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>
              <p className={`text-sm mt-2 ${
                product.stock > 0 ? 'text-green-600' : 'text-red-500'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description:</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-2 text-sm text-gray-500">
                  (Max: {product.stock})
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              {/* Single Heart Icon in Action Buttons */}
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleFavorite}
                className={`border-gray-300 dark:border-gray-600 transition-all ${
                  isFavorite ? 'border-red-200 dark:border-red-800' : ''
                }`}
              >
                <Heart 
                  className={`w-4 h-4 transition-all ${
                    isFavorite 
                      ? 'fill-red-500 text-red-500 scale-110' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`} 
                />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  // You can add a toast notification here
                }}
                className="border-gray-300 dark:border-gray-600"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Customizable Badge */}
            {product.customizable && (
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-orange-600 dark:text-orange-400 font-medium">
                  ✨ This cake is customizable! You can add a personalized message.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Product Features:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="specifications" className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Specifications:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-600 dark:text-gray-400">{spec.label}:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Delivery Information:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.deliveryInfo?.map((info, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-orange-500">{getIcon(info.icon)}</span>
                    <span className="text-gray-600 dark:text-gray-300">{info.text}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Nutrition Facts (per serving):</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.nutritionInfo?.map((info, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{info.label}</div>
                    <div className="font-bold text-gray-900 dark:text-white">{info.value}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;