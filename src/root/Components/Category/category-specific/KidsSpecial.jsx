// src/components/category-specific/KidsSpecial.jsx
import React from "react";
import { Baby, Sparkles, Cake, Gift } from "lucide-react";
import AllCards from "./../../Cards/AllCards";

export default function KidsSpecial({ category, products, specificData }) {
  const kidsSpecials = products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes("kids") ||
      p.cakeDetails.title.toLowerCase().includes("child") ||
      p.cakeDetails.title.toLowerCase().includes("baby") ||
      p.cakeDetails.category?.toLowerCase().includes("kids"),
  );

  console.log("Kids products:", kidsSpecials);

  return (
    <div className="mt-12 space-y-8">
      {/* Kids Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-400 to-green-400 p-8 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          <Baby className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <Sparkles className="h-8 w-8" />
            <h2 className="text-2xl font-bold">
              🧸 Magical Cakes for Little Ones
            </h2>
          </div>
          <p className="mb-6 max-w-2xl">
            Bring their favorite characters to life with our fun and colorful
            kids' cakes.
          </p>
          <button className="rounded-lg bg-white px-6 py-2 font-semibold text-blue-500 transition-colors hover:bg-gray-100">
            Explore Kids Collection
          </button>
        </div>
      </div>

      {/* Age Ranges */}
      {specificData?.ageRanges && specificData.ageRanges.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Age-Specific Designs</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {specificData.ageRanges.map((age) => (
              <div
                key={age}
                className="cursor-pointer rounded-lg border-2 border-blue-100 bg-white p-6 text-center transition-all hover:border-blue-300 hover:shadow-md"
              >
                <Cake className="mx-auto mb-3 h-10 w-10 text-blue-500" />
                <h4 className="text-lg font-semibold">{age}</h4>
                <p className="mt-2 text-sm text-gray-600">Perfect for {age}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Characters */}
      {specificData?.characters && specificData.characters.length > 0 && (
        <div className="rounded-lg bg-blue-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Popular Characters</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {specificData.characters.map((character) => (
              <div
                key={character}
                className="rounded-lg bg-white p-3 text-center transition-shadow hover:shadow-md"
              >
                <div className="mb-2 text-2xl">
                  {character === "Spider-Man"
                    ? "🕷️"
                    : character === "Frozen"
                      ? "❄️"
                      : character === "Paw Patrol"
                        ? "🐾"
                        : character === "Superman"
                          ? "🦸"
                          : character === "Batman"
                            ? "🦇"
                            : "🐭"}
                </div>
                <span className="text-xs font-medium">{character}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Themes */}
      {specificData?.themes && specificData.themes.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">Popular Themes</h3>
          <div className="flex flex-wrap gap-2">
            {specificData.themes.map((theme) => (
              <div
                key={theme}
                className="cursor-pointer rounded-full border px-4 py-2 transition-colors hover:border-blue-300"
              >
                <span className="text-sm">{theme}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Kids Products */}
      {kidsSpecials.length > 0 ? (
        <AllCards
          title="🧸 Kids Special Collection"
          subtitle="Fun cakes that kids will love"
          badge="KIDS FAVORITE"
          cakes={kidsSpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No kids specials found
        </div>
      )}

      {/* Party Ideas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-green-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-blue-500" />
          <h4 className="mb-2 font-semibold">Party Favors</h4>
          <p className="text-sm text-gray-600">
            Matching cupcakes for all guests
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-green-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-blue-500" />
          <h4 className="mb-2 font-semibold">Goodie Bags</h4>
          <p className="text-sm text-gray-600">Custom cookies for take-home</p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-green-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-blue-500" />
          <h4 className="mb-2 font-semibold">Birthday Banner</h4>
          <p className="text-sm text-gray-600">Personalized cake toppers</p>
        </div>
      </div>
    </div>
  );
}
