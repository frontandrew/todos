import { PropsWithChildren } from 'react'

import { Ingredient } from '../../type'

type Props = Ingredient & {
  removeHandler: () => void
  isLocked: boolean
  position?: 'top' | 'bottom'
}

export type IngredientBurgerProps = PropsWithChildren<Props>

export enum FromPositionPostfix {
  TOP = 'top',
  BOTTOM = 'bottom',
}
