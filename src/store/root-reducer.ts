import { combineReducers } from '@reduxjs/toolkit'

import { ingredientsSlice } from 'features/burger-ingredients'
import { currentIngredientSlice } from 'entities/ingredient'
import { apiSlice } from 'api'

export const rootReduser = combineReducers({
    [currentIngredientSlice.reducerPath]: currentIngredientSlice.reducer,
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  })
