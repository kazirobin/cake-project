// src/components/category-specific/WeddingSpecial.jsx
import React from "react";
import { Heart, Sparkles, Gift} from "lucide-react"; // Removed Ring, added Gem and Crown as alternatives
import AllCards from "./../../Cards/AllCards";

export default function WeddingSpecial({ category, products, specificData }) {
  const weddingSpecials = products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes("wedding") ||
      p.cakeDetails.category?.toLowerCase().includes("wedding"),
  );

  console.log("Wedding products:", weddingSpecials);

  return (
    <div className="mt-12 space-y-8">
      {/* Wedding Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-rose-300 to-pink-400 p-8 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          {/* Replace Ring with an alternative icon or use a div with emoji */}
          <div className="text-8xl">💍</div>
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <Heart className="h-8 w-8" />
            <h2 className="text-2xl font-bold">👰‍♀️ Your Dream Wedding Cake</h2>
          </div>
          <p className="mb-6 max-w-2xl">
            From classic elegance to modern designs, create the perfect
            centerpiece for your special day.
          </p>
          <button className="rounded-lg bg-white px-6 py-2 font-semibold text-rose-500 transition-colors hover:bg-gray-100">
            Start Designing
          </button>
        </div>
      </div>

      {/* Wedding Styles */}
      {specificData?.styles && specificData.styles.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-rose-500" />
            Wedding Cake Styles
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {specificData.styles.map((style) => (
              <div
                key={style}
                className="cursor-pointer rounded-lg border-2 border-rose-100 bg-white p-4 text-center transition-all hover:border-rose-300 hover:shadow-md"
              >
                <span className="font-semibold text-rose-600">{style}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier Options */}
      {specificData?.tierOptions && specificData.tierOptions.length > 0 && (
        <div className="rounded-lg bg-rose-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Tier Options</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {specificData.tierOptions.map((tier) => (
              <div
                key={tier}
                className="rounded-lg bg-white p-4 text-center transition-shadow hover:shadow-md"
              >
                <div className="mb-2 text-3xl">🎂</div>
                <span className="text-sm font-medium">{tier}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Color Options */}
      {specificData?.colors && specificData.colors.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Popular Wedding Colors</h3>
          <div className="flex flex-wrap gap-2">
            {specificData.colors.map((color) => (
              <div
                key={color}
                className="cursor-pointer rounded-full border px-4 py-2 transition-colors hover:border-rose-300"
              >
                <span className="text-sm">{color}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wedding Products */}
      {weddingSpecials.length > 0 ? (
        <AllCards
          title="💑 Wedding Collection"
          subtitle="Elegant cakes for your special day"
          badge="ELEGANT"
          cakes={weddingSpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No wedding specials found
        </div>
      )}

      {/* Cake Toppers */}
      {specificData?.cakeToppers && specificData.cakeToppers.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {specificData.cakeToppers.map((topper) => (
            <div
              key={topper}
              className="rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 p-4 text-center"
            >
              <Gift className="mx-auto mb-2 h-6 w-6 text-rose-500" />
              <h4 className="text-sm font-semibold">{topper}</h4>
              <p className="mt-1 text-xs text-gray-600">Popular choice</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}