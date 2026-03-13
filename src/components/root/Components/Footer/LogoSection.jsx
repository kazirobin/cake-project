import React from "react";
import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useTheme } from "@/components/Theme/theme-provider";

const socialLinks = [
  { icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { icon: Instagram, href: "#", color: "hover:text-pink-600" },
  { icon: Twitter, href: "#", color: "hover:text-blue-400" },
  { icon: Youtube, href: "#", color: "hover:text-red-600" },
];

const LogoSection = () => {
  const { theme } = useTheme();
  
  const logoSrc = theme === 'dark'
    ? "https://media.ugcakes.com/assets/logo/long-logo-dark-sd.webp"
    : "https://i.ibb.co/nNjY5t0b/long-logo-sd.webp";

  return (
    <div className="lg:col-span-3 space-y-4">
      <Link to="/" className="inline-block">
        <img
          src={logoSrc}
          alt="UG Cakes"
          className="h-12 w-auto"
        />
      </Link>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        Delicious cakes made with love and delivered fresh to your doorstep.
        Making every celebration sweeter since 2015.
      </p>

      {/* Social Links */}
      <div className="flex items-center gap-3 pt-2">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 ${social.color} transition-colors`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LogoSection;