import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

import { IngredientTypes } from 'entities/ingredient'
import { User } from 'entities/user'

export enum Token {
  access = 'accessToken',
  refresh = 'refreshToken',
}

export interface BaseQueryData extends Record<string, unknown> {
  success: boolean,
  [Token.refresh]?: string,
  [Token.access]?: string
}

export type AuthQueryData = Required<Pick<BaseQueryData, Token.access | Token.refresh>>

export interface BaseQueryResponse {
  data?: BaseQueryData
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
