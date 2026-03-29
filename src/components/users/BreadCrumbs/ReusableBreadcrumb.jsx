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

const ReusableBreadcrumb = ({ items, showHome = true, homePath = '/' }) => {
  return (
    <Breadcrumb className="mb-2 p-2">
      <BreadcrumbList>
        {showHome && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={homePath} >
                <Home className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="" />
          </>
        )}
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.path ? (
                <BreadcrumbLink 
                  href={item.path} 
                  className=" "
                >
                  {item.label}
                </BreadcrumbLink>
              ) : (
                <span className="">{item.label}</span>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator className="" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Usage examples:

// 1. Category page breadcrumb (replicates your original)
const CategoryBreadcrumb = ({ categoryName }) => {
  const items = [
    { label: 'Categories', path: '/categories' },
    { label: categoryName }
  ];
  
  return <ReusableBreadcrumb items={items} />;
};

// 2. Product page breadcrumb
const ProductBreadcrumb = ({ categoryName, productName }) => {
  const items = [
    { label: 'Categories', path: '/categories' },
    { label: categoryName, path: `/categories/${categoryName}` },
    { label: productName }
  ];
  
  return <ReusableBreadcrumb items={items} />;
};

// 3. Dashboard/Admin breadcrumb
const AdminBreadcrumb = ({ page, subPage }) => {
  const items = [
    { label: 'Dashboard', path: '/admin' },
    ...(subPage ? [{ label: page, path: `/admin/${page}` }, { label: subPage }] 
                 : [{ label: page }])
  ];
  
  return <ReusableBreadcrumb items={items} />;
};

// 4. Direct usage with custom items
const CustomPage = () => {
  const breadcrumbItems = [
    { label: 'Products', path: '/products' },
    { label: 'Electronics', path: '/products/electronics' },
    { label: 'Smartphones', path: '/products/electronics/smartphones' },
    { label: 'iPhone 15' }
  ];

  return (
    <div>
      <ReusableBreadcrumb items={breadcrumbItems} />
      {/* Rest of your page content */}
    </div>
  );
};

export default ReusableBreadcrumb;