'use client'

import { useForm } from 'react-hook-form'

export function useCheckoutFormHandler() {
  const { register, handleSubmit, reset } = useForm({})

  return { register, handleSubmit, reset }
}
