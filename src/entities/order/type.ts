export type OrderStatus = 'created' | 'pending' | 'done'

export interface Order {
  id: string
  name: string
  number: number
  ingredients: string[]
  status: OrderStatus
  createdAt: string
  updatedAt?: string
}
