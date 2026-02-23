import React from 'react';
import { Gift, Cake, Star } from 'lucide-react';
import AllCards from './../../Cards/AllCards';

export default function BirthdaySpecial({ category, products, specificData }) {
  // Fix the filter - remove tags check since it doesn't exist
  const birthdaySpecials = products.filter(p => 
    p.cakeDetails.title.toLowerCase().includes('birthday') ||
    p.cakeDetails.category?.toLowerCase().includes('birthday') // Check category instead
  );
  
  console.log("birthday products:", birthdaySpecials); // This should now show products
  console.log("all products:", products); // Check if products are being passed correctly
  
  return (
    <div className="mt-12 space-y-8">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Gift className="w-8 h-8" />
          <h2 className="text-2xl font-bold">🎂 Birthday Special Collection</h2>
        </div>
        <p className="mb-6">Make their day extra special with our personalized birthday cakes</p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Shop Birthday Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {specificData?.ageGroups?.map((age) => (
          <div key={age} className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow">
            <Cake className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{age}'s Birthday Cakes</h3>
            <p className="text-sm text-gray-600 mb-4">
              Perfect cakes for {age.toLowerCase()}
            </p>
            <div className="flex items-center gap-1 mb-4">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm ml-2">(128 reviews)</span>
            </div>
            <button className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Explore {age} Collection
            </button>
          </div>
        ))}
      </div>

      {birthdaySpecials.length > 0 ? (
        <AllCards 
          title="🎉 Top Birthday Picks"
          subtitle="Most loved birthday cakes this month"
          badge="BESTSELLER"
          cakes={birthdaySpecials}
          initialDesktop={4}
          initialLaptop={3}
          initialMobile={2}
          left={true}
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          No birthday specials found
        </div>
      )}

      <div className="bg-purple-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Add a Personal Message</h3>
        <p className="text-gray-600 mb-4">
          Make it extra special with a personalized message on the cake
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="text" 
            placeholder="E.g., Happy Birthday Grandma!"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Add Message
          </button>
        </div>
      </div>
    </div>
  );
}