import data from '@/data/data.json';

class ProductService {
  constructor() {
    this.data = data;
    this.products = data.products || [];
    this.categories = data.categories || [];
  }

  getAllProducts() {
    return this.products.map(product => this.normalizeProduct(product));
  }

  getProductById(id) {
    const product = this.products.find(item => item._id === id);
    if (!product) return null;
    
    return this.normalizeProduct(product);
  }

  getFullProductData(id) {
    const product = this.products.find(item => item._id === id);
    if (!product) return null;
    
    return {
      cakeDetails: this.normalizeProduct(product)
    };
  }

  normalizeProduct(product) {
    // Handle both price structures (price object or pricing object)
    const price = product.price || {};
    const pricing = {
      regular: price.regular || 0,
      discounted: price.discount || price.regular || 0,
      currency: price.currency || 'USD',
      discountPercentage: price.discount ? 
        Math.round(((price.regular - price.discount) / price.regular) * 100) : 0
    };

    // Handle images - IMPROVED VERSION
    // Get primary image
    const avatar = product.images?.find(img => img.isPrimary)?.url || 
                  product.images?.[0]?.url || 
                  'https://via.placeholder.com/500';
    
    // Get all images including both from images array and additionalImages
    let allImageUrls = [];
    
    // Add images from product.images array
    if (product.images && Array.isArray(product.images)) {
      product.images.forEach(img => {
        if (img.url && !allImageUrls.includes(img.url)) {
          allImageUrls.push(img.url);
        }
      });
    }
    
    // Add additionalImages if they exist (top-level property)
    if (product.additionalImages && Array.isArray(product.additionalImages)) {
      product.additionalImages.forEach(img => {
        if (img && typeof img === 'string' && !allImageUrls.includes(img)) {
          allImageUrls.push(img);
        }
      });
    }
    
    // Also check if product has additionalImages from different key names
    const otherImageKeys = ['additional_images', 'extraImages', 'moreImages', 'gallery'];
    otherImageKeys.forEach(key => {
      if (product[key] && Array.isArray(product[key])) {
        product[key].forEach(img => {
          if (img && typeof img === 'string' && !allImageUrls.includes(img)) {
            allImageUrls.push(img);
          }
        });
      }
    });
    
    // Create additionalImages array (all images except the primary/avatar)
    const additionalImages = allImageUrls.filter(url => url !== avatar);
    
    // Handle categoryIds
    const categoryIds = Array.isArray(product.categoryId) 
      ? product.categoryId 
      : [product.categoryId].filter(Boolean);

    // Check if customizable
    const customizable = product.attributes?.customizable === true || 
                        product.filters?.customizable === true ||
                        product.customizable === true;

    return {
      id: product._id,
      _id: product._id,
      title: product.title,
      slug: product.slug,
      description: product.description || product.metaDescription || '',
      avatar: avatar,
      additionalImages: additionalImages, // This will contain all non-primary images
      allImages: allImageUrls, // Added for convenience - all images including primary
      images: product.images || [],
      price: price,
      pricing: pricing,
      categoryIds: categoryIds,
      categoryId: product.categoryId,
      brand: product.brand,
      rating: product.rating || { average: 0, totalReviews: 0 },
      attributes: product.attributes || {},
      specifications: product.specifications || {},
      features: product.features || [],
      deliveryInfo: product.deliveryInfo || [],
      stock: product.stock || 0,
      status: product.status,
      type: product.type,
      customizable: customizable,
      relatedProducts: product.relatedProducts || [],
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      metaTitle: product.metaTitle,
      metaDescription: product.metaDescription,
      variants: product.variants || []
    };
  }

  getRelatedProducts(productId, limit = 4) {
    const currentProduct = this.getProductById(productId);
    if (!currentProduct) return [];

    const relatedIds = currentProduct.relatedProducts || [];
    
    // If no related products defined, return random products from same category
    if (relatedIds.length === 0 && currentProduct.categoryIds?.length > 0) {
      const categoryId = currentProduct.categoryIds[0];
      return this.getProductsByCategory(categoryId)
        .filter(p => p._id !== productId)
        .slice(0, limit);
    }

    // Handle both string and number IDs in relatedProducts
    return relatedIds
      .map(id => {
        // Convert to string if it's a number for consistent comparison
        const searchId = typeof id === 'number' ? id.toString() : id;
        return this.getProductById(searchId);
      })
      .filter(product => product !== null)
      .slice(0, limit);
  }

  getProductsByCategory(categoryId) {
    return this.getAllProducts()
      .filter(item => item.categoryIds?.includes(categoryId));
  }

  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.getAllProducts()
      .filter(item => 
        item.title?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.brand?.toLowerCase().includes(searchTerm) ||
        item.metaDescription?.toLowerCase().includes(searchTerm)
      );
  }

  getFeaturedProducts(limit = 4) {
    // Get products with high ratings
    return this.getAllProducts()
      .filter(p => p.rating?.average >= 4.5)
      .slice(0, limit);
  }

  getNewArrivals(limit = 4) {
    // Sort by creation date (newest first)
    return this.getAllProducts()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }

  getProductsByPriceRange(min, max) {
    return this.getAllProducts()
      .filter(product => {
        const price = product.pricing?.discounted || product.price?.discount || product.price?.regular;
        return price >= min && price <= max;
      });
  }

  getDiscountedProducts() {
    return this.getAllProducts()
      .filter(product => {
        const discount = product.price?.discount || product.pricing?.discountPercentage;
        return discount > 0;
      });
  }

  getProductsByType(type) {
    return this.getAllProducts()
      .filter(product => product.type === type);
  }

  getCustomizableProducts() {
    return this.getAllProducts()
      .filter(product => product.customizable === true);
  }

  getCategoryById(categoryId) {
    return this.categories.find(cat => cat._id === categoryId) || null;
  }
}

export default new ProductService();