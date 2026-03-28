import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home } from 'lucide-react';

const CategoryBreadcrumb = ({ categoryName }) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-white/80 hover:text-white">
            <Home className="w-4 h-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white/60" />
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories" className="text-white/80 hover:text-white">
            Categories
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white/60" />
        <BreadcrumbItem>
          <span className="text-white">{categoryName}</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CategoryBreadcrumb;