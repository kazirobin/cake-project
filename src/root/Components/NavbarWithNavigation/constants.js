import { Home, Cake, Gift, Info, Phone } from "lucide-react";

export const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Cakes", href: "/cakes", icon: Cake },
  { name: "Offers", href: "/offers", icon: Gift },
  { name: "About", href: "/about", icon: Info },
  { name: "Contact", href: "/contact", icon: Phone },
];

export const searchSuggestions = [
  { id: 1, name: "Chocolate Cake", category: "Cakes", icon: "🍫" },
  { id: 2, name: "Vanilla Cake", category: "Cakes", icon: "🍦" },
  { id: 3, name: "Red Velvet", category: "Cakes", icon: "🍰" },
  { id: 4, name: "Birthday Special", category: "Offers", icon: "🎂" },
  { id: 5, name: "Anniversary Package", category: "Offers", icon: "💝" },
  { id: 6, name: "Cupcakes", category: "Categories", icon: "🧁" },
  { id: 7, name: "Pastries", category: "Categories", icon: "🥐" },
  { id: 8, name: "Wedding Cakes", category: "Special", icon: "💒" },
];
