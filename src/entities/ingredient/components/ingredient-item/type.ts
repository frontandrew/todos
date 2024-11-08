import { PropsWithChildren } from 'react'
import { OrderIngredientItem } from 'entities/order'

interface Props {
  ingredient: OrderIngredientItem
  isLocked: boolean
  type?: 'top' | 'bottom'
}

export type IngredientItemProps = PropsWithChildren<Props>
