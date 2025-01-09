import { PropsWithChildren } from 'react'

import { Order } from 'entities/order'
import { Ingredient } from 'entities/ingredient'

interface Props extends Omit<Order, 'ingredients'> {
  ingredients: Ingredient[]
}

export type OrderItemProps = PropsWithChildren<Props>
