import { CartItem } from '@/types'
import { MOCK_PRODUCTS } from '@/mocks/products'
import ProductCard from '@/module/products/views/ProductCard'

interface RecommendItemsProps {
  cartItems: CartItem[]
}

export default function RecommendItems({ cartItems }: RecommendItemsProps) {
  const cartIds = new Set(cartItems.map((i) => i.product.id))
  const recommended = MOCK_PRODUCTS.filter((p) => !cartIds.has(p.id)).slice(0, 4)

  if (recommended.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-sm font-black tracking-widest uppercase">You May Also Like</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
