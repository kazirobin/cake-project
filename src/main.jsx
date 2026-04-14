import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import router from "./router/route.jsx";
import ProviderWrapper from "./components/common/ProviderWrapper";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProviderWrapper>

      <RouterProvider router={router} />
    
    </ProviderWrapper>
  </StrictMode>,
);
