import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import AdminPanel from "@/pages/admin-panel/AdminPanel";
import NotFoundPage from "@/pages/error/NotFoundPage";
import CakeDetails from "@/pages/CakeDetails/CakeDetails";
import CategoryLayout from "@/Layouts/CategoryLayout";
import CategoriesPage from "@/pages/categories";
import CategoryDetailsPage from "@/pages/categories/[categoryId]";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/categories",
    element: <CategoryLayout />,
    children: [
      {
        index: true,
        element: <CategoriesPage />,
      },
      {
        path: ":categoryId",
        element: <CategoryDetailsPage />,
      },
      {
        path: "product/:productId", // Changed to 'product/' prefix to avoid conflict
        element: <CakeDetails />,
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <AdminPanel />,
  },
]);

export default router;