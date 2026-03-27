'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { useCart } from '@/app/providers/CartProvider'
import Modal from '@/components/common/Modal'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const [pendingAddToCart, setPendingAddToCart] = useState<number | null>(null)

  return (
    <div className="group border border-transparent hover:border-black">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-52 w-full overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-2">
          <p className="text-sm font-bold tracking-wide uppercase">{product.name}</p>
          <p className="mt-1 text-sm font-semibold text-gray-700">
            ฿{product.price.toLocaleString()}
          </p>
        </div>
      </Link>

      <div className="px-2 pb-2">
        <button
          onClick={() => setPendingAddToCart(1)}
          className="w-full bg-black py-2 text-xs font-bold tracking-widest text-white uppercase hover:bg-gray-800"
        >
          Add to Cart
        </button>

        <Modal
          isShowModal={pendingAddToCart !== null}
          headerMessage="Add Item"
          bodyMessage={`Add "${product.name}" to your cart?`}
          onConfirm={() => {
            if (pendingAddToCart !== null) addItem(product)
            setPendingAddToCart(null)
          }}
          onCancel={() => setPendingAddToCart(null)}
        />
      </div>
    </div>
  )
}
