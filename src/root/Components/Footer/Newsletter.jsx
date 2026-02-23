import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Sweet Delights Delivered to Your Inbox
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Subscribe to get special offers, free giveaways, and exclusive
            deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white dark:bg-gray-800"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
