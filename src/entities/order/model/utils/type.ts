/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ingredient, IngredientTypes } from 'entities/ingredient'
import { OrderIngredientItem } from 'entities/order'

export type AddIngredientIntoOrder = (items: OrderIngredientItem[], item: Ingredient, targ?: string) => OrderIngredientItem[]
export type RenoveIngredientFromOrder = (items: OrderIngredientItem[], index: string) => OrderIngredientItem[]
export type CalcOrderTotal = (items: { [x: string]: any, price: number, type: IngredientTypes }[]) => number
export type ChangeIngredientPosition = (items: OrderIngredientItem[], curr: string, targ: string) => OrderIngredientItem[]
