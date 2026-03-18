import React from "react";
import { Link } from "react-router-dom";

const LogoSection = () => {
  return (
    <div className="hidden lg:block flex-shrink-0">
      <Link to="/">
        {/* Light logo (visible in light mode) */}
        <img
          className="w-32 sm:w-40 lg:w-52 h-auto block dark:hidden"
          src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
          alt="Logo"
        />
        {/* Dark logo (visible in dark mode) */}
        <img
          className="w-32 sm:w-40 lg:w-52 h-auto hidden dark:block"
          src="https://media.ugcakes.com/assets/logo/long-logo-dark-sd.webp"
          alt="Logo"
        />
      </Link>
    </div>
  );
};

export default LogoSection;