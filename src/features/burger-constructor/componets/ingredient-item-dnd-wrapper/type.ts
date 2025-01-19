import { PropsWithChildren } from 'react'
import { BurgerConstructorIngredient } from '../../model'

interface Props {
  ingredient: BurgerConstructorIngredient
  isLocked: boolean
}

export type IngredientItemDNDWrapperProps = PropsWithChildren<Props>
