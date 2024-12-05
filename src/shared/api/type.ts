import { IngredientTypes } from 'entities/ingredient'
import { User } from 'entities/user'

import { AuthQueryResponseData, QueryResponseData } from './queries/type.ts'

export type IngredientResponseData = {
  _id: string
  name: string
  type: IngredientTypes
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
}

export type PostOrderResponse = {
  name: string
  order: {
    number: number
  }
}

export interface UserResponse extends QueryResponseData {
  user: User
}

export interface LoginResponse extends AuthQueryResponseData {
  user: User
}
