// src/components/CategoryBreadcrumb.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { categories } from "@/data/data";

const CategoryBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Helper function to find category name by slug
  const findCategoryName = (slug) => {
    const category = categories.find((cat) => cat.slug === slug);
    return category
      ? category.name
      : slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  // Helper function to generate display names for paths
  const getDisplayName = (path, index, pathnames) => {
    // Handle category paths
    if (path === "categories" && pathnames[index + 1]) {
      return "Categories";
    }

    // Handle specific category
    if (pathnames[index - 1] === "categories") {
      return findCategoryName(path);
    }

    // Handle product paths
    if (path === "cake" && pathnames[index + 1]) {
      return "Product Details";
    }

    // Handle other paths
    switch (path) {
      case "categories":
        return "Categories";
      case "gifts":
        return "Gifts";
      case "bakery-training":
        return "Bakery Training";
      case "wish-generator":
        return "Wish Generator";
      case "careers":
        return "Careers";
      case "track-order":
        return "Track Order";
      case "contact":
        return "Contact";
      default:
        return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
    }
  };

  // Don't show breadcrumb on homepage
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav
      className="flex items-center text-sm text-gray-600 dark:text-gray-400 pb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {/* Home Link */}
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center transition-colors hover:text-purple-600"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {pathnames.map((path, index) => {
          const isLast = index === pathnames.length - 1;
          const url = `/${pathnames.slice(0, index + 1).join("/")}`;
          const displayName = getDisplayName(path, index, pathnames);

          return (
            <li key={path} className="flex items-center">
              <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
              {isLast ? (
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  {displayName}
                </span>
              ) : (
                <Link
                  to={url}
                  className="transition-colors hover:text-purple-600"
                >
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;
