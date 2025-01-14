import { Middleware,  } from '@reduxjs/toolkit'

import { WS_HOST } from 'consts'
import { appLoaderSlice } from 'features/app-loader'
import { ingredientsSlice } from 'features/burger-ingredients'

import { ordersSlice } from './model'
import { formatRawOrder, isOrdersResponse } from './utils'
import { checkOrdersValidity } from 'features/orders/model/utils/check-orders-validity.ts'

let socket: WebSocket | null = null

export const ordersMiddleware: Middleware = (store) => (next) => (action) => {
  const { startWatchOrders, stopWatchOrders, updateState, updateReadyState } = ordersSlice.actions

  if (startWatchOrders.match(action)) {
    let path: string = `${WS_HOST}/orders`

    if (action.payload === 'user') {
      const token = localStorage.getItem('accessToken')?.split(' ').reverse()[0]
      path += `?token=${token}`
    } else {
      path += `/all`
    }

    store.dispatch(appLoaderSlice.actions.setIsLoading(true))
    socket = new WebSocket(path)
    store.dispatch(updateReadyState(socket?.readyState))

    socket.onopen = () => {
      store.dispatch(updateReadyState(socket?.readyState))
    }

    socket.onmessage = ({ data }: MessageEvent<string>) => {
      const payload = JSON.parse(data)

      if (isOrdersResponse(payload)) {
        const ingredients = ingredientsSlice.selectors.getState(store.getState())
        const formatedOrders = payload.orders.map(rawOrder => formatRawOrder(rawOrder))
        store.dispatch(updateState({ ...payload, orders: checkOrdersValidity({
            orders: formatedOrders,
            ingrs: ingredients,
        }) }))
      }

      store.dispatch(updateReadyState(socket?.readyState))
      store.dispatch(appLoaderSlice.actions.setIsLoading(false))
    }

    socket.onclose = () => {
      store.dispatch(updateReadyState(socket?.readyState))
    }

    socket.onerror = () => {
      store.dispatch(updateReadyState(socket?.readyState))
    }
  }

  if (stopWatchOrders.match(action)) {
    socket?.close(1000, `Closed by client, ${Date()}`)
    socket = null
  }

  return next(action)
}
