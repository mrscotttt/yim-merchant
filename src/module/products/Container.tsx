'use client'

import { useProductsController } from './controller/useController'
import ProductCard from './views/ProductCard'
import ProductFilterView from './views/ProductFilter'

export default function ProductsContainer() {
  const { filteredProducts, filter, updateFilter, resetFilter } = useProductsController()

  return (
    <div>
      <ProductFilterView filter={filter} onUpdate={updateFilter} onReset={resetFilter} />

      {filteredProducts.length === 0 ? (
        <p className="text-sm tracking-widest text-gray-400 uppercase">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
