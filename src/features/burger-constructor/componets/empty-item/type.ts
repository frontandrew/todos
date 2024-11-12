import { PropsWithChildren } from 'react'
import { OrderIngredientItem } from 'entities/order'
import { IngredientType } from 'entities/ingredient'

interface Props {
  orderIngredient?: OrderIngredientItem
  position?: 'top' | 'bottom'
  expectType: IngredientType.BUN | 'other'
}

export type EmptyItemProps = PropsWithChildren<Props>
