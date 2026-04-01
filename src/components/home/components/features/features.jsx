import { Clock, Heart, Shield, Truck } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
     <section className="py-16">
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Truck className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Free Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Free delivery inside Kathmandu Valley
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Quality Guarantee
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                100% satisfaction guaranteed
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Fresh Daily
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Baked fresh every morning
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                <Heart className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Made with Love
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Handcrafted with premium ingredients
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Features