import { PropsWithChildren } from 'react'

import { Ingredient } from '../../../ingredient'

interface Props {
  onCardClick?: () => void
  ingredient: Ingredient
}

export type IngredientCardProps = PropsWithChildren<Props>
