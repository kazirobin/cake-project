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
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 to-pink-50 p-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-2xl text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 className="animate-pulse bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-9xl font-extrabold text-transparent dark:from-purple-400 dark:to-pink-400">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Frown className="h-32 w-32 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl dark:text-white">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mb-6 max-w-md text-lg text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track!
        </p>

        {/* New: Searching Path Display */}
        <div className="mb-6 rounded-lg border border-purple-200 bg-white/50 p-4 backdrop-blur-sm dark:border-purple-800 dark:bg-gray-800/50">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Searching for:
            </span>
            <code className="rounded-md bg-purple-100 px-3 py-1 font-mono text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
              {notFoundPath || "/unknown-path"}
            </code>
          </div>
        </div>

        {/* New: Error Message Display */}
        <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-600 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm">
            <span className="font-semibold">Error 404:</span> The requested URL
            could not be found on this server. Please check the address or try
            navigating from our homepage.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="group w-full border-2 border-purple-300 transition-all duration-300 hover:border-purple-500 hover:bg-purple-50 sm:w-auto dark:border-purple-700 dark:hover:border-purple-500 dark:hover:bg-purple-900/30"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="group w-full bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl sm:w-auto"
          >
            <Home className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
            Back to Home
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>Popular pages:</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <a
              href="/products"
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Products
            </a>
            <span>•</span>
            <a
              href="/categories"
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Categories
            </a>
            <span>•</span>
            <a
              href="/support"
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Support
            </a>
            <span>•</span>
            <a
              href="/contact"
              className="transition-colors hover:text-purple-600 dark:hover:text-purple-400"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
