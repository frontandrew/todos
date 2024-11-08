import { genItemIndex } from 'utils'
import { IngredientType } from 'entities/ingredient'

import { removeIngredientFromOrder } from './remove-ingredient-from-order'
import { AddIngredientIntoOrder } from './type'

export const addIngredientIntoOrder: AddIngredientIntoOrder = (items, item) => {

        if (item.type === IngredientType.BUN) {
          const removedItem = items.find(
            ({ type }) => type === IngredientType.BUN
          )

          if (removedItem?.orderIngredientIndex) {
            return [
              { ...item, orderIngredientIndex: genItemIndex() },
              ...removeIngredientFromOrder(items, removedItem.orderIngredientIndex),
            ]
          }
        }

      return [...items, { ...item, orderIngredientIndex: genItemIndex() }]
}
