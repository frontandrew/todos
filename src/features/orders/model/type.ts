import { Order } from 'entities/order'
import { Action } from '@reduxjs/toolkit'

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
  success: boolean
}

export interface OrdersUpdateAction extends Action {
  payload: OrdersResponse
}

export interface OrdersStateAction extends Action {
  payload: number
}
