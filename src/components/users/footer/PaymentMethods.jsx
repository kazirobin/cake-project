import React from "react";

const paymentMethods = [
  "CyberSource",
  "CompassPlus",
  "Cash On Delivery",
  "Fonepay",
  "CellPay",
  "IME Pay",
];

const PaymentMethods = () => {
  return (
    <div>
       <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
         We Accept
      </h3>
    
      
      <ul className="space-y-2">
        {paymentMethods.map((method, index) => (
          <li 
            key={index}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-default"
          >
            {method}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethods;