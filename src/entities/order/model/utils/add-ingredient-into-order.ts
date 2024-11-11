import { changeIngredientPosition } from './change-ingredient-position'
import { AddIngredientIntoOrder } from './type'

export const addIngredientIntoOrder: AddIngredientIntoOrder = (items, item, targ) => {
  const newItems = [...items, item]

  return targ
    ? changeIngredientPosition(newItems, item.orderIngredientIndex, targ)
    : newItems
}
