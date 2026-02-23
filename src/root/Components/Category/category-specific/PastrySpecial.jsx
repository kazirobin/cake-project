// src/components/category-specific/PastrySpecial.jsx
import React from "react";
import { Croissant, Coffee, Sparkles, Gift } from "lucide-react";
import AllCards from "./../../Cards/AllCards";

export default function PastrySpecial({ category, products, specificData }) {
  const pastrySpecials = products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes("pastry") ||
      p.cakeDetails.category?.toLowerCase().includes("pastry"),
  );

  console.log("Pastry products:", pastrySpecials);

  return (
    <div className="mt-12 space-y-8">
      {/* Pastry Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 p-8 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          <Croissant className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <Coffee className="h-8 w-8" />
            <h2 className="text-2xl font-bold">🥐 Delicate Pastry Delights</h2>
          </div>
          <p className="mb-6 max-w-2xl">
            Flaky, creamy, and absolutely delicious. Traditional and modern
            pastries made fresh daily.
          </p>
          <button className="rounded-lg bg-white px-6 py-2 font-semibold text-amber-500 transition-colors hover:bg-gray-100">
            Browse Pastries
          </button>
        </div>
      </div>

      {/* Pastry Types */}
      {specificData?.types && specificData.types.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Pastry Selection</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {specificData.types.map((type) => (
              <div
                key={type}
                className="cursor-pointer rounded-lg border-2 border-amber-100 bg-white p-4 text-center transition-all hover:border-amber-300 hover:shadow-md"
              >
                <div className="mb-2 text-2xl">
                  {type === "Éclairs"
                    ? "🥖"
                    : type === "Cream Puffs"
                      ? "⚪"
                      : type === "Tarts"
                        ? "🥧"
                        : type === "Danishes"
                          ? "🥐"
                          : "🍰"}
                </div>
                <span className="text-xs font-medium">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fillings */}
      {specificData?.fillings && specificData.fillings.length > 0 && (
        <div className="rounded-lg bg-amber-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Delicious Fillings</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {specificData.fillings.map((filling) => (
              <div
                key={filling}
                className="rounded-lg bg-white p-3 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-sm font-medium">{filling}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pastry Products */}
      {pastrySpecials.length > 0 ? (
        <AllCards
          title="🥐 Fresh Pastries"
          subtitle="Delicate baked goods for every occasion"
          badge="FRESH"
          cakes={pastrySpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No pastry specials found
        </div>
      )}

      {/* Pairing Suggestions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-6">
          <Coffee className="mb-3 h-8 w-8 text-amber-500" />
          <h4 className="mb-2 font-semibold">Morning Coffee</h4>
          <p className="text-sm text-gray-600">
            Perfect with your favorite brew
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-amber-500" />
          <h4 className="mb-2 font-semibold">Gift Boxes</h4>
          <p className="text-sm text-gray-600">
            Assorted pastries in elegant packaging
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 p-6">
          <Sparkles className="mb-3 h-8 w-8 text-amber-500" />
          <h4 className="mb-2 font-semibold">Tea Time</h4>
          <p className="text-sm text-gray-600">
            Classic afternoon tea companion
          </p>
        </div>
      </div>
    </div>
  );
}
