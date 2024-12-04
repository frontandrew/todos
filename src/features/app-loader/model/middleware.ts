import { Middleware } from '@reduxjs/toolkit'

import { appLoaderSlice } from './model'
import { isStoreAction } from './utils'

export const appLoaderMiddleware: Middleware = (store) => (next) => (action) => {
  const { setIsLoading } = appLoaderSlice.actions

  if (isStoreAction(action)) {
    if (action.type.endsWith('/pending')) {
      store.dispatch(setIsLoading(true))
    }

    if (action.type.endsWith('/fulfilled') ||  action.type.endsWith('/rejected')) {
      store.dispatch(setIsLoading(false))
    }
  }

  return next(action)
}
