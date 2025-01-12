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
    updateState: (state, { payload }: PayloadAction<Omit<OrdersState, 'readyState' | 'affiliation'>>) => ({ ...state, ...payload }),
    stopWatchOrders: () => initState,
  },
})
