import { configureStore } from '@reduxjs/toolkit'

import { appLoaderSlice } from 'features/app-loader'
import { apiSlice, wsMiddleware } from 'api'

import { rootReducer } from './root-reducer'

export const setupStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(apiSlice.middleware, appLoaderSlice.middleware, wsMiddleware),
  })
}
