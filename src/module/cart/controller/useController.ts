'use client'

import { useCart } from '@/app/providers/CartProvider'

export function useCartController() {
  const { items, removeItem, pickItem } = useCart()

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return { items, removeItem, pickItem, total, count }
}
