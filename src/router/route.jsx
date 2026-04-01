import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layouts/RootLayout";
import Home from "@/components/home/page/Home";
import Login from "@/components/login/Login";
import Register from "@/components/register/Register";
import AdminPanel from "@/components/admin/AdminPanel";
import NotFoundPage from "@/components/error/NotFoundPage";
import CategoryLayout from "@/components/layouts/CategoryLayout";
import AllCategory from "@/components/category/all-category";
import CategoryDetails from "@/components/category/category-details";
import ProductDetails from "@/components/product/product-details";
import AddProduct from "@/components/admin/AddProduct";
import Dashboard from "@/components/admin/Dashboard";
import AllProducts from "@/components/admin/AllProducts";
import Moderators from "@/components/admin/Moderators";
import Orders from "@/components/admin/Orders";
import WishGenerator from "../components/wish-generator/wish-generator";
import ManageCategory from "@/components/admin/ManageCategory";
import CartPage from "@/components/cart/page/cart-page";
import CheckoutPage from "@/components/checkout/checkout";
import Gifts from "@/components/gifts/gifts";
import UpdateProduct from "@/components/admin/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/wish-generator",
        element: <WishGenerator />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/gifts",
        element: <Gifts />,
      },
    ],
  },
  {
    path: "/categories",
    element: <CategoryLayout />,
    children: [
      {
        index: true,
        element: <AllCategory />,
      },
      {
        path: ":categoryId",
        element: <CategoryDetails />,
      },
      {
        path: ":categoryId/product/:productId", // Changed to include categoryId in the path
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <AdminPanel />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "all-products/:id",
        element: <UpdateProduct />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-category",
        element: <ManageCategory />,
      },
      {
        path: "moderators",
        element: <Moderators />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  // Optional: Add a direct product route
  {
    path: "/product/:productId",
    element: <ProductDetails />,
  },
]);

export default router;
