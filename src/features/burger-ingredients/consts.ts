import { IngredientType } from 'entities/ingredient'

export const IngredientsGroupNames = {
  [IngredientType.BUN]: 'Булки',
  [IngredientType.SAUCE]: 'Соусы',
  [IngredientType.MAIN]: 'Начинки',
} as const
