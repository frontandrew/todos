import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CurrentIngredientState, Ingredient } from 'entities/ingredient'

const initState: CurrentIngredientState = {
  ingredient: null
}

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState: initState,
  reducers: {
    setCurrentIngredient: (state, { payload }: PayloadAction<Ingredient>) => {
      state.ingredient = payload
    },
    resetCurrentIngredient: (state) => {
      state.ingredient = initState.ingredient
    },
  },
})
