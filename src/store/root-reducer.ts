import { combineReducers } from '@reduxjs/toolkit'

import { apiSlice } from 'api'
import { ingredientsSlice } from 'features/burger-ingredients'
import { currentOrderSlice } from 'entities/order'
import { appLoaderSlice } from 'features/app-loader'
import { userSlice } from 'entities/user'
import { authSlice } from 'features/authentification'

export const rootReducer = combineReducers({
  [currentOrderSlice.reducerPath]: currentOrderSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [appLoaderSlice.reducerPath]: appLoaderSlice.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
})
