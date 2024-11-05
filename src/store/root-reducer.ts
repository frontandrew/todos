import { combineReducers } from '@reduxjs/toolkit'

import { ingredientsSlice } from 'features/burger-ingredients'
import { apiSlice } from 'api'

export const rootReduser = combineReducers({
    ingredients: ingredientsSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  })
