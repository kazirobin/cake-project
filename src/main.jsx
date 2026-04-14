import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import { RouterProvider } from "react-router/dom";
import router from "./router/route.jsx";
import ProviderWrapper from "./components/common/ProviderWrapper";

=======
import "./index.css";
import ProviderWrapper from "./Provider/ProviderWrapper";
import router from "./router/route.jsx";
import { RouterProvider } from "react-router/dom";
>>>>>>> 5c5af2572fa6517dac1f0eda82306bb3e5e62c82

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProviderWrapper>
<<<<<<< HEAD

      <RouterProvider router={router} />
    
=======
      <RouterProvider router={router} />
>>>>>>> 5c5af2572fa6517dac1f0eda82306bb3e5e62c82
    </ProviderWrapper>
  </StrictMode>,
);
