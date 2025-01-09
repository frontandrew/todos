import { Middleware } from '@reduxjs/toolkit'

import { WS_HOST } from 'consts'
import { appLoaderSlice } from 'features/app-loader'

import { ordersSlice } from './model'
import { formatRawOrder, isOrdersResponse } from './utils'

export const ordersMiddleware: Middleware = (store) => (next) => (action) => {
  const { startWatchOrders, stopWatchOrders, updateState, updateReadyState } = ordersSlice.actions

  let socket: WebSocket | null = null
  let path: string = `${WS_HOST}/orders`

  if (startWatchOrders.match(action)) {
    if (action.payload === 'user') {
      const token = localStorage.getItem('accessToken')?.split(' ').reverse()[0]
      path += `?token=${token}`
    } else {
      path += `/all`
    }

    socket = new WebSocket(path)
    store.dispatch(appLoaderSlice.actions.setIsLoading(true))
    store.dispatch(updateReadyState(socket?.readyState))


    socket.onopen = () => {
      store.dispatch(appLoaderSlice.actions.setIsLoading(false))
      store.dispatch(updateReadyState(socket?.readyState))
    }

    socket.onmessage = ({ data }: MessageEvent<string>) => {
      const payload = JSON.parse(data)

      if (isOrdersResponse(payload)) {
        const formatedPayload = {
          ...payload,
          orders: payload.orders.map(rawOrder => formatRawOrder(rawOrder)),
        }
        store.dispatch(updateState(formatedPayload))
      }

      store.dispatch(updateReadyState(socket?.readyState))
    }

    socket.onclose = () => {
      store.dispatch(updateReadyState(socket?.readyState))
    }

    socket.onerror = () => {
      store.dispatch(updateReadyState(socket?.readyState))
    }
  }

  if (stopWatchOrders.match(action)) {
    socket?.close()
  }

  return next(action)
}
