import { IngredientType } from 'entities/ingredient'
import { PropsWithChildren } from 'react'

interface Props {
  expectType: IngredientType.BUN | 'other'
  targetIndex?: string
}

export type EmptyItemProps = PropsWithChildren<Props>
