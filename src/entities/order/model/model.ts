import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { genItemIndex } from 'utils'
import { Ingredient } from 'entities/ingredient'

import { Order, OrderIngredientItem } from '../type'
import {
  addIngredientIntoOrder,
  calcOrderTotal,
  changeIngredientPosition,
  removeIngredientFromOrder,
} from './utils'

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
    addOrderIngredient: (state, { payload }: PayloadAction<{ item: OrderIngredientItem, targId?: string }>) => {
      state.ingredients = addIngredientIntoOrder(state.ingredients, payload.item, payload.targId)
      state.total = calcOrderTotal(state.ingredients)
    },
    removeOrderIngredient: (state, { payload }: PayloadAction<{ currId: string, ingredientId: string }>) => {
      state.ingredients = removeIngredientFromOrder(state.ingredients, payload.currId)
      state.total = calcOrderTotal(state.ingredients)
    },
    sortOrderIngredients: (state, { payload }: PayloadAction<{currId: string, targId: string}>) => {
      state.ingredients = changeIngredientPosition(state.ingredients, payload.currId, payload.targId)
    }
  },
})
