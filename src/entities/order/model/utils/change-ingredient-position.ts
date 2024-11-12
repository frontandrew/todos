import { ChangeIngredientPosition } from './type'

export const changeIngredientPosition: ChangeIngredientPosition = (items, curr, targ) => {
  const currArrId = items.findIndex(({ orderIngredientIndex: id }) => curr === id)
  let targArrId = items.findIndex(({ orderIngredientIndex: id }) => targ === id)

  targArrId = currArrId < targArrId ? targArrId - 1 : targArrId

  if ([currArrId, targArrId].every(id => id > -1)) {

    const itemCurrent = items.splice(currArrId, 1)
    const itemsBeforeTarg = items.slice(0, targArrId)
    const itemsAfterTarg = items.slice(targArrId, items.length)

    return [...itemsBeforeTarg, ...itemCurrent, ...itemsAfterTarg]
  }

  return [...items]
}
