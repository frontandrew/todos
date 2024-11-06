import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Ingredient } from 'entities/ingredient'

import { Order } from './type'
import { genItemIndex } from 'utils'

const initState: Order = {
  id: null,
  ingredients: [],
  status: 'draft',
  total: 0
}

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState: initState,
  reducers: {
    createNewOrder: (state, { payload }: PayloadAction<Ingredient>) => {
      state.ingredients.push({ ...payload, orderIngredientIndex: genItemIndex()})
      state.id = genItemIndex(6)
      state.total += payload.price
    },
    addOrderIngredient: (state, { payload }: PayloadAction<Ingredient>) => {
      state.ingredients.push({ ...payload, orderIngredientIndex: genItemIndex()})
      state.total += payload.price
    },
    removeOrderIngredient: (state, { payload }: PayloadAction<string>) => {
      const index = state.ingredients.findIndex((item) => item.orderIngredientIndex === payload)
      state.ingredients.splice(index, 1)
      state.total = state.ingredients.reduce((total, { price }) => total + price, 0)
    },
    // requestOrder: (state) => {
    //   state.ingredient = initState.ingredient
    // },
  },
})
