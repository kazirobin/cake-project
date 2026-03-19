import React from 'react';
import { NavLink } from 'react-router-dom';
import { navigateLinks } from '@/data/data';

const MobileNavigateContent = () => {
  return (
    <div className="p-4 bg-white dark:bg-gray-900">
      {/* Main Navigation - 2 Column Cards with Icons */}
      <div className="grid grid-cols-2 gap-3">
        {navigateLinks.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                isActive 
                  ? '  dark:from-purple-900/30 dark:to-purple-900/20 shadow-lg scale-[1.02]' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md bg-white dark:bg-gray-800'
              }`
            }
          >
            {/* Icon from navigateLinks */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md">
              <span className="text-2xl text-white">{item.icon}</span>
            </div>
            
            {/* Label */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>

    
    </div>
  );
};

export default MobileNavigateContent;