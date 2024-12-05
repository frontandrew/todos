import { createApi } from '@reduxjs/toolkit/query/react'

import { Ingredient } from 'entities/ingredient'
import { Order } from 'entities/order'
import { User } from 'entities/user'

import { apiQuery } from './queries'
import { formatIngredientsResponse, preparePostOrderBody } from './utils'
import { IngredientsResponse, LoginResponse, PostOrderResponse, UserResponse } from './type'

export const apiSlice = createApi({
  reducerPath: 'appApi',
  baseQuery: apiQuery,
  endpoints: (build) => ({

    getIngredients: build.query<Ingredient[], void>({
      query: () => ({ url: '/ingredients' }),
      transformResponse: ({ data }: IngredientsResponse) => formatIngredientsResponse(data),
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

    registerUser: build.query<User, User & { password: string }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/auth/register',
      }),
      transformResponse: (response: LoginResponse) => response.user,
    }),

    loginUser: build.query<User, { email: User['email'], password: string }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/auth/login',
      }),
      transformResponse: (response: LoginResponse) => response.user,
    }),

    logoutUser: build.query<void, void>({
      query: () => ({
        method: 'POST',
        url: '/auth/logout',
      }),
    }),

    getUser: build.query<User, void>({
      query: () => ({ url: '/auth/user' }),
      transformResponse: (response: UserResponse) => response.user,
    }),

    updateUser: build.mutation<User, User & { password: string }>({
      query: (credentials) => ({
        body: credentials,
        url: '/auth/user',
        method: 'PATCH',
      }),
      transformResponse: (response: UserResponse) => response.user,
    }),

    recoverPass: build.query<{ success: boolean }, { email: string }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/password-reset',
      }),
    }),

    resetPass: build.query<{ success: boolean }, { password: string, token: string }>({
      query: (credentials) => ({
        body: credentials,
        method: 'POST',
        url: '/password-reset/reset',
      }),
    }),
  }),
})
