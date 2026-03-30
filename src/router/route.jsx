import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "@/pages/users/home/Home";
import Login from "@/pages/users/Login/Login";
import Register from "@/pages/users/Register/Register";
import AdminPanel from "@/pages/admin/AdminPanel";
import NotFoundPage from "@/pages/error/NotFoundPage";
import CategoryLayout from "@/Layouts/CategoryLayout";
import AllCategory from "@/pages/users/category/all-category";
import CategoryDetails from "@/pages/users/category/category-details";
import ProductDetails from "@/pages/users/product/product-details";
import AddProduct from "@/pages/admin/AddProduct";
import Dashboard from "@/pages/admin/Dashboard";
import AllProducts from "@/pages/admin/AllProducts";
import Moderators from "@/pages/admin/Moderators";
import Orders from "@/pages/admin/Orders";
import WishGenerator from "../pages/users/wish-generator/wish-generator";
import ManageCategory from "@/pages/admin/ManageCategory";
import CartPage from "@/components/users/cart/cart-page";
import CheckoutPage from "@/components/users/checkout/checkout";
import Gifts from "@/pages/users/gifts/gifts";
import UpdateProduct from "@/pages/admin/UpdateProduct";

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
