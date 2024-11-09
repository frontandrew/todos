import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from 'api'

import { Ingredient, IngredientType } from 'entities/ingredient'
import { currentOrderSlice } from 'entities/order'

const initState: Ingredient[] = []

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => builder

    .addCase(currentOrderSlice.actions.removeOrderIngredient, (state, { payload }) => state
      .map((item) => item.id === payload.ingrId
        ? { ...item, count: undefined }
        : item
      )
    )

    .addCase(currentOrderSlice.actions.addOrderIngredient, (state, { payload }) => state
      .map((item) => {
        if (item.id === payload.item.id) {
          const nextCount = payload.item.type === IngredientType.BUN ? 2 : 1

          return { ...item, count: typeof item.count === 'number'
              ? item.count + nextCount
              : nextCount
          }
        }

        return item
      })
    )

    .addCase(currentOrderSlice.actions.createNewOrder, (state, { payload }) => state
      .map((item) => {
        if (item.id === payload.id) {
          const nextCount = payload.type === IngredientType.BUN ? 2 : 1

          return { ...item, count: typeof item.count === 'number'
              ? item.count + nextCount
              : nextCount
          }}

        return item
      })
    )

    .addMatcher(apiSlice.endpoints.getIngredients.matchFulfilled, (_state, { payload }) => payload)
})
