// src/components/category-specific/AnniversarySpecial.jsx
import React from "react";
import { Heart, Calendar, Gift, Clock } from "lucide-react";
import AllCards from "./../../Cards/AllCards";

export default function AnniversarySpecial({
  category,
  products,
  specificData,
}) {
  // Fix: Remove tags check since it doesn't exist
  const anniversarySpecials = products.filter(
    (p) =>
      p.cakeDetails.title.toLowerCase().includes("anniversary") ||
      p.cakeDetails.category?.toLowerCase().includes("anniversary"),
  );

  console.log("Anniversary products:", anniversarySpecials); // Debug log

  return (
    <div className="mt-12 space-y-8">
      {/* Anniversary Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-rose-400 p-8 text-white">
        <div className="absolute top-0 right-0 opacity-10">
          <Heart className="h-32 w-32" />
        </div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <Calendar className="h-8 w-8" />
            <h2 className="text-2xl font-bold">💕 Celebrate Your Love Story</h2>
          </div>
          <p className="mb-6 max-w-2xl">
            From 1st to 50th anniversary, find the perfect cake to celebrate
            your journey together.
          </p>
          <button className="rounded-lg bg-white px-6 py-2 font-semibold text-red-500 transition-colors hover:bg-gray-100">
            Explore Milestone Cakes
          </button>
        </div>
      </div>

      {/* Milestone Years */}
      {specificData?.milestones && specificData.milestones.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Clock className="h-5 w-5 text-red-500" />
            Anniversary Milestones
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {specificData.milestones.map((year) => (
              <div
                key={year}
                className="group cursor-pointer rounded-lg border-2 border-red-100 bg-white p-4 text-center transition-all hover:border-red-300 hover:shadow-md"
              >
                <span className="inline-block text-3xl font-bold text-red-500 transition-transform group-hover:scale-110">
                  {year}
                </span>
                <p className="mt-1 text-xs text-gray-600">Anniversary</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Romantic Themes */}
      {specificData?.romanticThemes &&
        specificData.romanticThemes.length > 0 && (
          <div className="rounded-lg bg-red-50 p-6">
            <h3 className="mb-4 text-lg font-semibold">Romantic Themes</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {specificData.romanticThemes.map((theme) => (
                <div
                  key={theme}
                  className="rounded-lg bg-white p-3 text-center transition-shadow hover:shadow-md"
                >
                  <div className="mb-2 text-2xl">
                    {theme === "Heart"
                      ? "❤️"
                      : theme === "Rose"
                        ? "🌹"
                        : theme === "Love Birds"
                          ? "🕊️"
                          : theme === "Eternal Love"
                            ? "∞"
                            : "💍"}
                  </div>
                  <span className="text-xs font-medium">{theme}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Message Templates */}
      {specificData?.messageTemplates &&
        specificData.messageTemplates.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Popular Anniversary Messages
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {specificData.messageTemplates.map((message) => (
                <div
                  key={message}
                  className="cursor-pointer rounded-lg border p-4 transition-colors hover:border-red-300"
                >
                  <p className="text-gray-700">{message}</p>
                  <button className="mt-2 text-xs text-red-500 hover:underline">
                    Use this message
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Anniversary Products */}
      {anniversarySpecials.length > 0 ? (
        <AllCards
          title="💝 Anniversary Specials"
          subtitle="Perfect cakes for your celebration"
          badge="ROMANTIC"
          cakes={anniversarySpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="py-8 text-center text-gray-500">
          No anniversary specials found
        </div>
      )}

      {/* Gift Guide */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-red-500" />
          <h4 className="mb-2 font-semibold">1st Anniversary</h4>
          <p className="text-sm text-gray-600">
            Traditional gift is paper. Try our photo cakes!
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-red-500" />
          <h4 className="mb-2 font-semibold">25th Anniversary</h4>
          <p className="text-sm text-gray-600">
            Silver theme cakes with elegant designs
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-6">
          <Gift className="mb-3 h-8 w-8 text-red-500" />
          <h4 className="mb-2 font-semibold">50th Anniversary</h4>
          <p className="text-sm text-gray-600">
            Golden celebration cakes with gold leaf
          </p>
        </div>
      </div>
    </div>
  );
}
