// src/layouts/CategoryLayout.jsx
import { Outlet } from "react-router-dom";

export default function CategoryLayout() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-8 lg:flex-row">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
