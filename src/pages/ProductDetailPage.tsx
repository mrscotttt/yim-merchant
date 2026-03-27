'use client'

import Link from 'next/link'
import { MOCK_PRODUCTS } from '@/mocks/products'
import ProductDetail from '@/module/products/views/ProductDetail'
import { useCart } from '@/app/providers/CartProvider'
import { Product } from '@/types'

interface ProductDetailPageProps {
  productId: number
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const product = MOCK_PRODUCTS.find((p) => p.id === productId)
  const { addItem } = useCart()

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  if (!product) {
    return (
      <div>
        <Link href="/" className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:underline">
          ‹ Back
        </Link>
        <p className="text-gray-500">Product not found.</p>
      </div>
    )
  }

  return (
    <div>
      <Link href="/" className="mb-6 flex items-center gap-1 text-sm text-gray-500 hover:underline">
        ‹ Back
      </Link>
      <ProductDetail product={product} onAddToCart={handleAddToCart} />
    </div>
  )
}
