import { RemoveIngredientFromOrder } from './type'

export const removeIngredientFromOrder: RemoveIngredientFromOrder = (items, index) => {
  const removedIndex = items.findIndex(({ orderIngredientIndex: id }) => index === id )

  if (removedIndex >= 0) {
    items.splice(removedIndex, 1)
  }

  return [...items]
}
