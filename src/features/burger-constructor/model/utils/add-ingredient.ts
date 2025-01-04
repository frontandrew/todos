import { changeIngredientPosition } from './change-ingredient-position'
import { AddIngredient } from './type'

export const addIngredient: AddIngredient = (items, item, targ) => {
  const newItems = [...items, item]

  return targ
    ? changeIngredientPosition(newItems, item.inBurgerConstructorIndex, targ)
    : newItems
}
