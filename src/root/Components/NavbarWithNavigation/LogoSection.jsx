import React from "react";
import { Link } from "react-router-dom";

const LogoSection = () => {
  return (
    <div className="hidden lg:block flex-shrink-0">
      <Link to="/">
        <img
          className="w-32 sm:w-40 lg:w-52 h-auto dark:brightness-90"
          src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
          alt="Logo"
        />
      </Link>
    </div>
  );
};

export default LogoSection;
