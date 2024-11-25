
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_HOST } from 'consts'
import { Ingredient } from 'entities/ingredient'
import { Order } from 'entities/order'

import { formatIngredientsResponse, preparePostOrderBody } from './utils'
import { IngredientsResponse, PostOrderResponse, UserResponse } from './type'

export const apiSlice = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_HOST }),
  endpoints: (build) => ({
    getIngredients: build.query<Ingredient[], void>({
      query: () => ({ url: '/ingredients' }),
      transformResponse: ({ data }: {
        data: IngredientsResponse[]
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

    logoutUser: build.query<{ success: boolean, message: string }, string>({
      query: (refreshToken) => ({
        body: { token: refreshToken },
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
  }),
})
