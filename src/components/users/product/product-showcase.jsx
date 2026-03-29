import React from 'react'
import ProductCard from './product-card'

const ProductShowcase = ({title,details,productList,children}) => {
  return (
     <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            {details}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {children}
      </section>
  )
}

export default ProductShowcase