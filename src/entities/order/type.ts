export type OrderStatus = 'created' | 'progress' | 'done'

export interface Order {
  id: string
  name: string
  number: number
  ingredients: string[]
  status: OrderStatus
  createdAt: string
  updatedAt?: string
}
