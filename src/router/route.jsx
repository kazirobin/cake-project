import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import AdminPanel from "@/pages/admin-panel/AdminPanel";
import NotFoundPage from "@/pages/error/NotFoundPage";
import CategoryLayout from "@/Layouts/CategoryLayout";
import AllCategory from "@/pages/category/all-category";
import CategoryDetails from "@/pages/category/category-details";
import ProductDetails from "@/pages/category/product/product-details";


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
        // <CategoriesPage />
        element: <AllCategory/>,
      },
      {
        path: ":categoryId",
        //  <CategoryDetailsPage /> 
        element:<CategoryDetails/>,
      },
      {
        path: "product/:productId", // Changed to 'product/' prefix to avoid conflict
        // <CakeDetails />
        element:  <ProductDetails/>,
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <AdminPanel />,
  },
]);

export default router;