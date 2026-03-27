import ProductDetailPage from '@/pages/ProductDetailPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  return <ProductDetailPage productId={Number(id)} />
}
