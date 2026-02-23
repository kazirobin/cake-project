// src/components/category-specific/CookieSpecial.jsx
import React from "react";
import { Cookie, Gift, Heart, Sparkles, Coffee } from "lucide-react";
import AllCards from "./../../Cards/AllCards";

export default function CookieSpecial({ category, products, specificData }) {
  const cookieSpecials = products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes("cookie") ||
      p.cakeDetails.category?.toLowerCase().includes("cookie"),
  );

  console.log("Cookie products:", cookieSpecials);

  return (
    <div className="mt-12 space-y-8">
      {/* Cookie Banner */}
      <div className="from-brown-400 relative overflow-hidden rounded-lg bg-gradient-to-r to-amber-600 p-8 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          <Cookie className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <Sparkles className="h-8 w-8" />
            <h2 className="text-2xl font-bold">🍪 Fresh Baked Cookies</h2>
          </div>
          <p className="mb-6 max-w-2xl">
            Crunchy, chewy, and absolutely delicious. Perfect for snacking,
            gifting, or sharing.
          </p>
          <button className="rounded-lg bg-white px-6 py-2 font-semibold text-amber-600 transition-colors hover:bg-gray-100">
            Shop Cookies
          </button>
        </div>
      </div>

      {/* Cookie Varieties */}
      {specificData?.varieties && specificData.varieties.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Cookie Varieties</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {specificData.varieties.map((variety) => (
              <div
                key={variety}
                className="cursor-pointer rounded-lg border-2 border-amber-100 bg-white p-4 text-center transition-all hover:border-amber-300 hover:shadow-md"
              >
                <div className="mb-2 text-2xl">
                  {variety.includes("Chocolate")
                    ? "🍫"
                    : variety.includes("Oatmeal")
                      ? "🌾"
                      : variety.includes("Butter")
                        ? "🧈"
                        : variety.includes("Almond")
                          ? "🥜"
                          : variety.includes("Sugar")
                            ? "🍬"
                            : "🍪"}
                </div>
                <span className="text-xs font-medium">{variety}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gift Pack Sizes */}
      {specificData?.giftPackSizes && specificData.giftPackSizes.length > 0 && (
        <div className="rounded-lg bg-amber-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Gift Pack Sizes</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {specificData.giftPackSizes.map((size) => (
              <div
                key={size}
                className="rounded-lg bg-white p-4 text-center transition-shadow hover:shadow-md"
              >
                <Gift className="mx-auto mb-2 h-6 w-6 text-amber-500" />
                <span className="text-sm font-medium">{size}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dietary Options */}
      {specificData?.dietary && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Dietary Options</h3>
          <div className="flex flex-wrap gap-2">
            {["Eggless", "Gluten-Free", "Vegan"].map((diet) => (
              <div
                key={diet}
                className="cursor-pointer rounded-full border px-4 py-2 transition-colors hover:border-amber-300"
              >
                <span className="text-sm">{diet}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cookie Products */}
      {cookieSpecials.length > 0 ? (
        <AllCards
          title="🍪 Cookie Collection"
          subtitle="Fresh baked cookies for every taste"
          badge="FRESH"
          cakes={cookieSpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No cookie specials found
        </div>
      )}

      {/* Perfect Pairings */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="to-brown-50 rounded-lg bg-gradient-to-br from-amber-50 p-6">
          <Coffee className="mb-3 h-8 w-8 text-amber-600" />
          <h4 className="mb-2 font-semibold">With Coffee</h4>
          <p className="text-sm text-gray-600">Perfect dunking companions</p>
        </div>
        <div className="to-brown-50 rounded-lg bg-gradient-to-br from-amber-50 p-6">
          <Heart className="mb-3 h-8 w-8 text-amber-600" />
          <h4 className="mb-2 font-semibold">Gift Idea</h4>
          <p className="text-sm text-gray-600">Beautiful cookie gift boxes</p>
        </div>
        <div className="to-brown-50 rounded-lg bg-gradient-to-br from-amber-50 p-6">
          <Cookie className="mb-3 h-8 w-8 text-amber-600" />
          <h4 className="mb-2 font-semibold">Party Platters</h4>
          <p className="text-sm text-gray-600">Assorted cookies for events</p>
        </div>
      </div>
    </div>
  );
}
