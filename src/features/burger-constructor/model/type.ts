import { Ingredient } from 'entities/ingredient'

export interface BurgerConstructorIngredient extends Ingredient {
  inBurgerConstructorIndex: string
}

export interface BurgerConstructorState {
  ingredients: BurgerConstructorIngredient[]
  total: number
  isReady: boolean
}
