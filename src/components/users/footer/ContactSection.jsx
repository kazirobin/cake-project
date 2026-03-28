import React from 'react';
import { Phone, Mail, MapPin, Smartphone } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, text: "UG Cakes, Surya Bikram Marg, Kathmandu 44600" },
  { icon: Phone, text: "+977 9803727485" },
  { icon: Smartphone, text: "Sales Viber (7AM - 11PM): +977 9803727485" },
  { icon: Smartphone, text: "Sales WhatsApp (7AM - 11PM): +977 9803727485" },
  { icon: Mail, text: "marketing@ugcakes.com, sales@ugcakes.com, it@ugcakes.com" },
];

const ContactSection = () => {
  return (
    <div className="lg:col-span-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
        Contact Us
      </h3>
      <ul className="space-y-3">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={index} className="flex items-start gap-3">
              <Icon className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactSection;