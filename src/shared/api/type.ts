import { IngredientTypes } from 'entities/ingredient'
import { User } from 'entities/user'

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

export type UserResponse = {
  success: boolean
  user: User
  accessToken: string
  refreshToken: string
}
