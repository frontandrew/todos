import { createApi } from '@reduxjs/toolkit/query/react'

import { Ingredient } from 'entities/ingredient'
import { Order } from 'entities/order'
import { User } from 'entities/user'

import { apiQuery } from './queries'
import { formatIngredientsResponse, preparePostOrderBody } from './utils'
import { IngredientResponseData, PostOrderResponse, UserResponse } from './type'

export const apiSlice = createApi({
  reducerPath: 'appApi',
  baseQuery: apiQuery,
  endpoints: (build) => ({

    getIngredients: build.query<Ingredient[], void>({
      query: () => ({ url: '/ingredients' }),
      transformResponse: ({ data }: {
        data: IngredientResponseData[]
      }) => formatIngredientsResponse(data),
    }),

    postOrder: build.mutation<{ name: string, id: number }, Order['ingredients']>({
      query: (ingredients) => ({
        body: preparePostOrderBody(ingredients),
        method: 'POST',
        url: '/orders',
      }),
      transformResponse: (response: PostOrderResponse) => ({
        name: response.name,
        id: response.order.number,
      }),
    }),

    registerUser: build.query<UserResponse, User & { password: string }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/auth/register',
      }),
    }),

    loginUser: build.query<UserResponse, { email: User['email'], password: string }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/auth/login',
      }),
    }),

    logoutUser: build.query<{ success: boolean, message: string }, void>({
      query: () => ({
        method: 'POST',
        url: '/auth/logout',
      }),
    }),

    getUser: build.query<UserResponse, void>({
      query: () => ({ url: '/auth/user' }),
    }),

    updateUser: build.mutation<UserResponse, User & { password: string }>({
      query: (credentials) => ({
        body: credentials,
        url: '/auth/user',
        method: 'PATCH',
      }),
    }),

    recoverPass: build.query<{ success: boolean, message: string }, { email: string }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/password-reset',
      }),
    }),

    resetPass: build.query<{ success: boolean, message: string }, {
      password: string,
      token: string
    }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/password-reset/reset',
      }),
    }),
  }),
})
