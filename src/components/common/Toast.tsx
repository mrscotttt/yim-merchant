'use client'

import { useEffect, useState } from 'react'

interface ToastProps {
  message: string
  isDanger?: boolean
}

export default function Toast({ message, isDanger = false }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-md ${
        isDanger ? 'bg-red-500' : 'bg-green-600'
      }`}
    >
      {message}
    </div>
  )
}
