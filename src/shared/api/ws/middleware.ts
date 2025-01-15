import { createAction, Middleware } from '@reduxjs/toolkit'
import { WS_HOST } from 'consts'

import { appLoaderSlice } from 'features/app-loader'

import { isConnectWSAction, isDisconnectWSAction } from './utils'
import { wsActionNames } from './constants'

const wsConnections: { [p: string]: WebSocket } = {}

export const wsMiddleware: Middleware = (store) => (next) => (action) => {

  if (isConnectWSAction(action)) {
    const storeName = action.type.split('/')[0]

    const updateAction = createAction(
      `${storeName}/${wsActionNames.message}`,
      (data: unknown) => ({ payload: data }),
    )

    const updateConnectionStateAction = createAction(
      `${storeName}/${wsActionNames.state}`,
      () => ({ payload: wsConnections[storeName].readyState }),
    )

    if (typeof storeName !== 'string') return next(action)
    if (wsConnections[storeName]) return next(action)

    store.dispatch(appLoaderSlice.actions.setIsLoading(true))
    wsConnections[storeName] = new WebSocket(`${WS_HOST}${action.payload}`)
    const socket = wsConnections[storeName]

    socket.onopen = () => {
      store.dispatch(updateConnectionStateAction())
    }

    socket.onmessage = ({ data }: MessageEvent<string>) => {
      const payload = JSON.parse(data)

      store.dispatch(updateAction(payload))
      store.dispatch(appLoaderSlice.actions.setIsLoading(false))
    }

    socket.onclose = () => {
      store.dispatch(updateConnectionStateAction())
      delete wsConnections[storeName]
    }

    socket.onerror = () => {
      store.dispatch(updateConnectionStateAction())
      // TODO: process error
    }
  }

  if (isDisconnectWSAction(action)) {
    const storeName = action.type.split('/')[0]
    wsConnections[storeName]?.close(1000, `Closed by client, ${Date()}`)
  }


  return next(action)
}
