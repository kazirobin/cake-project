import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const sliderData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2070&auto=format&fit=crop",
    title: "Delicious Chocolate Cake",
    description: "Rich, moist chocolate cake with premium ingredients",
    alt: "Chocolate cake",
    buttonColor: "bg-pink-500",
    buyNowText: "Buy Now",
    findCakeText: "Find Your Cake",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=2070&auto=format&fit=crop",
    title: "Fresh Fruit Cake",
    description: "Light sponge cake topped with fresh seasonal fruits",
    alt: "Fruit cake",
    buttonColor: "bg-purple-500",
    buyNowText: "Buy Now",
    findCakeText: "Find Your Cake",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?q=80&w=2070&auto=format&fit=crop",
    title: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    alt: "Red velvet cake",
    buttonColor: "bg-red-500",
    buyNowText: "Buy Now",
    findCakeText: "Find Your Cake",
  },
];

const SliderBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto play with pause on hover functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === sliderData.length - 1 ? 0 : prev + 1,
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div
      className="group relative h-75 w-full overflow-hidden sm:h-87.5 md:h-95 lg:h-100"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "z-10 opacity-100"
              : "pointer-events-none z-0 opacity-0"
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.alt}
            className="h-full w-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content - Left aligned */}
          <div className="absolute inset-0 flex items-center">
            <div className="container px-4 sm:ms-0 sm:px-6 lg:ms-10 lg:px-8">
              <div className="max-w-xl text-left text-white">
                {/* Title */}
                <h1
                  className={`mb-3 transform text-3xl font-bold transition-all delay-200 duration-700 sm:text-4xl md:text-5xl lg:text-5xl ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <p
                  className={`mb-6 transform text-base text-gray-200 transition-all delay-400 duration-700 sm:text-lg md:text-xl ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {slide.description}
                </p>

                {/* Buttons - Bigger size */}
                <div
                  className={`flex transform flex-col gap-4 transition-all delay-600 duration-700 sm:flex-row ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <Button
                    className={`${slide.buttonColor} flex min-w-40 transform items-center justify-center gap-3 rounded-xl px-8 py-6 text-base text-white shadow-lg transition-all duration-300 hover:scale-105 hover:opacity-90 hover:shadow-xl sm:text-lg`}
                  >
                    {slide.buyNowText}
                    <ShoppingBag size={20} />
                  </Button>

                  <Button
                    variant="outline"
                    className="flex min-w-45 transform items-center justify-center gap-3 rounded-xl border-2 border-white bg-transparent px-8 py-6 text-base text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-gray-900 hover:shadow-xl sm:text-lg"
                  >
                    <Search size={20} />
                    {slide.findCakeText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 z-20 -translate-y-1/2 transform rounded-full border border-white/20 bg-black/30 p-2 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:border-white/40 hover:bg-black/50 hover:shadow-xl sm:left-4 sm:p-3"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 z-20 -translate-y-1/2 transform rounded-full border border-white/20 bg-black/30 p-2 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:scale-110 hover:border-white/40 hover:bg-black/50 hover:shadow-xl sm:right-4 sm:p-3"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="sm:h-6 sm:w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-2 cursor-pointer rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 bg-white shadow-lg"
                  : "w-2 bg-white/50 group-hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-white/10">
        <div
          className="h-full bg-linear-to-r from-pink-500 via-purple-500 to-red-500 transition-all duration-300"
          style={{
            width: isAutoPlaying
              ? `${((currentSlide + 1) / sliderData.length) * 100}%`
              : "0%",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export default SliderBanner;
