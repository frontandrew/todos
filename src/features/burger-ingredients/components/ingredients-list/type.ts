import { PropsWithChildren } from 'react'

import { Ingredient } from 'entities/ingredient'

interface Props {
  onClick?: () => void
  ingredients: Ingredient[]
}

export type IngredientsListProps = PropsWithChildren<Props>
