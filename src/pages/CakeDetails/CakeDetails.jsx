// src/pages/CakeDetails/CakeDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw, 
  Package, 
  Star, 
  ChevronLeft,
  Heart,
  Share2
} from 'lucide-react';
import { 
  getProductById, 
  getRelatedProducts,
  getCategoryBySlug,
  categories 
} from '@/data/data';
import AllCards from '@/root/Components/Cards/AllCards';

export default function CakeDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = () => {
      setLoading(true);
      try {
        const productData = getProductById(productId);
        if (!productData) {
          navigate('/categories', { replace: true });
          return;
        }
        
        setProduct(productData);
        
        // Get category info from product
        const categorySlug = productData.cakeDetails.category;
        
        // Find category by slug first, then by name
        let categoryData = getCategoryBySlug(categorySlug);
        
        // If not found by slug, try to find by name
        if (!categoryData) {
          categoryData = categories.find(c => 
            c.name.toLowerCase() === categorySlug?.toLowerCase()
          );
        }
        
        setCategory(categoryData);
        
        // Get related products
        const related = getRelatedProducts(parseInt(productId));
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 animate-pulse rounded"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-20 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const { cakeDetails } = product;
  const allImages = [cakeDetails.avatar, ...(cakeDetails.additionalImages || [])];

  // Fix the back button to go to the correct category page
  const handleBack = () => {
    if (category) {
      navigate(`/categories/${category.slug}`);
    } else {
      navigate('/categories');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to {category ? category.name : 'Categories'}
      </button>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden border">
            <img 
              src={allImages[selectedImage]} 
              alt={cakeDetails.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
              }}
            />
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-purple-600' : 'border-transparent hover:border-purple-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${cakeDetails.title} ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150x150?text=No+Image";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Category */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{cakeDetails.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 capitalize">Category:</span>
              {category ? (
                <Link 
                  to={`/categories/${category.slug}`}
                  className="text-purple-600 hover:underline text-sm"
                >
                  {category.name}
                </Link>
              ) : (
                <span className="text-sm text-gray-700 capitalize">{cakeDetails.category}</span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <Star 
                  key={star} 
                  className={`h-5 w-5 ${
                    star <= Math.floor(cakeDetails.rating.value) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {cakeDetails.rating.value} ({cakeDetails.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="border-y py-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-purple-600">
                ${cakeDetails.pricing.discounted.toFixed(2)}
              </span>
              {cakeDetails.pricing.original > cakeDetails.pricing.discounted && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${cakeDetails.pricing.original.toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
                    Save ${(cakeDetails.pricing.original - cakeDetails.pricing.discounted).toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {cakeDetails.stock > 10 ? (
              <span className="text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                In Stock ({cakeDetails.stock} available)
              </span>
            ) : cakeDetails.stock > 0 ? (
              <span className="text-orange-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                Only {cakeDetails.stock} left in stock
              </span>
            ) : (
              <span className="text-red-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{cakeDetails.description}</p>
          </div>

          {/* Features */}
          {cakeDetails.features && cakeDetails.features.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {cakeDetails.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(cakeDetails.stock, quantity + 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            {cakeDetails.deliveryInfo?.map((info, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                {info.icon === 'Truck' && <Truck className="h-4 w-4" />}
                {info.icon === 'Shield' && <Shield className="h-4 w-4" />}
                {info.icon === 'RotateCcw' && <RotateCcw className="h-4 w-4" />}
                {info.icon === 'Package' && <Package className="h-4 w-4" />}
                <span>{info.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications */}
      {cakeDetails.specifications && cakeDetails.specifications.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cakeDetails.specifications.map((spec, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">{spec.label}</p>
                <p className="font-semibold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nutrition Info */}
      {cakeDetails.nutritionInfo && cakeDetails.nutritionInfo.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cakeDetails.nutritionInfo.map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <AllCards 
            title="You might also like"
            subtitle="Related products you may be interested in"
            cakes={relatedProducts}
            initialDesktop={4}
            initialLaptop={3}
            initialMobile={2}
            left={true}
          />
        </div>
      )}
    </div>
  );
}