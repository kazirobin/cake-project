// src/components/category-specific/PhotoSpecial.jsx
import React from "react";
import { Camera, Image, Heart, Gift } from "lucide-react";
import AllCards from "./../../Cards/AllCards";

export default function PhotoSpecial({ category, products, specificData }) {
  const photoSpecials = products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes("photo") ||
      p.cakeDetails.title.toLowerCase().includes("picture") ||
      p.cakeDetails.category?.toLowerCase().includes("photo"),
  );

  console.log("Photo products:", photoSpecials);

  return (
    <div className="mt-12 space-y-8">
      {/* Photo Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-400 to-indigo-500 p-8 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          <Camera className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <Image className="h-8 w-8" />
            <h2 className="text-2xl font-bold">📸 Your Memories on a Cake</h2>
          </div>
          <p className="mb-6 max-w-2xl">
            Turn your favorite photos into edible art. Perfect for birthdays,
            anniversaries, and special moments.
          </p>
          <button className="rounded-lg bg-white px-6 py-2 font-semibold text-purple-500 transition-colors hover:bg-gray-100">
            Upload Your Photo
          </button>
        </div>
      </div>

      {/* Image Types */}
      {specificData?.imageTypes && specificData.imageTypes.length > 0 && (
        <div>
          <h3 className="mb-4 text-xl font-semibold">Popular Photo Ideas</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {specificData.imageTypes.map((type) => (
              <div
                key={type}
                className="cursor-pointer rounded-lg border-2 border-purple-100 bg-white p-4 text-center transition-all hover:border-purple-300 hover:shadow-md"
              >
                <div className="mb-2 text-2xl">
                  {type.includes("Family")
                    ? "👪"
                    : type.includes("Couple")
                      ? "💑"
                      : type.includes("Child")
                        ? "👶"
                        : type.includes("Pet")
                          ? "🐾"
                          : "🏷️"}
                </div>
                <span className="text-xs font-medium">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shapes */}
      {specificData?.shapes && specificData.shapes.length > 0 && (
        <div className="rounded-lg bg-purple-50 p-6">
          <h3 className="mb-4 text-lg font-semibold">Cake Shapes</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {specificData.shapes.map((shape) => (
              <div
                key={shape}
                className="rounded-lg bg-white p-4 text-center transition-shadow hover:shadow-md"
              >
                <div className="mb-2 text-3xl">
                  {shape === "Round"
                    ? "⚪"
                    : shape === "Square"
                      ? "⬛"
                      : shape === "Heart"
                        ? "❤️"
                        : "📐"}
                </div>
                <span className="text-sm font-medium">{shape}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Printing Quality */}
      {specificData?.printingQuality &&
        specificData.printingQuality.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Print Quality</h3>
            <div className="flex gap-3">
              {specificData.printingQuality.map((quality) => (
                <div
                  key={quality}
                  className="cursor-pointer rounded-full border px-4 py-2 transition-colors hover:border-purple-300"
                >
                  <span className="text-sm">{quality}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Photo Products */}
      {photoSpecials.length > 0 ? (
        <AllCards
          title="📷 Photo Cake Collection"
          subtitle="Personalized cakes with your favorite photos"
          badge="PERSONALIZED"
          cakes={photoSpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No photo specials found
        </div>
      )}

      {/* Tips */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
          <Camera className="mb-3 h-8 w-8 text-purple-500" />
          <h4 className="mb-2 font-semibold">Photo Tips</h4>
          <p className="text-sm text-gray-600">
            Use high-resolution images for best results
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
          <Heart className="mb-3 h-8 w-8 text-purple-500" />
          <h4 className="mb-2 font-semibold">Special Occasions</h4>
          <p className="text-sm text-gray-600">
            Birthdays, anniversaries, graduations
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-purple-500" />
          <h4 className="mb-2 font-semibold">Gift Idea</h4>
          <p className="text-sm text-gray-600">
            A personalized photo cake makes a memorable gift
          </p>
        </div>
      </div>
    </div>
  );
}
