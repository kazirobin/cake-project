import productsData from '@/data/products.json';

class ProductService {
  constructor() {
    this.products = productsData;
  }

  getAllProducts() {
    return this.products.map(item => item.cakeDetails);
  }

  getProductById(id) {
    const product = this.products.find(item => item.cakeDetails.id === parseInt(id));
    return product ? product.cakeDetails : null;
  }

  getFullProductData(id) {
    return this.products.find(item => item.cakeDetails.id === parseInt(id)) || null;
  }

  getRelatedProducts(productId, limit = 4) {
    const currentProduct = this.getFullProductData(productId);
    if (!currentProduct) return [];

    const relatedIds = currentProduct.relatedProducts || [];
    return relatedIds
      .map(id => this.getProductById(id))
      .filter(product => product !== null)
      .slice(0, limit);
  }

  getProductsByCategory(categoryId) {
    return this.products
      .filter(item => item.cakeDetails.categoryIds.includes(categoryId))
      .map(item => item.cakeDetails);
  }

  searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return this.products
      .filter(item => 
        item.cakeDetails.title.toLowerCase().includes(searchTerm) ||
        item.cakeDetails.description.toLowerCase().includes(searchTerm)
      )
      .map(item => item.cakeDetails);
  }

  getFeaturedProducts(limit = 4) {
    // You can customize this logic to get featured products
    // For now, just return the first 4 products
    return this.getAllProducts().slice(0, limit);
  }

  getNewArrivals(limit = 4) {
    // Get products by highest ID (newest products)
    return this.getAllProducts()
      .sort((a, b) => b.id - a.id)
      .slice(0, limit);
  }

  getProductsByPriceRange(min, max) {
    return this.getAllProducts()
      .filter(product => product.price >= min && product.price <= max);
  }

  getDiscountedProducts() {
    return this.getAllProducts()
      .filter(product => product.pricing.discountPercentage > 0);
  }
}

export default new ProductService();