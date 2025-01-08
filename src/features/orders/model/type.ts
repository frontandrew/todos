import { Order } from 'entities/order'

export type OrdersAffiliation = 'user' | 'all'

export interface OrdersState {
  readonly readyState?: number
  // readonly readyState: Pick<WebSocket, 'readyState'>
  orders: Order[]
  affiliation?: OrdersAffiliation
  total?: number
  totalToday?: number
}

export type OrdersResponse = Pick<OrdersState, 'orders' | 'total' | 'totalToday'>
