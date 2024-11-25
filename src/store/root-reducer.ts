import { combineReducers } from '@reduxjs/toolkit'

import { apiSlice } from 'api'
import { ingredientsSlice } from 'features/burger-ingredients'
import { currentIngredientSlice } from 'entities/ingredient'
import { currentOrderSlice } from 'entities/order'
import { appLoaderSlice } from 'features/app-loader'

export const rootReducer = combineReducers({
  [currentOrderSlice.reducerPath]: currentOrderSlice.reducer,
  [currentIngredientSlice.reducerPath]: currentIngredientSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
  [appLoaderSlice.reducerPath]: appLoaderSlice.reducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
})
