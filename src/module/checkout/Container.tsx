'use client'

import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'
import CartList from '../cart/views/CartList'
import { useCheckoutController } from './controller/useController'
import { useCheckoutFormHandler } from './controller/useFormHandler'
import CheckoutForm from './views/CheckoutForm'

export default function CheckoutContainer() {
  const {
    isSubmitting,
    handleSubmit,
    items,
    total,
    removeItem,
    pickItem,
    orderId,
    discount,
    deliFee,
    payLink,
    discountCode,
  } = useCheckoutController()
  const { register, handleSubmit: rhfHandleSubmit } = useCheckoutFormHandler()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black tracking-wide uppercase">Checkout</h1>

      {total ? (
        <>
          <h1 className="mb-6 text-2xl font-black tracking-wide uppercase">Order Id: {orderId}</h1>
          <CartList
            items={items}
            onRemove={removeItem}
            onPick={pickItem}
            total={total}
            viewMode={true}
          />
          <div className="mb-12 border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-black tracking-widest uppercase">Order Summary</h2>

            <div className="space-y-3 border-t border-gray-200 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="tracking-wider text-gray-500 uppercase">Subtotal</span>
                <span className="font-semibold">฿{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="tracking-wider text-gray-500 uppercase">Discount</span>
                <span className="font-semibold">
                  {discountCode} -฿{discount.toLocaleString()}
                </span>
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
          </div>

          <div className="my-6 flex flex-col items-center gap-4">
            <QRCodeCanvas value={payLink} size={200} />

            <p className="text-sm break-all text-gray-600">{payLink}</p>
          </div>

          <CheckoutForm onSubmit={rhfHandleSubmit(handleSubmit)} isSubmitting={isSubmitting} />
        </>
      ) : (
        <p className="text-sm tracking-widest text-gray-400 uppercase">Your cart is empty.</p>
      )}
    </div>
  )
}
