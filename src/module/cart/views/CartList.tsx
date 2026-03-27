'use client'

import { useState } from 'react'
import { CartItem } from '@/types'
import Modal from '@/components/common/Modal'
import Toast from '@/components/common/Toast'
import Image from 'next/image'

interface CartListProps {
  items: CartItem[]
  onRemove: (id: number) => void
  onPick: (id: number, delta: number) => void
  total: number
  viewMode?: boolean
}

interface ToastState {
  message: string
  isDanger: boolean
  key: number
}

export default function CartList({ items, onRemove, onPick, viewMode = false }: CartListProps) {
  const [pendingRemoveId, setPendingRemoveId] = useState<number | null>(null)
  const [toast, setToast] = useState<ToastState | null>(null)

  const pendingProduct = items.find((i) => i.product.id === pendingRemoveId)

  const handlePick = (id: number, delta: number, productName: string) => {
    onPick(id, delta)
    setToast({
      message: delta > 0 ? `${productName} was increased` : `${productName} was decreased`,
      isDanger: delta < 0,
      // eslint-disable-next-line react-hooks/purity
      key: Date.now(),
    })
  }

  if (items.length === 0) {
    return <p className="text-sm tracking-widest text-gray-400 uppercase">Your cart is empty.</p>
  }

  return (
    <div>
      <div className="space-y-0 divide-y divide-gray-200 border-t border-gray-200">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center justify-between py-4">
            <div className="flex">
              <div className="relative mr-6 mb-3 h-20 w-20 overflow-hidden bg-gray-100">
                <Image src={product.images[0]} alt={product.name} fill className="object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-wide uppercase">{product.name}</p>
                <p className="mt-1 text-sm text-gray-500">{product.sku}</p>
                <p className="mt-1 text-sm text-gray-500">
                  ฿{product.price.toLocaleString()} × {quantity}
                </p>
              </div>
            </div>

            {!viewMode ? (
              <>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handlePick(product.id, 1, product.name)}
                    className="text-xs font-semibold tracking-widest text-gray-400 uppercase hover:text-black"
                  >
                    Increase(+)
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handlePick(product.id, -1, product.name)}
                    className="text-xs font-semibold tracking-widest text-gray-400 uppercase hover:text-black"
                  >
                    Decrease(-)
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => setPendingRemoveId(product.id)}
                    className="text-xs font-semibold tracking-widest text-gray-400 uppercase hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>

      <Modal
        isShowModal={pendingRemoveId !== null}
        headerMessage="Remove Item"
        bodyMessage={`Remove "${pendingProduct?.product.name}" from your cart?`}
        onConfirm={() => {
          if (pendingRemoveId !== null) onRemove(pendingRemoveId)
          setPendingRemoveId(null)
        }}
        onCancel={() => setPendingRemoveId(null)}
      />

      {toast && <Toast key={toast.key} message={toast.message} isDanger={toast.isDanger} />}
    </div>
  )
}
