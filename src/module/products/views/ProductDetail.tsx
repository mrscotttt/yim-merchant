'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types'
import Modal from '@/components/common/Modal'

interface ProductDetailProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductDetail({ product, onAddToCart }: ProductDetailProps) {
  const [selectedImg, setSelectedImg] = useState(0)
  const [pendingAddToCart, setPendingAddToCart] = useState<number | null>(null)

  return (
    <div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Images */}
        <div>
          <div className="relative mb-3 h-96 w-full overflow-hidden bg-gray-100">
            <Image
              src={product.images[selectedImg]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                className={`relative h-20 w-20 overflow-hidden border-2 bg-gray-100 ${selectedImg === i ? 'border-black' : 'border-transparent hover:border-gray-400'}`}
              >
                <Image src={src} alt={`${product.name} ${i + 1}`} fill className="object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="mb-1 text-xs tracking-widest text-gray-500 uppercase">{product.brand}</p>
          <h1 className="text-3xl font-black tracking-wide uppercase">{product.name}</h1>
          <p className="mt-3 text-2xl font-bold">฿{product.price.toLocaleString()}</p>

          <div className="mt-6 space-y-1 border-t border-gray-200 pt-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold tracking-wider text-black uppercase">SKU</span>{' '}
              {product.sku}
            </p>
            <p>
              <span className="font-semibold tracking-wider text-black uppercase">Size</span> EU{' '}
              {product.size}
            </p>
            <p>
              <span className="font-semibold tracking-wider text-black uppercase">Color</span>{' '}
              {product.color}
            </p>
            <p>
              <span className="font-semibold tracking-wider text-black uppercase">Stock</span>{' '}
              {product.stock} pairs left
            </p>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>

          <button
            onClick={() => setPendingAddToCart(1)}
            className="mt-8 w-full bg-black py-4 text-sm font-bold tracking-widest text-white uppercase hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>

        <Modal
          isShowModal={pendingAddToCart !== null}
          headerMessage="Add Item"
          bodyMessage={`Add "${product.name}" to your cart?`}
          onConfirm={() => {
            if (pendingAddToCart !== null) onAddToCart(product)
            setPendingAddToCart(null)
          }}
          onCancel={() => setPendingAddToCart(null)}
        />
      </div>
    </div>
  )
}
