import React from 'react';

const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
      className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <option value="popular">Most Popular</option>
      <option value="rating">Highest Rated</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
    </select>
  );
};

export default SortDropdown;