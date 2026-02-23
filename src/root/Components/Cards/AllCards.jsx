// src/components/AllCards.jsx
import React, { useState, useEffect } from 'react';
import SingleCard from './SingleCard';

const AllCards = ({ 
  title = "👀 Most Viewed", 
  subtitle = "Popular picks everyone is looking at", 
  updateTime = "Feb 14, 2:14 AM",
  badge = "POPULAR",
  cakes = [],
  isLoading = false,
  initialDesktop = 12,
  initialLaptop = 8,
  initialMobile = 6,
  left = false
}) => {
  
  const [showAll, setShowAll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Debug: Log what cakes we're receiving
  // console.log(`AllCards (${title}) - cakes:`, cakes);
  // if (cakes.length > 0) {
  //   console.log(`AllCards (${title}) - first cake structure:`, cakes[0]);
  // }

  const getInitialCount = () => {
    if (windowWidth < 640) return initialMobile;
    if (windowWidth < 1024) return initialLaptop;
    return initialDesktop;
  };

  const [visibleCount, setVisibleCount] = useState(getInitialCount());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (!showAll) {
        setVisibleCount(getInitialCount());
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showAll]);

  useEffect(() => {
    if (!showAll) {
      setVisibleCount(getInitialCount());
    }
  }, [windowWidth, showAll]);

  const handleViewMore = () => {
    setShowAll(true);
    setVisibleCount(cakes.length);
  };

  const handleViewLess = () => {
    setShowAll(false);
    setVisibleCount(getInitialCount());
    document.getElementById(`section-${title.replace(/\s+/g, '-')}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getGridClass = () => {
    if (windowWidth < 480) return "grid-cols-1";
    if (windowWidth < 640) return "grid-cols-2";
    if (windowWidth < 768) return "grid-cols-2";
    if (windowWidth < 1024) return "grid-cols-3";
    return "grid-cols-4";
  };

  if (isLoading) {
    return (
      <div className="my-8 sm:my-10 md:my-14" id={`section-${title.replace(/\s+/g, '-')}`}>
        <div className={`space-y-2 sm:space-y-2.5 mb-6 sm:mb-8 px-4 ${left ? 'text-left' : 'text-center'}`}>
          <div className={`h-8 sm:h-10 w-48 sm:w-64 bg-gray-200 animate-pulse rounded-lg ${left ? 'ml-0' : 'mx-auto'}`}></div>
          <div className={`h-4 sm:h-5 w-64 sm:w-96 bg-gray-200 animate-pulse rounded-lg ${left ? 'ml-0' : 'mx-auto'}`}></div>
          <div className={`h-3 sm:h-4 w-32 sm:w-48 bg-gray-200 animate-pulse rounded-lg ${left ? 'ml-0' : 'mx-auto'}`}></div>
        </div>
        <div className={`grid ${getGridClass()} gap-3 sm:gap-4 md:gap-6 px-3 sm:px-4`}>
          {[1, 2, 3, 4, 5, 6, 7, 8].slice(0, getInitialCount()).map((n) => (
            <div key={n} className="h-64 sm:h-72 md:h-80 bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!cakes || cakes.length === 0) {
    return (
      <div className="my-8 sm:my-10 md:my-14 text-center px-4" id={`section-${title.replace(/\s+/g, '-')}`}>
        <p className="text-sm sm:text-base text-gray-500">No cakes available</p>
      </div>
    );
  }

  const visibleCakes = cakes.slice(0, visibleCount);
  const hasMore = cakes.length > visibleCount;

  return (
    <div className="my-8 sm:my-10 md:my-14" id={`section-${title.replace(/\s+/g, '-')}`}>
      {(title || subtitle || badge || updateTime) && (
        <div className={`flex flex-col ${left ? 'items-start' : 'items-center'} mb-6 sm:mb-8 px-4`}>
          {(title || badge) && (
            <div className={`flex flex-col sm:flex-row ${left ? 'items-start' : 'items-center'} gap-2 sm:gap-3 relative`}>
              {title && (
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${left ? 'text-left' : 'text-center sm:text-left'}`}>
                  {title}
                </h2>
              )}
              {badge && (
                <span className="bg-purple-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                  {badge}
                </span>
              )}
            </div>
          )}
          
          {subtitle && (
            <p className={`text-xs sm:text-sm md:text-base text-gray-600 mt-2 max-w-[280px] sm:max-w-md md:max-w-lg ${left ? 'text-left' : 'text-center'}`}>
              {subtitle}
            </p>
          )}
          
          {updateTime && (
            <p className={`text-[10px] sm:text-xs text-gray-400 mt-1 ${left ? 'text-left' : 'text-center'}`}>
              Last updated: {updateTime}
            </p>
          )}
        </div>
      )}

      <div className={`grid ${getGridClass()} gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-3 md:px-4`}>
        {visibleCakes.map((cake, index) => {
          // Try to get the correct data structure
          let cakeData = cake;
          
          // If cake has cakeDetails property, use that
          if (cake.cakeDetails) {
            cakeData = cake.cakeDetails;
          }
          
          // Log each cake being rendered
          // console.log(`Rendering cake ${index}:`, cakeData);
          
          // Check if cakeData has required properties
          if (!cakeData || !cakeData.id) {
            console.warn('Invalid cake data:', cake);
            return null;
          }
          
          return <SingleCard key={cakeData.id} cakeData={cakeData} />;
        })}
      </div>

      {cakes.length > getInitialCount() && (
        <div className={`flex ${left ? 'justify-start' : 'justify-center'} mt-6 sm:mt-8 md:mt-10 px-4`}>
          {!showAll ? (
            <button
              onClick={handleViewMore}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center"
            >
              <span>View More</span>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleViewLess}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span>View Less</span>
            </button>
          )}
        </div>
      )}

      <div className={`text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4 ${left ? 'text-left px-4' : 'text-center'}`}>
        Showing {visibleCakes.length} of {cakes.length} cakes
      </div>
    </div>
  );
};

export default AllCards;