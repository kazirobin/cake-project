import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, Link } from "react-router-dom";
import { Home } from "lucide-react";

const pathToText = (path) => {
  return path
    .split("-")
    .filter((segment) => segment !== "")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const DyBread = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter((x) => x);

  const homeRoute = import.meta.env.VITE_HOME_ROUTE || "/";
  const isHomeRoute = pathname === homeRoute;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isHomeRoute && pathnames.length === 0 ? (
            <BreadcrumbPage>
              <Home className="h-4 w-4" />
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to={homeRoute} className="text-white hover:text-white">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {pathnames.length > 0 && <BreadcrumbSeparator />}

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const title = pathToText(value);

          return (
            <React.Fragment key={to}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-white">
                    {title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to} className="text-white hover:text-white">
                      {title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DyBread;
