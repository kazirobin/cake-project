import React from "react";
import { Apple, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppSection = () => {
  return (
    <div className="space-y-3">
       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
         Get Our App
      </h3>
     
      
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
        >
          <Smartphone className="h-4 w-4" />
          <span>Google Play</span>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-3 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all"
        >
          <Apple className="h-4 w-4" />
          <span>App Store</span>
        </Button>
      </div>
    </div>
  );
};

export default AppSection;