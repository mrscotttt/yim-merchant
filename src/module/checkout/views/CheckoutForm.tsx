import { useCart } from '@/app/providers/CartProvider'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/components/common/Modal'

interface Props {
  onSubmit: () => void
  isSubmitting: boolean
}

export default function CheckoutForm({ onSubmit, isSubmitting }: Props) {
  const { clearCart } = useCart()
  const [pendingConfirm, setPendingConfirm] = useState<number | null>(null)
  const router = useRouter()
  const submit = useCallback(() => {
    clearCart()
    router.push('/')
  }, [clearCart, router])

  return (
    <form className="mx-auto max-w-lg space-y-5" onSubmit={onSubmit}>
      <button
        type="submit"
        disabled={isSubmitting}
        onClick={() => setPendingConfirm(1)}
        className="w-full bg-black py-4 text-sm font-bold tracking-widest text-white uppercase hover:bg-gray-800 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </button>

      <Modal
        isShowModal={pendingConfirm !== null}
        headerMessage="Place Order"
        bodyMessage={`Finish and go to main page?`}
        onConfirm={() => submit()}
        onCancel={() => setPendingConfirm(null)}
      />
    </form>
  )
}
