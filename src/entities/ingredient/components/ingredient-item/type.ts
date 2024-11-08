import { PropsWithChildren } from 'react'
import { OrderIngredientItem } from 'entities/order'

interface Props {
  ingredient: OrderIngredientItem
  isLocked: boolean
  position?: 'top' | 'bottom'
}

export type IngredientItemProps = PropsWithChildren<Props>
