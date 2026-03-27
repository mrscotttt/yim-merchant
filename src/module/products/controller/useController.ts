'use client'

import { useState } from 'react'
import { MOCK_PRODUCTS } from '@/mocks/products'
import { Product } from '@/types'

export interface ProductFilter {
  name: string
  minPrice: number | ''
  maxPrice: number | ''
}

const INITIAL_FILTER: ProductFilter = { name: '', minPrice: '', maxPrice: '' }

export function useProductsController() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS)
  const [filter, setFilter] = useState<ProductFilter>(INITIAL_FILTER)

  const filteredProducts = products.filter((p) => {
    const matchName = !filter.name || p.name.toLowerCase().includes(filter.name.toLowerCase())
    const matchMin = filter.minPrice === '' || p.price >= filter.minPrice
    const matchMax = filter.maxPrice === '' || p.price <= filter.maxPrice
    return matchName && matchMin && matchMax
  })

  const updateFilter = (patch: Partial<ProductFilter>) =>
    setFilter((prev) => ({ ...prev, ...patch }))

  const resetFilter = () => setFilter(INITIAL_FILTER)

  return { filteredProducts, filter, updateFilter, resetFilter }
}
