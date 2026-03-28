import React from "react";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";
import DyBread from "@/components/common/DyBread";

const CategoryHero = ({ category, productCount }) => {
  return (
    <div className="relative h-64 overflow-hidden bg-white md:h-80">
      <img
        src={category.heroImage || category.image}
        alt={category.name}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 text-white">
          <div className="mb-2">
            <DyBread />
          </div>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">
            {category.heroTitle || category.name}
          </h1>
          <p className="max-w-2xl text-lg opacity-90">
            {category.heroDescription || category.description}
          </p>

          <div className="mt-4 flex gap-2">
            <Badge
              variant="secondary"
              className="border-0 bg-white/20 text-white"
            >
              <Package className="mr-1 h-3 w-3" />
              {productCount} Products
            </Badge>
            {category.filters?.customizable && (
              <Badge
                variant="secondary"
                className="border-0 bg-white/20 text-white"
              >
                Customizable Available
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;
