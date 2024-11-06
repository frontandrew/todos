import { combineReducers } from '@reduxjs/toolkit'

import { ingredientsSlice } from 'features/burger-ingredients'
import { currentIngredientSlice } from 'entities/ingredient'
import { apiSlice } from 'api'
import { currentOrderSlice } from 'entities/order'

export const rootReduser = combineReducers({
  [currentOrderSlice.reducerPath]: currentOrderSlice.reducer,
  [currentIngredientSlice.reducerPath]: currentIngredientSlice.reducer,
  [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
})
