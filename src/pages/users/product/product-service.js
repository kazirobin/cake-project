// product-service.js
class ProductService {
  constructor(products) {
    this.products = products;
  }

  // Generate default delivery date (3 days from today)
  getDefaultDeliveryDate() {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split('T')[0];
  }

  // Generate default size based on product type
  getDefaultSize(product) {
    if (product.type === 'bakery') {
      return product.attributes?.defaultSize || '1kg';
    }
    if (product.type === 'electronics') {
      return product.attributes?.defaultStorage || 'Standard';
    }
    return 'Standard';
  }

  // Generate default flavor for bakery products
  getDefaultFlavor(product) {
    if (product.type === 'bakery') {
      return product.attributes?.defaultFlavor || 'Original';
    }
    return null;
  }

  // Format product for cart with default values
  formatForCart(product, customizations = {}) {
    const today = new Date();
    const deliveryDate = customizations.deliveryDate || this.getDefaultDeliveryDate();
    
    // Determine if product is customizable
    const isCustomizable = product.attributes?.customizable === true || 
                          product.customizable === true;

    // Base cart item with all product data
    const cartItem = {
      // Core identification
      id: product._id,
      _id: product._id,
      title: product.title,
      name: product.title,
      
      // Pricing
      price: product.price?.discount || product.price?.regular || 0,
      regularPrice: product.price?.regular || 0,
      currency: product.price?.currency || "$",
      
      // Images
      image: this.getPrimaryImage(product),
      images: product.images || [],
      additionalImages: product.additionalImages || [],
      
      // Product metadata
      type: product.type || "regular",
      categoryId: product.categoryId,
      brand: product.brand,
      slug: product.slug,
      
      // Stock
      stock: product.stock || 0,
      
      // Ratings
      rating: product.rating?.average || 0,
      reviewCount: product.rating?.totalReviews || 0,
      
      // All product details
      attributes: product.attributes || {},
      specifications: product.specifications || {},
      features: product.features || [],
      description: product.description || "",
      deliveryInfo: product.deliveryInfo || [],
      
      // Quantity
      quantity: 1,
      
      // Customization data (always include for consistency)
      isCustomizable: isCustomizable,
      customizations: isCustomizable ? customizations : null,
      
      // Always include default values for consistent display
      size: customizations.size || (isCustomizable ? null : this.getDefaultSize(product)),
      flavor: customizations.flavor || (isCustomizable ? null : this.getDefaultFlavor(product)),
      cakeType: customizations.cakeType || (product.type === 'bakery' ? 'Normal' : null),
      deliveryDate: deliveryDate,
      message: customizations.message || null,
      
      // For electronics
      color: customizations.color || product.attributes?.defaultColor || null,
      storage: customizations.storage || product.attributes?.defaultStorage || null,
      ram: customizations.ram || product.attributes?.defaultRam || null,
      
      // Timestamp
      addedAt: new Date().toISOString()
    };

    return cartItem;
  }

  getPrimaryImage(product) {
    if (product.avatar) return product.avatar;
    if (product.images) {
      const primary = product.images.find(img => img.isPrimary);
      if (primary) return primary.url;
      if (product.images[0]) return product.images[0].url;
    }
    return "https://via.placeholder.com/300";
  }

  getProductById(id) {
    const product = this.products.find(p => p._id === id);
    if (!product) return null;
    return product;
  }

  getRelatedProducts(productId) {
    const product = this.getProductById(productId);
    if (!product || !product.relatedProducts) return [];
    return product.relatedProducts
      .map(id => this.getProductById(id))
      .filter(p => p !== null);
  }
}

export default ProductService;