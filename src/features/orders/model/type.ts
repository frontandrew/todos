import { Order } from 'entities/order'

export interface RawOrder extends Omit<Order, 'id'> {
  _id: string
}

export type OrdersAffiliation = 'user' | 'all'

export interface OrdersState {
  readonly readyState?: number
  orders: Order[]
  affiliation?: OrdersAffiliation
  total?: number
  totalToday?: number
}

export interface OrdersResponse extends Pick<OrdersState, 'total' | 'totalToday'> {
  orders: RawOrder[]
}
