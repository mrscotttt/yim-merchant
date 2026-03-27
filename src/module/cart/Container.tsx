'use client'

import { useCartController } from './controller/useController'
import CartList from './views/CartList'
import CartSummary from './views/CartSummary'
import RecommendItems from './views/RecommendItems'

export default function CartContainer() {
  const { items, removeItem, pickItem, total } = useCartController()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black tracking-wide uppercase">Your Cart</h1>
      <CartList items={items} onRemove={removeItem} onPick={pickItem} total={total} />
      <CartSummary total={total} />
      <RecommendItems cartItems={items} />
    </div>
  )
}
