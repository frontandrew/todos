import { createSlice } from '@reduxjs/toolkit'

import { Ingredient } from 'entities/ingredient'
import { apiSlice } from 'api'

const initState: Ingredient[] = []

export const ingredientsSlice = createSlice({
  name: 'ingrdients',
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getIngredients.matchFulfilled,
      (_state, { payload }) => payload
    )
   }
})
