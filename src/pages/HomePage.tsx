import ProductsContainer from '@/module/products/Container'

export default function HomePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-black uppercase tracking-wide">New Arrivals</h1>
      <ProductsContainer />
    </div>
  )
}
