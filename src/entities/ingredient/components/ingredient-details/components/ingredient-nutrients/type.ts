import { Ingredient } from 'entities/ingredient'

export type NutrientsTypes = 'calories' | 'carbohydrates' | 'fat' | 'proteins'

export type Props = Pick<Ingredient, NutrientsTypes>

export const NutrientsNamesUnitsMap = {
  calories: { name: 'Калории', unit: 'ккал'},
  carbohydrates: { name: 'Углеводы', unit: 'г'},
  fat: { name: 'Жиры', unit: 'г'},
  proteins: { name: 'Белки', unit: 'г'},
} as const
