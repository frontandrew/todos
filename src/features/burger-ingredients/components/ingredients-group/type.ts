import { PropsWithChildren } from 'react'

import { Ingredient } from 'entities/ingredient'

interface Props {
  categoryName: string
  categoryId: string
  ingredients: Ingredient[]
}

export type IngredientsGroupProps = PropsWithChildren<Props>
