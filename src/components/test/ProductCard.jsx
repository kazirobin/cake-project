import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    id,
    slug,
    title,
    price,
    images,
    stock,
    flavour,
    size,
    isBestSeller,
    category,
  } = product;

  const imageUrl = images?.[0] || category?.image || "/placeholder-cake.jpg";

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isBestSeller && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
            Best Seller
          </span>
        )}
        {stock <= 5 && stock > 0 && (
          <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Only {stock} left
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{category?.name || "Cake"}</div>
        
        <Link
          to={`/product/${slug}`}
          className="font-semibold text-lg leading-tight hover:text-indigo-600 transition-colors line-clamp-2"
        >
          {title}
        </Link>

        <p className="text-sm text-gray-600 mt-1">{flavour} • {size}</p>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-gray-900">৳{price}</span>
          </div>
          
          <Link
            to={`/product/${slug}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;