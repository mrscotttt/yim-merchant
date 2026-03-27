'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  discount: number
  discountCode: string
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'PICK_QUANTITY'; productId: number; delta: number }
  | { type: 'SET_PROMO'; discount: number; discountCode: string }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; state: CartState }

interface CartContextValue extends CartState {
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  pickItem: (productId: number, delta: number) => void
  setPromo: (discount: number, discountCode: string) => void
  clearCart: () => void
}

const INITIAL_STATE: CartState = { items: [], discount: 0, discountCode: '' }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'HYDRATE':
      return action.state

    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] }
    }

    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }

    case 'PICK_QUANTITY': {
      const next = state.items
        .map((i) =>
          i.product.id === action.productId ? { ...i, quantity: i.quantity + action.delta } : i
        )
        .filter((i) => i.quantity > 0)
      return { ...state, items: next }
    }

    case 'SET_PROMO':
      return { ...state, discount: action.discount, discountCode: action.discountCode }

    case 'CLEAR_CART':
      return INITIAL_STATE

    default:
      return state
  }
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'cart-storage'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

  //localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'HYDRATE', state: JSON.parse(raw) })
    } catch {}
  }, [])

  useEffect(() => {
    //main cart storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', product })
  const removeItem = (productId: number) => dispatch({ type: 'REMOVE_ITEM', productId })
  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity })
  const pickItem = (productId: number, delta: number) =>
    dispatch({ type: 'PICK_QUANTITY', productId, delta })
  const setPromo = (discount: number, discountCode: string) =>
    dispatch({ type: 'SET_PROMO', discount, discountCode })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider
      value={{ ...state, addItem, removeItem, updateQuantity, pickItem, setPromo, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
