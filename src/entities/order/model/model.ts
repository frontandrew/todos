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
import { checkOrderIsReady } from './utils/check-order-is-ready'
import { ORDER_ID_LENGTH, ORDER_MIN_LENGTH } from './const'

const initState: Order = {
  id: null,
  ingredients: [],
  status: 'draft',
  total: 0,
  isReady: false,
}

export const currentOrderSlice = createSlice({
  name: 'currentOrder',
  initialState: initState,
  reducers: {
    createNewOrder: (state, { payload }: PayloadAction<Ingredient>) => {
      state.ingredients = addIngredientIntoOrder(state.ingredients, payload)
      state.total = calcOrderTotal(state.ingredients)
      state.id = genItemIndex(ORDER_ID_LENGTH)
    },
    addOrderIngredient: (state, { payload }: PayloadAction<{ item: OrderIngredientItem, targId?: string }>) => {
      state.ingredients = addIngredientIntoOrder(state.ingredients, payload.item, payload.targId)
      state.isReady = checkOrderIsReady(state.ingredients, ORDER_MIN_LENGTH)
      state.total = calcOrderTotal(state.ingredients)
    },
    removeOrderIngredient: (state, { payload }: PayloadAction<{ orderId: string, ingrId: string }>) => {
      state.ingredients = removeIngredientFromOrder(state.ingredients, payload.orderId)
      state.isReady = checkOrderIsReady(state.ingredients, ORDER_MIN_LENGTH)
      state.total = calcOrderTotal(state.ingredients)
    },
    sortOrderIngredients: (state, { payload }: PayloadAction<{currId: string, targId: string}>) => {
      state.ingredients = changeIngredientPosition(state.ingredients, payload.currId, payload.targId)
    },
    resetOrderState: () => initState,
  },
  extraReducers: (builder) => builder
    .addMatcher(apiSlice.endpoints.postOrder.matchPending, (state) => {
      return { ...state, isLoading: true, error: null, status: 'created' }
    })
    .addMatcher(apiSlice.endpoints.postOrder.matchRejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error ?? null, status: 'rejected' }
    })
    .addMatcher(apiSlice.endpoints.postOrder.matchFulfilled, (state, { payload }) => {
      return { ...state, ...payload, isLoading: false, status: 'inprogress', date: new Date() }
    }),
})
