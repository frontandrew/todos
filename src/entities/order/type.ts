import { Ingredient } from 'entities/ingredient';

export type OrderStatus = 'draft' | 'created' | 'inprogress' | 'done'
export interface OrderIngredientItem extends Ingredient {
  orderIngredientIndex: string
}

export interface Order {
  id: string | null
  name?: string
  ingredients: OrderIngredientItem[]
  status: OrderStatus
  date?: ReturnType<() => Date>
  total: number
  isReady: boolean
}
