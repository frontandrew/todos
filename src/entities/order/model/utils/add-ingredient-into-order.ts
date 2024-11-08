import { genItemIndex } from 'utils'
import { IngredientType } from 'entities/ingredient'

import { removeIngredientFromOrder } from './remove-ingredient-from-order'
import { AddIngredientIntoOrder } from './type'
import { changeIngredientPosition } from './change-ingredient-position'

export const addIngredientIntoOrder: AddIngredientIntoOrder = (items, item, targ) => {
        const newItemIndexIntoOrder = genItemIndex()

        if (item.type === IngredientType.BUN) {
          const removedItem = items.find(
            ({ type }) => type === IngredientType.BUN
          )

          if (removedItem?.orderIngredientIndex) {
            return [
              { ...item, orderIngredientIndex: newItemIndexIntoOrder },
              ...removeIngredientFromOrder(items, removedItem.orderIngredientIndex),
            ]
          }
        }

      const newItems = [...items, { ...item, orderIngredientIndex: newItemIndexIntoOrder }]

      return targ
        ? changeIngredientPosition(newItems, newItemIndexIntoOrder, targ)
        : newItems
}
