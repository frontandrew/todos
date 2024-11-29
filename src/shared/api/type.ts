import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { IngredientTypes } from 'entities/ingredient'
import { User } from 'entities/user'

export interface BaseQueryResponse {
  data?: { success: boolean, refreshToken?: string, accessToken?: string } & Record<string, unknown>
  error?: {
    data: {
      success: boolean,
      message: string,
    }
  }
  meta: FetchBaseQueryMeta
}

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
