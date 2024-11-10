import { SerializedError } from '@reduxjs/toolkit'
import { Ingredient } from 'entities/ingredient'

export type OrderStatus = 'draft' | 'created' | 'inprogress' | 'done' | 'rejected'
export interface OrderIngredientItem extends Ingredient {
  orderIngredientIndex: string
}

export interface Order {
  id: number | null
  name?: string
  ingredients: OrderIngredientItem[]
  status: OrderStatus
  date?: number
  total: number
  isReady: boolean
  isLoading: boolean,
  error: SerializedError | null,
}
