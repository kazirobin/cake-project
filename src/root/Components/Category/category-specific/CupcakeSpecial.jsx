// src/components/category-specific/CupcakeSpecial.jsx
import React from "react";
import {  Sparkles, Gift } from "lucide-react"; // Removed Cupcake, added Cake and Cookie as alternatives
import AllCards from "./../../Cards/AllCards";

export default function CupcakeSpecial({ category, products, specificData }) {
  const cupcakeSpecials = products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes("cupcake") ||
      p.cakeDetails.title.toLowerCase().includes("muffin") ||
      p.cakeDetails.category?.toLowerCase().includes("cupcake"),
  );

  console.log("Cupcake products:", cupcakeSpecials);

  return (
    <div className="mt-12 space-y-8">
      {/* Cupcake Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-pink-400 to-yellow-400 p-8 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          {/* Replace Cupcake with an emoji or alternative icon */}
          <div className="text-8xl">🧁</div>
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <Sparkles className="h-8 w-8" />
            <h2 className="text-2xl font-bold">
              🧁 Sweet Treats in Every Bite
            </h2>
          </div>
          <p className="mb-6 max-w-2xl">
            Perfect for parties, events, or just because. Delicious cupcakes in
            various flavors.
          </p>
          <button className="rounded-lg bg-white px-6 py-2 font-semibold text-pink-500 transition-colors hover:bg-gray-100">
            Shop Cupcakes
          </button>
        </div>
      </div>

      {/* Flavors */}
      {specificData?.flavors && specificData.flavors.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Popular Flavors</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {specificData.flavors.map((flavor) => (
              <div
                key={flavor}
                className="cursor-pointer rounded-lg border-2 border-pink-100 bg-white p-4 text-center transition-all hover:border-pink-300 hover:shadow-md"
              >
                <span className="text-sm font-medium">{flavor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frosting Types */}
      {specificData?.frostingTypes && specificData.frostingTypes.length > 0 && (
        <div className="rounded-lg bg-pink-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Frosting Options</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {specificData.frostingTypes.map((frosting) => (
              <div
                key={frosting}
                className="rounded-lg bg-white p-3 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-medium">{frosting}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Occasions */}
      {specificData?.occasions && specificData.occasions.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Perfect for</h3>
          <div className="flex flex-wrap gap-2">
            {specificData.occasions.map((occasion) => (
              <div
                key={occasion}
                className="cursor-pointer rounded-full border px-4 py-2 transition-colors hover:border-pink-300"
              >
                <span className="text-sm">{occasion}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cupcake Products */}
      {cupcakeSpecials.length > 0 ? (
        <AllCards
          title="🧁 Cupcake Selection"
          subtitle="Individual treats for every taste"
          badge="FRESH"
          cakes={cupcakeSpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No cupcake specials found
        </div>
      )}

      {/* Party Packs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-br from-pink-50 to-yellow-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-pink-500" />
          <h4 className="mb-2 font-semibold">Mini Packs</h4>
          <p className="text-sm text-gray-600">
            6 cupcakes - perfect for small gatherings
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-pink-50 to-yellow-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-pink-500" />
          <h4 className="mb-2 font-semibold">Party Packs</h4>
          <p className="text-sm text-gray-600">
            12 cupcakes - ideal for parties
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-pink-50 to-yellow-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-pink-500" />
          <h4 className="mb-2 font-semibold">Event Packs</h4>
          <p className="text-sm text-gray-600">
            24+ cupcakes - for large events
          </p>
        </div>
      </div>
    </div>
  );
}
