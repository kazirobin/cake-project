import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import productService from "../../product/product-service";
import ServiceHighlights from "@/components/home/components/service-highlights/ServiceHighlights";
import SliderBanner from "@/components/common/SliderBanner";
import PlayWinCake from "@/components/home/components/play-win-cake/PlayWinCake";
import Features from "@/components/home/components/features/features";
import ProductShowcase from "@/components/product/product-showcase";

const Home = () => {
  const featuredProducts = productService.getFeaturedProducts(4);
  const newArrivals = productService.getNewArrivals(4);

  return (
    <div className="container mx-auto min-h-screen">
      <SliderBanner />

      <ServiceHighlights />

      <ProductShowcase
        title="Featured Products"
        details=" Discover our most popular cakes, carefully crafted for your special
            moments"
        productList={featuredProducts}
      >
        <div className="mt-10 text-center">
          <Link to="/categories">
            <Button
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </ProductShowcase>

      <Features />

      <ProductShowcase
        title="New Arrivals"
        details="Check out our latest creations, fresh from the oven"
        productList={newArrivals}
      />

      <PlayWinCake />
    </div>
  );
};

export default Home;
