'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PROMOCODE_CONFIG, DELIVERY_FEE } from '@/mocks/config'
import { useCart } from '@/app/providers/CartProvider'

interface CartSummaryProps {
  total: number
}

export default function CartSummary({ total }: CartSummaryProps) {
  const { discount, discountCode, setPromo } = useCart()
  const [promoCode, setPromoCode] = useState(discountCode)
  const [codeStatus, setCodeStatus] = useState(discountCode ? 'success' : '')

  const handleApplyPromo = (code: string) => {
    const found = PROMOCODE_CONFIG.find((item) => item.discount_code === code.trim().toUpperCase())

    if (found) {
      setPromo(found.discount_amount, code.trim().toUpperCase())
      setCodeStatus('success')
    } else {
      setPromo(0, '')
      setCodeStatus('invalid code!')
    }
  }

  const deliFee = useMemo(() => {
    if (total >= DELIVERY_FEE.minimum_cart_amount) return 0
    return DELIVERY_FEE.delivery_fee_amount
  }, [total])

  if (!total) return null

  return (
    <div className="border border-gray-200 bg-white p-6">
      <h2 className="mb-4 text-sm font-black tracking-widest uppercase">Order Summary</h2>

      <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
        <div className="ml-auto w-full max-w-md">
          <div className="flex items-center justify-end gap-2">
            <span className="tracking-wider text-gray-500 uppercase">{codeStatus}</span>
            <input
              type="text"
              placeholder="Try your code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="h-8 w-48 border border-gray-400 px-2 text-sm outline-none"
            />
            <button
              type="button"
              className="h-8 bg-gray-900 px-2 text-sm font-semibold text-white hover:opacity-90"
              onClick={() => handleApplyPromo(promoCode)}
            >
              Apply Coupon
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="tracking-wider text-gray-500 uppercase">Subtotal</span>
          <span className="font-semibold">฿{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="tracking-wider text-gray-500 uppercase">Discount</span>
          <span className="font-semibold">-฿{discount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="tracking-wider text-gray-500 uppercase">Delivery Fee</span>
          <span className="font-semibold">฿{deliFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t border-black pt-3">
          <span className="font-black tracking-wider uppercase">Total</span>
          <span className="text-lg font-black">
            ฿{(total - discount + deliFee).toLocaleString()}
          </span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full bg-black py-4 text-center text-xs font-bold tracking-widest text-white uppercase hover:bg-gray-800"
      >
        Proceed to Checkout
      </Link>
    </div>
  )
}
