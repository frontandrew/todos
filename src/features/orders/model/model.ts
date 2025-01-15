import { createAction, createSlice } from '@reduxjs/toolkit'
import { wsActionNames } from 'api'

import { formatRawOrder, isUpdateOrdersAction, isUpdateStateAction } from './utils'
import { OrdersAffiliation, OrdersState } from './type'

const sliceName = 'orders'
const initState: OrdersState = {
  orders: [],
  readyState: 3,
}
const connectOrders = createAction(`${sliceName}/${wsActionNames.connect}`, (affiliation: OrdersAffiliation) => {
  if (affiliation === 'user') {
    const token = localStorage.getItem('accessToken')?.split(' ').reverse()[0]
    return { payload: `/orders?token=${token}` }
  }

  else return { payload: '/orders/all' }
})
const disconnectOrders = createAction(`${sliceName}/${wsActionNames.disconnect}`)


export const ordersSlice = createSlice({
  name: sliceName,
  initialState: initState,
  selectors: { state: state => state },
  reducers: {},
  extraReducers: builder => builder
    .addCase(connectOrders, (state) => ({ ...state, readyState: 0 }))
    .addCase(disconnectOrders, (state) => ({ ...state, readyState: 2 }))
    .addMatcher(isUpdateStateAction, (state, { payload }) => ({ ...state, readyState: payload }))
    .addMatcher(isUpdateOrdersAction, (state, { payload }) => {
      const { success, orders: rawOrders, total, totalToday } = payload
      if (success) {
        const orders = rawOrders.map((rawOrder) => formatRawOrder(rawOrder))
        return { ...state, total, totalToday, orders }
      }

      return { ...state, total: 0, totalToday: 0, orders: [] }
    })
})


export const actions = {
  connectOrders,
  disconnectOrders,
}
