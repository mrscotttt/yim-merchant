'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/app/providers/CartProvider'

export default function Header() {
  const { items } = useCart()
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <header className="flex items-center justify-between border-b border-black px-6 py-4">
      <Link
        href="/"
        className="flex h-12 w-20 items-center justify-center border border-black text-sm font-black tracking-widest uppercase"
      >
        YIM
      </Link>
      <Link
        href="/cart"
        className="flex items-center gap-2 bg-black px-5 py-2 text-xs font-bold tracking-widest text-white uppercase hover:bg-gray-800"
      >
        <ShoppingCart size={15} />
        <span>฿{cartTotal.toLocaleString()}</span>
        {cartCount > 0 && <span>({cartCount})</span>}
      </Link>
    </header>
  )
}
