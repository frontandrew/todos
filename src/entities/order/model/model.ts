import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { genItemIndex } from 'utils'
import { Ingredient } from 'entities/ingredient'

import { addIngredientIntoOrder, calcOrderTotal, removeIngredientFromOrder } from './utils'
import { Order } from '../type'

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

      state.ingredients = addIngredientIntoOrder(state.ingredients, payload)
      state.id = genItemIndex(6)
      state.total = calcOrderTotal(state.ingredients)
    },
    addOrderIngredient: (state, { payload }: PayloadAction<Ingredient>) => {
      state.ingredients = addIngredientIntoOrder(state.ingredients, payload)
      state.total = calcOrderTotal(state.ingredients)
    },
    removeOrderIngredient: (state, { payload }: PayloadAction<string>) => {
      state.ingredients = removeIngredientFromOrder(state.ingredients, payload)
      state.total = calcOrderTotal(state.ingredients)
    },
    // requestOrder: (state) => {
    //   state.ingredient = initState.ingredient
    // },
  },
})
