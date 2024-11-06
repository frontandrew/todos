import { RenoveIngredientFromOrder } from './type'

export const removeIngredientFromOrder: RenoveIngredientFromOrder = (items, index) => {
  const removedIndex = items.findIndex(({ orderIngredientIndex: id }) => index === id )

  if (removedIndex >= 0) {
    return [...items.splice(removedIndex, 1)]
  }

  return [...items]
}
