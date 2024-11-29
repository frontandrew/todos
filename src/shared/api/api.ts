import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_HOST, JWT_EXPIRED_MESSAGE } from 'consts'
import { Ingredient } from 'entities/ingredient'
import { Order } from 'entities/order'
import { User } from 'entities/user'

import { formatIngredientsResponse, preparePostOrderBody } from './utils'
import { BaseQueryResponse, IngredientResponseData, PostOrderResponse, UserResponse } from './type'

// TODO: move baseQuery funk to api/utils
const baseQuery = fetchBaseQuery({
  baseUrl: API_HOST,
  prepareHeaders: (headers) => {
    // TODO: get token from userSlice
    const token = localStorage.getItem('accessToken')
    if (token) headers.set('authorization', `Bearer ${token}`)

    return headers
  },
})

export const apiSlice = createApi({
  reducerPath: 'appApi',
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    const { data, error } = result as unknown as BaseQueryResponse

    console.log('BASE RES:', result)

    /**
     * Now must find tokens if they exist and write to local storage
     */
    if (data) {

      // TODO: move writeTokens func into api/utils
      const { refreshToken, accessToken } = data
      const cleanAccessToken = accessToken?.split('Bearer ')[1]

      if (typeof cleanAccessToken === 'string' && cleanAccessToken) {
        localStorage.setItem('accessToken', cleanAccessToken)
      }

      if (typeof refreshToken === 'string' && refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }

    }

    /**
     * If error responded, must check error message on JWT_ERROR_MESSAGE
     */
    if (error)
      if (error && error.data.message === JWT_EXPIRED_MESSAGE) {

        /**
         * Now must try to update accessToken if it exists
         */
        try {
          const refreshToken = localStorage.getItem('refreshToken')
          if (!refreshToken) throw new Error('No refresh token available')

          // TODO: move refreshAccess func into api/utils
          const refreshResult = await baseQuery(
            {
              url: '/auth/token',
              method: 'POST',
              body: { token: refreshToken },
            },
            api,
            extraOptions,
          )

          /**
           * Now must try to update accessToken if it exists or drop error
           */
          if (refreshResult) {

            // TODO: move writeTokens func into api/utils
            const { data } = refreshResult as unknown as BaseQueryResponse
            if (data) {
              const { refreshToken, accessToken } = data
              const cleanAccessToken = accessToken?.split('Bearer ')[1]

              if (typeof cleanAccessToken === 'string' && cleanAccessToken) {
                localStorage.setItem('accessToken', cleanAccessToken)
              }

              if (typeof refreshToken === 'string' && refreshToken) {
                localStorage.setItem('refreshToken', refreshToken)
              }

            }

            /**
             * Now trying to refetch original request with new accessToken
             */
            result = await baseQuery(args, api, extraOptions)
          } else {
            throw new Error('Failed to refresh token')
          }
        } catch (error) {
          console.error('Failed to reauthenticate', error)
        }
      }

    return result
  },

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
