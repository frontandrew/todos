import { RenoveIngredientFromOrder } from './type'

export const removeIngredientFromOrder: RenoveIngredientFromOrder = (items, index) => {
  const removedIndex = items.findIndex(({ orderIngredientIndex: id }) => index === id ) - 1

  if (removedIndex >= 0) {
    return [...items.splice(removedIndex, 1)]
  }

  return [...items]
}
