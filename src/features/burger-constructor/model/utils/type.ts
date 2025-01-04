import { BurgerConstructorIngredient } from '../type'

export type AddIngredient = (items: BurgerConstructorIngredient[], item: BurgerConstructorIngredient, targ?: string) => BurgerConstructorIngredient[]
export type RemoveIngredient = (items: BurgerConstructorIngredient[], index: string) => BurgerConstructorIngredient[]
export type CalcTotal = (items: BurgerConstructorIngredient[]) => number
export type ChangeIngredientPosition = (items: BurgerConstructorIngredient[], curr: string, targ: string) => BurgerConstructorIngredient[]
export type CheckIsReady = (items: BurgerConstructorIngredient[], length: number) => boolean
