// src/lib/price-formatter.js
export const formatPriceData = (product) => {
  const pricing = product.cakeDetails.pricing;
  
  if (pricing && pricing.discounted) {
    return {
      discounted: true,
      currency: pricing.currency || '$',
      discountedPrice: pricing.discounted,
      originalPrice: pricing.original,
      discountPercentage: pricing.discountPercentage,
      displayPrice: `${pricing.currency || '$'}${pricing.discounted}`
    };
  }
  
  return {
    discounted: false,
    currency: '$',
    price: product.cakeDetails.price,
    displayPrice: `$${product.cakeDetails.price}`
  };
};