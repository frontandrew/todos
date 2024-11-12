import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from 'api'

import { rootReduser } from './root-reducer'

export const setupStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware)
  })
}
