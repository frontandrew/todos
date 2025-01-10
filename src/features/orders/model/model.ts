import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrdersAffiliation, OrdersState } from './type'

const initState: OrdersState = {
  orders: [],
  readyState: 3,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initState,
  selectors: { state: state => state },
  reducers: {
    startWatchOrders: (state, { payload }: PayloadAction<OrdersAffiliation>) => {
      state.affiliation = payload
    },
    updateReadyState: (state, { payload }: PayloadAction<OrdersState['readyState']>) => {
      state.readyState = payload
    },
    updateState: (state, { payload }: PayloadAction<OrdersState>) => ({ ...state, ...payload }),
    resetOrders: (state) => ({ ...state, orders: initState.orders }),
    stopWatchOrders: (state) => ({ ...initState, orders: state.orders }),
  },
})
