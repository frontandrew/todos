import { Order } from 'entities/order'
import { Ingredient, IngredientType } from 'entities/ingredient'

export const checkOrdersValidity = ({ orders, ingrs }: {
  orders: Order[],
  ingrs: Ingredient[]
}) => orders
  .reduce((acc, { number, ingredients, ...rest }) => {
    const minLength = 2 // TODO: must use ORDER_MIN_LENGTH const, but architecture...

    if (!number || ingredients.length < minLength) return acc

    /**
     * Protection from:
     * - no bun ingredient,
     * - double bun ingredient,
     * - no other ingredients situations
     */

    const ordrIngrs = ingredients
      .map((idx) => ingrs.find(({ id }) => id === idx))
      .filter(Boolean) as Ingredient[]

    console.log(`#${number}`, ordrIngrs)

    const [bunIngrs, otherIngrs] = [
      ordrIngrs.filter(({ type }) => type === IngredientType.BUN),
      ordrIngrs.filter(({ type }) => type !== IngredientType.BUN),
    ]

    if (bunIngrs.length < 1 || otherIngrs.length < 1) return acc

    const bunId = bunIngrs[0].id
    const otherIds = otherIngrs.reduce((acc, { id }) => acc.concat(id), [] as string[])

    return [...acc, { number, ingredients: [...otherIds, bunId], ...rest }]

  }, [] as Order[])
