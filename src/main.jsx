import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProviderWrapper from "./Provider/ProviderWrapper";
import router from "./router/route.jsx";
import { RouterProvider } from "react-router/dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProviderWrapper>
      <RouterProvider router={router} />
    </ProviderWrapper>
  </StrictMode>,
);
