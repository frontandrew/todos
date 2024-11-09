import { genItemIndex } from 'utils'

import { AddIngredientIntoOrder } from './type'
import { changeIngredientPosition } from './change-ingredient-position'

export const addIngredientIntoOrder: AddIngredientIntoOrder = (items, item, targ) => {
  const newItemIndexIntoOrder = genItemIndex()
  const newItems = [...items, { ...item, orderIngredientIndex: newItemIndexIntoOrder }]

  return targ
    ? changeIngredientPosition(newItems, newItemIndexIntoOrder, targ)
    : newItems
}
