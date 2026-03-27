'use client'

import { useMemo, useState } from 'react'
import { useCart } from '@/app/providers/CartProvider'
import { DELIVERY_FEE } from '@/mocks/config'

export function useCheckoutController() {
  const { items, discount, removeItem, pickItem, discountCode } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const orderId = '69c4ecf8-27a4-839f-8887-1b0ae8951ebb'
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsSuccess(true)
    setIsSubmitting(false)
  }

  const deliFee = useMemo(() => {
    if (total >= DELIVERY_FEE.minimum_cart_amount) return 0
    return DELIVERY_FEE.delivery_fee_amount
  }, [total])

  const payLink = useMemo(() => {
    return `https://payment-api.yimplatform.com/${orderId}/123/checkout?price=${total - discount + deliFee}`
  }, [deliFee, discount, total])

  return {
    isSubmitting,
    isSuccess,
    handleSubmit,
    items,
    discount,
    deliFee,
    total,
    removeItem,
    pickItem,
    orderId,
    payLink,
    discountCode,
  }
}
