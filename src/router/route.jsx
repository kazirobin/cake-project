import { createBrowserRouter } from "react-router";
import {RootLayout,NotFoundPage,Home,WishGenerator, Login, Register, CartPage, CheckoutPage, Gifts, CategoryLayout, AllCategory, CategoryDetails, ProductDetails, AdminPanel, Dashboard, AllProducts, UpdateProduct, AddProduct, ManageCategory, Moderators, Orders} from "@/router"

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
