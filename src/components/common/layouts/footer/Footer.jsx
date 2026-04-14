import React from "react";
import Newsletter from "./Newsletter";
import LogoSection from "./LogoSection";
import ContactSection from "./ContactSection";
import QuickLinks from "./QuickLinks";
import AppSection from "./AppSection";
import PaymentMethods from "./PaymentMethods";
import BottomBar from "./BottomBar";
import TrustBadges from "./TrustBadges";
import MobileBottomNav from "@/components/common/layouts/header/mobile/MobileBottomNav";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      {/* Newsletter Section */}
      <Newsletter />

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          {/* Logo and Description */}
          <LogoSection />

          {/* Contact Info */}
          <ContactSection />

          {/* Quick Links */}
          <QuickLinks />

          {/* App & Payments */}
          <div className="space-y-6 lg:col-span-3">
            <AppSection />
            <PaymentMethods />
          </div>
        </div>

        {/* Bottom Bar */}
        <BottomBar currentYear={currentYear} />
      </div>

      {/* Trust Badges */}
      <TrustBadges />
      {/* Additional spacing for mobile */}
      <MobileBottomNav />
    </footer>
  );
};

export default Footer;
