import { Order } from 'entities/order';

export const preparePostOrderBody = (items: Order['ingredients']): { ingredients: string[] } => ({
  ingredients: items.map(({ id }) => id)
})
