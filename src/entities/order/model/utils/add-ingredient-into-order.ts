import { genItemIndex } from 'utils'
import { IngredientType } from 'entities/ingredient'

import { removeIngredientFromOrder } from './remove-ingredient-from-order'
import { AddIngredientIntoOrder } from './type'

export const addIngredientIntoOrder: AddIngredientIntoOrder = (items, item) => {

        if (item.type === IngredientType[0]) {
          const removedItem = items.find(
            ({ type }) => type === IngredientType[0]
          )

          if (removedItem?.orderIngredientIndex) {
            return [
              ...removeIngredientFromOrder(items, removedItem.orderIngredientIndex),
              { ...item, orderIngredientIndex: genItemIndex() }
            ]
          }
        }

      return [...items, { ...item, orderIngredientIndex: genItemIndex() }]
}
