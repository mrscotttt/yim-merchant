export interface Product {
  id: number
  name: string
  price: number
  unit: string
  sku: string
  size: number
  brand: string
  color: string
  description: string
  stock: number
  images: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}
