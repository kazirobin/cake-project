import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { slug, name, description, image, cakes } = category;

  return (
    <Link to={`/categories/${slug}`} className="block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-700/30">
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="grid flex-1 grid-rows-[auto_1fr_auto] gap-2 p-4">
          <div className="flex items-start justify-between">
            <h3 className="line-clamp-1 pr-2 text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-white">
              {name}
            </h3>
            <span className="rounded bg-orange-100 px-2 py-1 text-xs whitespace-nowrap text-orange-600 transition-colors duration-300 dark:bg-orange-900/30 dark:text-orange-400">
              {cakes.length} {cakes.length > 1 ? "items" : "item"}
            </span>
          </div>

          <p className="line-clamp-3 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
            {description}
          </p>

          <div className="pt-2 text-sm font-medium text-orange-600 transition-colors duration-300 dark:text-orange-400">
            View Products →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
