import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Frown, AlertCircle } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the current path that wasn't found
  const notFoundPath = location.pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Frown className="w-32 h-32 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track!
        </p>

        {/* New: Searching Path Display */}
        <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Searching for:</span>
            <code className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-md font-mono">
              {notFoundPath || "/unknown-path"}
            </code>
          </div>
        </div>

        {/* New: Error Message Display */}
        <div className="mb-8 flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg max-w-md mx-auto border border-amber-200 dark:border-amber-800">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">
            <span className="font-semibold">Error 404:</span> The requested URL could not be found on this server. Please check the address or try navigating from our homepage.
          </p>
        </div>

        {/* Fun Illustration */}
        <div className="relative mb-8">
          <svg
            className="w-64 h-64 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" className="fill-purple-200 dark:fill-purple-900/30" />
            <path
              d="M70 90 Q100 70 130 90"
              stroke="currentColor"
              className="stroke-purple-500 dark:stroke-purple-400"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="70" cy="120" r="8" className="fill-purple-500 dark:fill-purple-400" />
            <circle cx="130" cy="120" r="8" className="fill-purple-500 dark:fill-purple-400" />
            <path
              d="M85 140 Q100 150 115 140"
              stroke="currentColor"
              className="stroke-pink-500 dark:stroke-pink-400"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto group border-2 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="w-full sm:w-auto group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="/products" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Products
            </a>
            <span>•</span>
            <a href="/categories" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Categories
            </a>
            <span>•</span>
            <a href="/support" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Support
            </a>
            <span>•</span>
            <a href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;