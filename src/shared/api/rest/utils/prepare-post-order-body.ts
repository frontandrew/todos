import { BurgerConstructorState } from 'features/burger-constructor'

export const preparePostOrderBody = (items: BurgerConstructorState['ingredients']): { ingredients: string[] } => ({
  ingredients: items.map(({ id }) => id)
})
