<<<<<<< HEAD
export { default as RootLayout } from "@/components/common/layouts/RootLayout";
export { default as CategoryLayout } from "@/components/common/layouts/CategoryLayout";

// Pages
export { default as Home } from "@/components/platform/home/home-page";
export { default as Login } from "@/components/platform/login/login-page";
export { default as Register } from "@/components/platform/register/register-page";
export { default as NotFoundPage } from "@/components/common/error/NotFoundPage";

// Category
export { default as AllCategory } from "@/components/platform/category/all-category";
export { default as CategoryDetails } from "@/components/platform/category/category-details";

// Product
export { default as ProductDetails } from "@/components/platform/product/product-details-page";

// Cart & Checkout
export { default as CartPage } from "@/components/platform/cart/cart-page";
export { default as CheckoutPage } from "@/components/platform/checkout/checkout";

// Extra
export { default as Gifts } from "@/components/platform/gifts/gifts";
export { default as WishGenerator } from "@/components/platform/wish-generator/wish-generator-page";

// Admin
export { default as AdminPanel } from "@/components/platform/admin/AdminPanel";
export { default as Dashboard } from "@/components/platform/admin/Dashboard";
export { default as AllProducts } from "@/components/platform/admin/AllProducts";
export { default as AddProduct } from "@/components/platform/admin/AddProduct";
export { default as UpdateProduct } from "@/components/platform/admin/UpdateProduct";
export { default as ManageCategory } from "@/components/platform/admin/ManageCategory";
export { default as Moderators } from "@/components/platform/admin/Moderators";
export { default as Orders } from "@/components/platform/admin/Orders";
=======
export { createBrowserRouter } from "react-router";
export { default as RootLayout } from "../components/layouts/RootLayout";
export { default as Home } from "@/components/home/page/Home";
export { default as Login } from "@/components/login/Login";
export { default as Register } from "@/components/register/Register";
export { default as AdminPanel } from "@/components/admin-panel/sidebar/AdminPanel";
export { default as NotFoundPage } from "@/components/error/NotFoundPage";
export { default as CategoryLayout } from "@/components/layouts/CategoryLayout";
export { default as AllCategory } from "@/components/category/AllCategory";
export { default as CategoryDetails } from "@/components/category/category-details";
export { default as ProductDetails } from "@/components/product/product-details";
export { default as AddProduct } from "@/components/admin-panel/pages/AddProduct";
export { default as Dashboard } from "@/components/admin-panel/pages/Dashboard";
export { default as AllProducts } from "@/components/admin-panel/pages/AllProducts";
export { default as Moderators } from "@/components/admin-panel/pages/Moderators";
export { default as Orders } from "@/components/admin-panel/pages/Orders";
export { default as WishGenerator } from "../components/wish-generator/wish-generator";
export { default as ManageCategory } from "@/components/admin-panel/pages/ManageCategory";
export { default as CartPage } from "@/components/cart/page/cart-page";
export { default as CheckoutPage } from "@/components/checkout/checkout";
export { default as Gifts } from "@/components/gifts/gifts";
export { default as UpdateProduct } from "@/components/admin-panel/pages/UpdateProduct";
>>>>>>> 7ed81a6a461cddbe19db9026c483f04919ab8b1f
