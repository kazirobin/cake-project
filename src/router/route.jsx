import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import AdminPanel from "@/pages/admin-panel/AdminPanel";
import NotFoundPage from "@/pages/error/NotFoundPage";
import CategoryLayout from "@/Layouts/CategoryLayout";


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
        element: <> </>,
      },
      {
        path: ":categoryId",
        //  <CategoryDetailsPage /> 
        element:<>hello</>,
      },
      {
        path: "product/:productId", // Changed to 'product/' prefix to avoid conflict
        // <CakeDetails />
        element:  <>hello</>,
      },
    ],
  },
  {
    path: "/admin-panel",
    element: <AdminPanel />,
  },
]);

export default router;